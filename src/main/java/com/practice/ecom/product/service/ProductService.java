package com.practice.ecom.product.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.practice.ecom.category.entity.Category;
import com.practice.ecom.category.repository.CategoryRepository;
import com.practice.ecom.exception.ApiException;
import com.practice.ecom.inventory.entity.Inventory;
import com.practice.ecom.inventory.repository.InventoryRepository;
import com.practice.ecom.product.entity.Product;
import com.practice.ecom.product.repository.ProductRepository;
import com.practice.ecom.user.repository.UserRepository;

@Service
public class ProductService {

    private final ProductRepository products;
    private final CategoryRepository categories;
    private final InventoryRepository inventory;
    private final UserRepository users;

    public ProductService(ProductRepository products, CategoryRepository categories, InventoryRepository inventory, UserRepository users) {
        this.products = products;
        this.categories = categories;
        this.inventory = inventory;
        this.users = users;
    }

    public record ProductCommand(String sku, String name, String description, BigDecimal price, Long categoryId, Integer availableQuantity) {

    }

    public record ProductView(Long id, String sku, String name, String description, BigDecimal price, String category, String status, Integer availableQuantity) {

    }

    @Transactional(readOnly = true)
    public Page<ProductView> list(String category, String query, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        Specification<Product> specification = (root, unused, builder) -> builder.equal(root.get("status"), Product.Status.ACTIVE);
        if (category != null) {
            specification = specification.and((root, unused, builder) -> builder.equal(builder.lower(root.get("category").get("name")), category.toLowerCase()));
        }
        if (query != null) {
            specification = specification.and((root, unused, builder) -> builder.or(builder.like(builder.lower(root.get("name")), "%" + query.toLowerCase() + "%"), builder.like(builder.lower(root.get("sku")), "%" + query.toLowerCase() + "%")));
        }
        if (minPrice != null) {
            specification = specification.and((root, unused, builder) -> builder.greaterThanOrEqualTo(root.get("price"), minPrice));
        }
        if (maxPrice != null) {
            specification = specification.and((root, unused, builder) -> builder.lessThanOrEqualTo(root.get("price"), maxPrice));
        }
        return products.findAll(specification, pageable).map(this::view);
    }

    @Transactional(readOnly = true)
    public ProductView one(Long id) {
        Product product = get(id);
        if (product.status != Product.Status.ACTIVE) {
            throw new ApiException(404, "NOT_FOUND", "Product not found");
        }
        return view(product);
    }

    @Transactional(readOnly = true)
    public List<Category> categories() {
        return categories.findByStatus(Category.Status.ACTIVE);
    }

    @Transactional
    public Category createCategory(Category category) {
        category.id = null;
        return categories.save(category);
    }

    @Transactional
    public ProductView create(ProductCommand command, Long sellerId) {
        if (products.findBySku(command.sku()).isPresent()) {
            throw new ApiException(409, "DUPLICATE_RESOURCE", "SKU already exists");
        }
        Product product = new Product();
        apply(product, command);
        if (sellerId != null) {
            product.seller = users.getReferenceById(sellerId);
        }
        products.save(product);
        setInventory(product, command.availableQuantity());
        return view(product);
    }

    @Transactional
    public ProductView update(Long id, ProductCommand command, Long sellerId) {
        Product product = sellerId == null ? get(id) : owned(id, sellerId);
        apply(product, command);
        setInventory(product, command.availableQuantity());
        return view(products.save(product));
    }

    @Transactional
    public void delete(Long id, Long sellerId) {
        Product product = sellerId == null ? get(id) : owned(id, sellerId);
        product.status = Product.Status.DISCONTINUED;
        products.save(product);
    }

    @Transactional(readOnly = true)
    public Page<ProductView> sellerProducts(Long sellerId, Pageable pageable) {
        return products.findBySellerIdAndStatus(sellerId, Product.Status.ACTIVE, pageable).map(this::view);
    }

    private Product get(Long id) {
        return products.findById(id).orElseThrow(() -> new ApiException(404, "NOT_FOUND", "Product not found"));
    }

    private Product owned(Long id, Long sellerId) {
        Product product = get(id);
        if (product.seller == null || !product.seller.id.equals(sellerId)) {
            throw new ApiException(403, "FORBIDDEN", "You can manage only your own products");
        }
        return product;
    }

    private void apply(Product product, ProductCommand command) {
        product.sku = command.sku();
        product.name = command.name();
        product.description = command.description();
        product.price = command.price();
        product.category = categories.findById(command.categoryId()).orElseThrow(() -> new ApiException(404, "NOT_FOUND", "Category not found"));
    }

    private void setInventory(Product product, Integer quantity) {
        Inventory stock = inventory.findByProductId(product.id).orElseGet(() -> {
            Inventory created = new Inventory();
            created.product = product;
            return created;
        });
        if (quantity != null) {
            if (quantity < stock.reservedQuantity) {
                throw new ApiException(409, "INSUFFICIENT_INVENTORY", "Stock cannot be lower than reserved stock");
            }
            stock.availableQuantity = quantity;
        }
        inventory.save(stock);
    }

    private ProductView view(Product product) {
        return new ProductView(product.id, product.sku, product.name, product.description, product.price, product.category.name, product.status.name(), inventory.findByProductId(product.id).map(stock -> stock.availableQuantity).orElse(0));
    }
}
