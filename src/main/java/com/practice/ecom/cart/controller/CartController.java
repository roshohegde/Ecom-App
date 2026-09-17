package com.practice.ecom.cart.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.ecom.cart.entity.Cart;
import com.practice.ecom.cart.entity.CartItem;
import com.practice.ecom.cart.repository.CartRepository;
import com.practice.ecom.exception.ApiException;
import com.practice.ecom.inventory.entity.Inventory;
import com.practice.ecom.inventory.repository.InventoryRepository;
import com.practice.ecom.product.entity.Product;
import com.practice.ecom.product.repository.ProductRepository;
import com.practice.ecom.security.CurrentUser;
import com.practice.ecom.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    final CartRepository carts;
    final UserRepository users;
    final ProductRepository products;
    final InventoryRepository inventory;

    public CartController(CartRepository c, UserRepository u, ProductRepository p, InventoryRepository i) {
        carts = c;
        users = u;
        products = p;
        inventory = i;
    }

    public record Item(@NotNull Long productId, @Positive int quantity) {

    }

    public record View(Long id, List<Line> items, BigDecimal subtotal) {

    }

    public record Line(Long productId, String name, int quantity, BigDecimal unitPrice) {

    }

    Cart cart() {
        Long userId = CurrentUser.id();
        return carts.findByUserIdAndStatus(userId, Cart.Status.ACTIVE).orElseGet(() -> {
            Cart cart = new Cart();
            cart.user = users.getReferenceById(userId);
            return carts.save(cart);
        });
    }

    View view(Cart cart) {
        List<Line> lines = cart.items.stream()
                .map(item -> new Line(item.product.id, item.product.name, item.quantity, item.unitPrice))
                .toList();
        BigDecimal subtotal = lines.stream()
                .map(line -> line.unitPrice().multiply(BigDecimal.valueOf(line.quantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return new View(cart.id, lines, subtotal);
    }

    @GetMapping
    @Transactional
    public View get() {
        return view(cart());
    }

    @PostMapping("/items")
    @Transactional
    public View add(@Valid @RequestBody Item request) {
        Cart cart = cart();
        Product product = products.findById(request.productId())
                .orElseThrow(() -> new ApiException(404, "NOT_FOUND", "Product not found"));
        if (product.status != Product.Status.ACTIVE) {
            throw new ApiException(400, "PRODUCT_UNAVAILABLE", "Product unavailable");
        }
        CartItem item = cart.items.stream()
                .filter(existing -> existing.product.id.equals(product.id))
                .findFirst()
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.cart = cart;
                    newItem.product = product;
                    cart.items.add(newItem);
                    return newItem;
                });
        Inventory stock = inventory.findByProductId(product.id)
                .orElseThrow(() -> new ApiException(409, "INSUFFICIENT_INVENTORY", "Inventory missing"));
        int requestedQuantity = item.quantity + request.quantity();
        if (stock.availableQuantity - stock.reservedQuantity < requestedQuantity) {
            throw new ApiException(409, "INSUFFICIENT_INVENTORY", "Insufficient inventory for " + product.sku);
        }
        item.quantity += request.quantity();
        item.unitPrice = product.price;
        return view(carts.save(cart));
    }

    @PutMapping("/items/{productId}")
    @Transactional
    public View update(@PathVariable Long productId, @Valid @RequestBody Item request) {
        Cart cart = cart();
        CartItem item = cart.items.stream()
                .filter(existing -> existing.product.id.equals(productId))
                .findFirst()
                .orElseThrow(() -> new ApiException(404, "NOT_FOUND", "Cart item not found"));
        Inventory stock = inventory.findByProductId(item.product.id)
                .orElseThrow(() -> new ApiException(409, "INSUFFICIENT_INVENTORY", "Inventory missing"));
        if (stock.availableQuantity - stock.reservedQuantity < request.quantity()) {
            throw new ApiException(409, "INSUFFICIENT_INVENTORY", "Insufficient inventory for " + item.product.sku);
        }
        item.quantity = request.quantity();
        item.unitPrice = item.product.price;
        return view(carts.save(cart));
    }

    @DeleteMapping("/items/{productId}")
    @Transactional
    public View remove(@PathVariable Long productId) {
        Cart cart = cart();
        if (!cart.items.removeIf(item -> item.product.id.equals(productId))) {
            throw new ApiException(404, "NOT_FOUND", "Cart item not found");
        }
        return view(carts.save(cart));
    }

    @DeleteMapping
    @Transactional
    public void clear() {
        Cart cart = cart();
        cart.items.clear();
        carts.save(cart);
    }
}
