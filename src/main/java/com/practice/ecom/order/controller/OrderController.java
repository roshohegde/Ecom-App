package com.practice.ecom.order.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.ecom.cart.entity.Cart;
import com.practice.ecom.cart.entity.CartItem;
import com.practice.ecom.cart.repository.CartRepository;
import com.practice.ecom.exception.ApiException;
import com.practice.ecom.inventory.entity.Inventory;
import com.practice.ecom.inventory.repository.InventoryRepository;
import com.practice.ecom.order.entity.CustomerOrder;
import com.practice.ecom.order.entity.OrderItem;
import com.practice.ecom.order.repository.OrderRepository;
import com.practice.ecom.payment.entity.Payment;
import com.practice.ecom.payment.repository.PaymentRepository;
import com.practice.ecom.payment.service.PaymentGateway;
import com.practice.ecom.security.CurrentUser;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/v1")
public class OrderController {

    final CartRepository carts;
    final InventoryRepository inventory;
    final OrderRepository orders;
    final PaymentRepository payments;
    final PaymentGateway gateway;

    public OrderController(CartRepository c, InventoryRepository i, OrderRepository o, PaymentRepository p, PaymentGateway g) {
        carts = c;
        inventory = i;
        orders = o;
        payments = p;
        gateway = g;
    }

    public record Checkout(@NotNull Payment.Method paymentMethod, String shippingAddress) {

    }

    public record ItemView(String productName, int quantity, BigDecimal unitPrice, BigDecimal totalPrice) {

    }

    public record View(Long id, String orderNumber, String status, String paymentStatus, BigDecimal total, List<ItemView> items) {

    }

    View view(CustomerOrder o) {
        List<ItemView> items = o.items.stream()
                .map(item -> new ItemView(item.productName, item.quantity, item.unitPrice, item.totalPrice))
                .toList();
        return new View(o.id, o.orderNumber, o.status.name(), o.paymentStatus.name(), o.totalAmount, items);
    }

    @PostMapping("/orders")
    @Transactional
    public View checkout(@RequestHeader(value = "Idempotency-Key", required = false) String key, @RequestBody Checkout r) {
        if (key != null) {
            var old = orders.findByOrderNumber("idem-" + key);
            if (old.isPresent()) {
                return view(old.get());

            }
        }
        Cart cart = carts.findByUserIdAndStatus(CurrentUser.id(), Cart.Status.ACTIVE).orElseThrow(() -> new ApiException(400, "EMPTY_CART", "No active cart"));
        if (cart.items.isEmpty()) {
            throw new ApiException(400, "EMPTY_CART", "Cart is empty");

        }
        CustomerOrder o = new CustomerOrder();
        o.orderNumber = key == null ? "ORD-" + UUID.randomUUID() : "idem-" + key;
        o.user = cart.user;
        o.shippingAddressSnapshot = r.shippingAddress();
        o.subtotal = BigDecimal.ZERO;
        for (CartItem ci : cart.items) {
            Inventory inv = inventory.findByProductId(ci.product.id).orElseThrow(() -> new ApiException(409, "INSUFFICIENT_INVENTORY", "Inventory missing"));
            if (inv.availableQuantity - inv.reservedQuantity < ci.quantity) {
                throw new ApiException(409, "INSUFFICIENT_INVENTORY", "Insufficient inventory for " + ci.product.sku);

            }
            inv.reservedQuantity += ci.quantity;
            OrderItem oi = new OrderItem();
            oi.order = o;
            oi.product = ci.product;
            oi.productName = ci.product.name;
            oi.sku = ci.product.sku;
            oi.quantity = ci.quantity;
            oi.unitPrice = ci.unitPrice;
            oi.totalPrice = ci.unitPrice.multiply(BigDecimal.valueOf(ci.quantity));
            o.items.add(oi);
            o.subtotal = o.subtotal.add(oi.totalPrice);
        }
        o.totalAmount = o.subtotal;
        o = orders.save(o);
        Payment p = new Payment();
        p.paymentReference = "PAY-" + UUID.randomUUID();
        p.order = o;
        p.amount = o.totalAmount;
        p.currency = o.currency;
        p.paymentMethod = r.paymentMethod();
        p.status = Payment.Status.PROCESSING;
        PaymentGateway.Result result = gateway.process(p.amount, p.paymentMethod);
        p.transactionReference = result.transactionReference();
        if (result.success()) {
            p.status = Payment.Status.SUCCESS;
            o.status = CustomerOrder.Status.CONFIRMED;
            o.paymentStatus = CustomerOrder.PaymentStatus.PAID;
            for (OrderItem i : o.items) {
                Inventory inv = inventory.findByProductId(i.product.id).orElseThrow();
                inv.reservedQuantity -= i.quantity;
                inv.availableQuantity -= i.quantity;
            }
        } else {
            o.status = CustomerOrder.Status.CANCELLED;
            o.paymentStatus = CustomerOrder.PaymentStatus.FAILED;
            p.status = Payment.Status.FAILED;
            for (OrderItem i : o.items) {
                inventory.findByProductId(i.product.id).ifPresent(inv -> inv.reservedQuantity -= i.quantity);

            }
        }
        payments.save(p);
        cart.status = Cart.Status.CHECKED_OUT;
        carts.save(cart);
        return view(orders.save(o));
    }

    @GetMapping("/orders")
    @Transactional
    public Page<View> list(@PageableDefault(size = 20) Pageable p) {
        return orders.findByUserId(CurrentUser.id(), p).map(this::view);
    }

    @GetMapping("/orders/{id}")
    @Transactional
    public View one(@PathVariable Long id) {
        CustomerOrder o = orders.findById(id).orElseThrow(() -> new ApiException(404, "NOT_FOUND", "Order not found"));
        if (!o.user.id.equals(CurrentUser.id())) {
            throw new ApiException(403, "FORBIDDEN", "Not your order");

        }
        return view(o);
    }
}
