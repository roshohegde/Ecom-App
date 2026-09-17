package com.practice.ecom.cart;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import com.practice.ecom.cart.controller.CartController;
import com.practice.ecom.cart.entity.Cart;
import com.practice.ecom.cart.repository.CartRepository;
import com.practice.ecom.cart.service.CartService;
import com.practice.ecom.exception.ApiException;
import com.practice.ecom.inventory.entity.Inventory;
import com.practice.ecom.inventory.repository.InventoryRepository;
import com.practice.ecom.product.entity.Product;
import com.practice.ecom.product.repository.ProductRepository;
import com.practice.ecom.user.entity.User;
import com.practice.ecom.user.repository.UserRepository;

class CartControllerTests {

    @Mock CartRepository carts;
    @Mock UserRepository users;
    @Mock ProductRepository products;
    @Mock InventoryRepository inventory;

    private CartController controller;
    private AutoCloseable mocks;

    @BeforeEach
    void setUp() {
        mocks = MockitoAnnotations.openMocks(this);
        controller = new CartController(new CartService(carts, users, products, inventory));
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(7L, null));
    }

    @AfterEach
    void tearDown() throws Exception {
        SecurityContextHolder.clearContext();
        mocks.close();
    }

    @Test
    void rejects_add_when_requested_quantity_exceeds_available_stock() {
        Cart cart = new Cart();
        User user = new User();
        user.id = 7L;
        cart.user = user;
        Product product = product(11L, "MUG-001");
        Inventory stock = new Inventory();
        stock.product = product;
        stock.availableQuantity = 1;

        when(carts.findByUserIdAndStatus(7L, Cart.Status.ACTIVE)).thenReturn(Optional.of(cart));
        when(products.findById(11L)).thenReturn(Optional.of(product));
        when(inventory.findByProductId(11L)).thenReturn(Optional.of(stock));

        assertThatThrownBy(() -> controller.add(new CartController.Item(11L, 2)))
                .isInstanceOfSatisfying(ApiException.class, error -> {
                    org.assertj.core.api.Assertions.assertThat(error.code).isEqualTo("INSUFFICIENT_INVENTORY");
                });
    }

    @Test
    void adds_item_when_stock_is_available() {
        Cart cart = new Cart();
        User user = new User();
        user.id = 7L;
        cart.user = user;
        Product product = product(11L, "MUG-001");
        Inventory stock = new Inventory();
        stock.product = product;
        stock.availableQuantity = 3;

        when(carts.findByUserIdAndStatus(7L, Cart.Status.ACTIVE)).thenReturn(Optional.of(cart));
        when(products.findById(11L)).thenReturn(Optional.of(product));
        when(inventory.findByProductId(11L)).thenReturn(Optional.of(stock));
        when(carts.save(cart)).thenReturn(cart);

        controller.add(new CartController.Item(11L, 2));

        verify(carts).save(cart);
        org.assertj.core.api.Assertions.assertThat(cart.items).hasSize(1);
        org.assertj.core.api.Assertions.assertThat(cart.items.getFirst().quantity).isEqualTo(2);
    }

    private Product product(Long id, String sku) {
        Product product = new Product();
        product.id = id;
        product.sku = sku;
        product.name = "Nova Mug";
        product.price = BigDecimal.TEN;
        product.status = Product.Status.ACTIVE;
        return product;
    }
}