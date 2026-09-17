package com.practice.ecom.cart.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.practice.ecom.cart.entity.Cart;
import com.practice.ecom.cart.entity.CartItem;
import com.practice.ecom.cart.repository.CartRepository;
import com.practice.ecom.exception.ApiException;
import com.practice.ecom.inventory.entity.Inventory;
import com.practice.ecom.inventory.repository.InventoryRepository;
import com.practice.ecom.product.entity.Product;
import com.practice.ecom.product.repository.ProductRepository;
import com.practice.ecom.user.repository.UserRepository;

@Service
public class CartService {

    private final CartRepository carts;
    private final UserRepository users;
    private final ProductRepository products;
    private final InventoryRepository inventory;

    public CartService(CartRepository carts, UserRepository users, ProductRepository products,
            InventoryRepository inventory) {
        this.carts = carts;
        this.users = users;
        this.products = products;
        this.inventory = inventory;
    }

    public record ItemCommand(Long productId, int quantity) {

    }

    public record View(Long id, List<Line> items, BigDecimal subtotal) {

    }

    public record Line(Long productId, String name, int quantity, BigDecimal unitPrice) {

    }

    @Transactional
    public View get(Long userId) {
        return view(cart(userId));
    }

    @Transactional
    public View add(Long userId, ItemCommand command) {
        Cart cart = cart(userId);
        Product product = products.findById(command.productId())
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
        int requestedQuantity = item.quantity + command.quantity();
        if (stock.availableQuantity - stock.reservedQuantity < requestedQuantity) {
            throw new ApiException(409, "INSUFFICIENT_INVENTORY", "Insufficient inventory for " + product.sku);
        }
        item.quantity = requestedQuantity;
        item.unitPrice = product.price;
        return view(carts.save(cart));
    }

    @Transactional
    public View update(Long userId, Long productId, ItemCommand command) {
        Cart cart = cart(userId);
        CartItem item = cart.items.stream()
                .filter(existing -> existing.product.id.equals(productId))
                .findFirst()
                .orElseThrow(() -> new ApiException(404, "NOT_FOUND", "Cart item not found"));
        Inventory stock = inventory.findByProductId(item.product.id)
                .orElseThrow(() -> new ApiException(409, "INSUFFICIENT_INVENTORY", "Inventory missing"));
        if (stock.availableQuantity - stock.reservedQuantity < command.quantity()) {
            throw new ApiException(409, "INSUFFICIENT_INVENTORY", "Insufficient inventory for " + item.product.sku);
        }
        item.quantity = command.quantity();
        item.unitPrice = item.product.price;
        return view(carts.save(cart));
    }

    @Transactional
    public View remove(Long userId, Long productId) {
        Cart cart = cart(userId);
        if (!cart.items.removeIf(item -> item.product.id.equals(productId))) {
            throw new ApiException(404, "NOT_FOUND", "Cart item not found");
        }
        return view(carts.save(cart));
    }

    @Transactional
    public void clear(Long userId) {
        Cart cart = cart(userId);
        cart.items.clear();
        carts.save(cart);
    }

    private Cart cart(Long userId) {
        return carts.findByUserIdAndStatus(userId, Cart.Status.ACTIVE).orElseGet(() -> {
            Cart cart = new Cart();
            cart.user = users.getReferenceById(userId);
            return carts.save(cart);
        });
    }

    private View view(Cart cart) {
        List<Line> lines = cart.items.stream()
                .map(item -> new Line(item.product.id, item.product.name, item.quantity, item.unitPrice))
                .toList();
        BigDecimal subtotal = lines.stream()
                .map(line -> line.unitPrice().multiply(BigDecimal.valueOf(line.quantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return new View(cart.id, lines, subtotal);
    }
}
