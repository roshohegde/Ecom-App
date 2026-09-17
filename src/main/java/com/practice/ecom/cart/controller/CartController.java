package com.practice.ecom.cart.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.ecom.cart.service.CartService;
import com.practice.ecom.security.CurrentUser;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    public record Item(@NotNull Long productId, @Positive int quantity) {

    }

    public record View(Long id, List<CartService.Line> items, java.math.BigDecimal subtotal) {}

    @GetMapping
    public View get() {
        return toView(cartService.get(CurrentUser.id()));
    }

    @PostMapping("/items")
    public View add(@Valid @RequestBody Item request) {
        return toView(cartService.add(CurrentUser.id(), new CartService.ItemCommand(request.productId(), request.quantity())));
    }

    @PutMapping("/items/{productId}")
    public View update(@PathVariable Long productId, @Valid @RequestBody Item request) {
        return toView(cartService.update(CurrentUser.id(), productId, new CartService.ItemCommand(request.productId(), request.quantity())));
    }

    @DeleteMapping("/items/{productId}")
    public View remove(@PathVariable Long productId) {
        return toView(cartService.remove(CurrentUser.id(), productId));
    }

    @DeleteMapping
    public void clear() {
        cartService.clear(CurrentUser.id());
    }

    private View toView(CartService.View view) {
        return new View(view.id(), view.items(), view.subtotal());
    }
}
