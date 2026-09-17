package com.practice.ecom.order.controller;

import java.math.BigDecimal;
import java.util.List;

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

import com.practice.ecom.order.service.OrderService;
import com.practice.ecom.payment.entity.Payment;
import com.practice.ecom.security.CurrentUser;

import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/v1")
public class OrderController {

    final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    public record Checkout(@NotNull Payment.Method paymentMethod, String shippingAddress) {

    }

    public record ItemView(String productName, int quantity, BigDecimal unitPrice, BigDecimal totalPrice) {

    }

    public record View(Long id, String orderNumber, String status, String paymentStatus, BigDecimal total, List<ItemView> items) {

    }

    @PostMapping("/orders")
    public View checkout(@RequestHeader(value = "Idempotency-Key", required = false) String key, @RequestBody Checkout r) {
        return toView(orderService.checkout(CurrentUser.id(), key,
                new OrderService.CheckoutCommand(r.paymentMethod(), r.shippingAddress())));
    }

    @GetMapping("/orders")
    public Page<View> list(@PageableDefault(size = 20) Pageable p) {
        return orderService.list(CurrentUser.id(), p).map(this::toView);
    }

    @GetMapping("/orders/{id}")
    public View one(@PathVariable Long id) {
        return toView(orderService.one(CurrentUser.id(), id));
    }

    private View toView(OrderService.View view) {
        List<ItemView> items = view.items().stream()
                .map(item -> new ItemView(item.productName(), item.quantity(), item.unitPrice(), item.totalPrice()))
                .toList();
        return new View(view.id(), view.orderNumber(), view.status(), view.paymentStatus(), view.total(), items);
    }
}
