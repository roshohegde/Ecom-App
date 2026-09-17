package com.practice.ecom.product.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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
import com.practice.ecom.category.repository.CategoryRepository;
import com.practice.ecom.exception.ApiException;
import com.practice.ecom.inventory.entity.Inventory;
import com.practice.ecom.inventory.repository.InventoryRepository;
import com.practice.ecom.product.entity.Product;
import com.practice.ecom.product.repository.ProductRepository;
import com.practice.ecom.security.CurrentUser;
import com.practice.ecom.user.repository.UserRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@RestController
@RequestMapping("/api/v1")
public class ProductController {

    final ProductRepository products;
    final CategoryRepository categories;
    final InventoryRepository inventory;
    final UserRepository users;

    public ProductController(ProductRepository p, CategoryRepository c, InventoryRepository i, UserRepository u) {
        products = p;
        categories = c;
        inventory = i;
        users = u;
    }

    public record ProductRequest(@NotBlank String sku, @NotBlank String name, String description, @Positive BigDecimal price, @NotNull Long categoryId, @PositiveOrZero Integer availableQuantity) {

    }

    public record ProductView(Long id, String sku, String name, String description, BigDecimal price, String category, String status, Integer availableQuantity) {

    }

    ProductView view(Product p) {
        return new ProductView(p.id, p.sku, p.name, p.description, p.price, p.category.name, p.status.name(), inventory.findByProductId(p.id).map(i -> i.availableQuantity).orElse(0));
    }

    @GetMapping("/products")
    public Page<ProductView> list(@RequestParam(required = false) String category, @RequestParam(required = false) String q, @RequestParam(required = false) BigDecimal minPrice, @RequestParam(required = false) BigDecimal maxPrice, @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable page) {
        Specification<Product> s = (r, x, b) -> b.equal(r.get("status"), Product.Status.ACTIVE);
        if (category != null) {
            s = s.and((r, x, b) -> b.equal(b.lower(r.get("category").get("name")), category.toLowerCase()));
        
        }if (q != null) {
            s = s.and((r, x, b) -> b.or(b.like(b.lower(r.get("name")), "%" + q.toLowerCase() + "%"), b.like(b.lower(r.get("sku")), "%" + q.toLowerCase() + "%")));
        
        }if (minPrice != null) {
            s = s.and((r, x, b) -> b.greaterThanOrEqualTo(r.get("price"), minPrice));
        
        }if (maxPrice != null) {
            s = s.and((r, x, b) -> b.lessThanOrEqualTo(r.get("price"), maxPrice));
        
        }return products.findAll(s, page).map(this::view);
    }

    @GetMapping("/products/{id}")
    @Cacheable(value = "products", key = "#id")
    ProductView one(@PathVariable Long id) {
        Product p = get(id);
        if (p.status != Product.Status.ACTIVE) {
            throw new ApiException(404, "NOT_FOUND", "Product not found");
        
        }return view(p);
    }

    @GetMapping("/categories")
    @Cacheable("categories")
    List<Category> categories() {
        return categories.findByStatus(Category.Status.ACTIVE);
    }

    @PostMapping("/admin/categories")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Category> category(@RequestBody Category c) {
        c.id = null;
        return ResponseEntity.status(201).body(categories.save(c));
    }

    @PostMapping("/admin/products")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<ProductView> adminCreate(@Valid @RequestBody ProductRequest r) {
        return ResponseEntity.status(201).body(view(create(r, null)));
    }

    @PutMapping("/admin/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CacheEvict(value = "products", key = "#id")
    ProductView adminUpdate(@PathVariable Long id, @Valid @RequestBody ProductRequest r) {
        Product p = get(id);
        apply(p, r);
        setInventory(p, r.availableQuantity());
        return view(products.save(p));
    }

    @DeleteMapping("/admin/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CacheEvict(value = "products", key = "#id")
    ResponseEntity<Void> adminDelete(@PathVariable Long id) {
        Product p = get(id);
        p.status = Product.Status.DISCONTINUED;
        products.save(p);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/seller/products")
    @PreAuthorize("hasRole('SELLER')")
    Page<ProductView> sellerProducts(@PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable page) {
        return products.findBySellerIdAndStatus(CurrentUser.id(), Product.Status.ACTIVE, page).map(this::view);
    }

    @PostMapping("/seller/products")
    @PreAuthorize("hasRole('SELLER')")
    ResponseEntity<ProductView> sellerCreate(@Valid @RequestBody ProductRequest r) {
        return ResponseEntity.status(201).body(view(create(r, CurrentUser.id())));
    }

    @PutMapping("/seller/products/{id}")
    @PreAuthorize("hasRole('SELLER')")
    @CacheEvict(value = "products", key = "#id")
    ProductView sellerUpdate(@PathVariable Long id, @Valid @RequestBody ProductRequest r) {
        Product p = owned(id);
        apply(p, r);
        setInventory(p, r.availableQuantity());
        return view(products.save(p));
    }

    @DeleteMapping("/seller/products/{id}")
    @PreAuthorize("hasRole('SELLER')")
    @CacheEvict(value = "products", key = "#id")
    ResponseEntity<Void> sellerDelete(@PathVariable Long id) {
        Product p = owned(id);
        p.status = Product.Status.DISCONTINUED;
        products.save(p);
        return ResponseEntity.noContent().build();
    }

    Product create(ProductRequest r, Long sellerId) {
        if (products.findBySku(r.sku()).isPresent()) {
            throw new ApiException(409, "DUPLICATE_RESOURCE", "SKU already exists");
        
        }Product p = new Product();
        apply(p, r);
        if (sellerId != null) {
            p.seller = users.getReferenceById(sellerId);
        
        }products.save(p);
        setInventory(p, r.availableQuantity());
        return p;
    }

    Product get(Long id) {
        return products.findById(id).orElseThrow(() -> new ApiException(404, "NOT_FOUND", "Product not found"));
    }

    Product owned(Long id) {
        Product p = get(id);
        if (p.seller == null || !p.seller.id.equals(CurrentUser.id())) {
            throw new ApiException(403, "FORBIDDEN", "You can manage only your own products");
        
        }return p;
    }

    void apply(Product p, ProductRequest r) {
        p.sku = r.sku();
        p.name = r.name();
        p.description = r.description();
        p.price = r.price();
        p.category = categories.findById(r.categoryId()).orElseThrow(() -> new ApiException(404, "NOT_FOUND", "Category not found"));
    }

    void setInventory(Product p, Integer quantity) {
        Inventory i = inventory.findByProductId(p.id).orElseGet(() -> {
            Inventory n = new Inventory();
            n.product = p;
            return n;
        });
        if (quantity != null) {
            if (quantity < i.reservedQuantity) {
                throw new ApiException(409, "INSUFFICIENT_INVENTORY", "Stock cannot be lower than reserved stock");
            
            }i.availableQuantity = quantity;
        }
        inventory.save(i);
    }
}
