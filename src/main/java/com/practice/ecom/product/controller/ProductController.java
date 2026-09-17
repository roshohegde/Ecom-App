package com.practice.ecom.product.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.practice.ecom.category.entity.Category;
import com.practice.ecom.product.service.ProductService;
import com.practice.ecom.security.CurrentUser;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@RestController
@RequestMapping("/api/v1")
public class ProductController {

    private final ProductService products;

    public ProductController(ProductService products) {
        this.products = products;
    }

    public record ProductRequest(@NotBlank String sku, @NotBlank String name, String description,
            @Positive BigDecimal price, @NotNull Long categoryId, @PositiveOrZero Integer availableQuantity) {}

    public record ProductView(Long id, String sku, String name, String description, BigDecimal price,
            String category, String status, Integer availableQuantity) {}

    @GetMapping("/products")
    public Page<ProductView> list(@RequestParam(required = false) String category,
            @RequestParam(required = false) String q, @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @PageableDefault(size = 20, sort = "createdAt") Pageable page) {
        return products.list(category, q, minPrice, maxPrice, page).map(this::view);
    }

    @GetMapping("/products/{id}")
    @Cacheable(value = "products", key = "#id")
    ProductView one(@PathVariable Long id) {
        return view(products.one(id));
    }

    @GetMapping("/categories")
    @Cacheable("categories")
    List<Category> categories() {
        return products.categories();
    }

    @PostMapping("/admin/categories")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Category> category(@RequestBody Category category) {
        return ResponseEntity.status(201).body(products.createCategory(category));
    }

    @PostMapping("/admin/products")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<ProductView> adminCreate(@Valid @RequestBody ProductRequest request) {
        return ResponseEntity.status(201).body(view(products.create(command(request), null)));
    }

    @PutMapping("/admin/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CacheEvict(value = "products", key = "#id")
    ProductView adminUpdate(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return view(products.update(id, command(request), null));
    }

    @DeleteMapping("/admin/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CacheEvict(value = "products", key = "#id")
    ResponseEntity<Void> adminDelete(@PathVariable Long id) {
        products.delete(id, null);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/seller/products")
    @PreAuthorize("hasRole('SELLER')")
    Page<ProductView> sellerProducts(@PageableDefault(size = 20, sort = "createdAt") Pageable page) {
        return products.sellerProducts(CurrentUser.id(), page).map(this::view);
    }

    @PostMapping("/seller/products")
    @PreAuthorize("hasRole('SELLER')")
    ResponseEntity<ProductView> sellerCreate(@Valid @RequestBody ProductRequest request) {
        return ResponseEntity.status(201).body(view(products.create(command(request), CurrentUser.id())));
    }

    @PutMapping("/seller/products/{id}")
    @PreAuthorize("hasRole('SELLER')")
    @CacheEvict(value = "products", key = "#id")
    ProductView sellerUpdate(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return view(products.update(id, command(request), CurrentUser.id()));
    }

    @DeleteMapping("/seller/products/{id}")
    @PreAuthorize("hasRole('SELLER')")
    @CacheEvict(value = "products", key = "#id")
    ResponseEntity<Void> sellerDelete(@PathVariable Long id) {
        products.delete(id, CurrentUser.id());
        return ResponseEntity.noContent().build();
    }

    private ProductService.ProductCommand command(ProductRequest request) {
        return new ProductService.ProductCommand(request.sku(), request.name(), request.description(), request.price(),
                request.categoryId(), request.availableQuantity());
    }

    private ProductView view(ProductService.ProductView product) {
        return new ProductView(product.id(), product.sku(), product.name(), product.description(), product.price(),
                product.category(), product.status(), product.availableQuantity());
    }
}
