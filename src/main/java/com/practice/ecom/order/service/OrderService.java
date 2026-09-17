package com.practice.ecom.order.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

@Service
public class OrderService {

    private final CartRepository carts;
    private final InventoryRepository inventory;
    private final OrderRepository orders;
    private final PaymentRepository payments;
    private final PaymentGateway gateway;

    public OrderService(CartRepository carts, InventoryRepository inventory, OrderRepository orders,
            PaymentRepository payments, PaymentGateway gateway) {
        this.carts = carts;
        this.inventory = inventory;
        this.orders = orders;
        this.payments = payments;
        this.gateway = gateway;
    }

    public record CheckoutCommand(Payment.Method paymentMethod, String shippingAddress) {
    }

    public record ItemView(String productName, int quantity, BigDecimal unitPrice, BigDecimal totalPrice) {
    }

    public record View(Long id, String orderNumber, String status, String paymentStatus, BigDecimal total,
            List<ItemView> items) {
    }

    @Transactional
    public View checkout(Long userId, String key, CheckoutCommand command) {
        if (key != null) {
            var old = orders.findByOrderNumber("idem-" + key);
            if (old.isPresent()) {
                return view(old.get());
            }
        }
        Cart cart = carts.findByUserIdAndStatus(userId, Cart.Status.ACTIVE)
                .orElseThrow(() -> new ApiException(400, "EMPTY_CART", "No active cart"));
        if (cart.items.isEmpty()) {
            throw new ApiException(400, "EMPTY_CART", "Cart is empty");
        }

        CustomerOrder order = new CustomerOrder();
        order.orderNumber = key == null ? "ORD-" + UUID.randomUUID() : "idem-" + key;
        order.user = cart.user;
        order.shippingAddressSnapshot = command.shippingAddress();
        order.subtotal = BigDecimal.ZERO;
        for (CartItem cartItem : cart.items) {
            Inventory stock = inventory.findByProductId(cartItem.product.id)
                    .orElseThrow(() -> new ApiException(409, "INSUFFICIENT_INVENTORY", "Inventory missing"));
            if (stock.availableQuantity - stock.reservedQuantity < cartItem.quantity) {
                throw new ApiException(409, "INSUFFICIENT_INVENTORY",
                        "Insufficient inventory for " + cartItem.product.sku);
            }
            stock.reservedQuantity += cartItem.quantity;
            OrderItem orderItem = new OrderItem();
            orderItem.order = order;
            orderItem.product = cartItem.product;
            orderItem.productName = cartItem.product.name;
            orderItem.sku = cartItem.product.sku;
            orderItem.quantity = cartItem.quantity;
            orderItem.unitPrice = cartItem.unitPrice;
            orderItem.totalPrice = cartItem.unitPrice.multiply(BigDecimal.valueOf(cartItem.quantity));
            order.items.add(orderItem);
            order.subtotal = order.subtotal.add(orderItem.totalPrice);
        }
        order.totalAmount = order.subtotal;
        order = orders.save(order);

        Payment payment = new Payment();
        payment.paymentReference = "PAY-" + UUID.randomUUID();
        payment.order = order;
        payment.amount = order.totalAmount;
        payment.currency = order.currency;
        payment.paymentMethod = command.paymentMethod();
        payment.status = Payment.Status.PROCESSING;
        PaymentGateway.Result result = gateway.process(payment.amount, payment.paymentMethod);
        payment.transactionReference = result.transactionReference();
        if (result.success()) {
            payment.status = Payment.Status.SUCCESS;
            order.status = CustomerOrder.Status.CONFIRMED;
            order.paymentStatus = CustomerOrder.PaymentStatus.PAID;
            for (OrderItem item : order.items) {
                Inventory stock = inventory.findByProductId(item.product.id).orElseThrow();
                stock.reservedQuantity -= item.quantity;
                stock.availableQuantity -= item.quantity;
            }
        } else {
            payment.status = Payment.Status.FAILED;
            order.status = CustomerOrder.Status.CANCELLED;
            order.paymentStatus = CustomerOrder.PaymentStatus.FAILED;
            for (OrderItem item : order.items) {
                inventory.findByProductId(item.product.id)
                        .ifPresent(stock -> stock.reservedQuantity -= item.quantity);
            }
        }
        payments.save(payment);
        cart.status = Cart.Status.CHECKED_OUT;
        carts.save(cart);
        return view(orders.save(order));
    }

    @Transactional(readOnly = true)
    public Page<View> list(Long userId, Pageable pageable) {
        return orders.findByUserId(userId, pageable).map(this::view);
    }

    @Transactional(readOnly = true)
    public View one(Long userId, Long orderId) {
        CustomerOrder order = orders.findById(orderId)
                .orElseThrow(() -> new ApiException(404, "NOT_FOUND", "Order not found"));
        if (!order.user.id.equals(userId)) {
            throw new ApiException(403, "FORBIDDEN", "Not your order");
        }
        return view(order);
    }

    private View view(CustomerOrder order) {
        List<ItemView> items = order.items.stream()
                .map(item -> new ItemView(item.productName, item.quantity, item.unitPrice, item.totalPrice))
                .toList();
        return new View(order.id, order.orderNumber, order.status.name(), order.paymentStatus.name(),
                order.totalAmount, items);
    }
}
