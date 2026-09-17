package com.practice.ecom.config;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.practice.ecom.category.entity.Category;
import com.practice.ecom.category.repository.CategoryRepository;
import com.practice.ecom.inventory.entity.Inventory;
import com.practice.ecom.inventory.repository.InventoryRepository;
import com.practice.ecom.product.entity.Product;
import com.practice.ecom.product.repository.ProductRepository;
import com.practice.ecom.user.entity.User;
import com.practice.ecom.user.repository.UserRepository;

@Configuration
public class DemoDataInitializer {

    @Bean
    CommandLineRunner demoData(UserRepository users, CategoryRepository categories, ProductRepository products, InventoryRepository inventory, PasswordEncoder encoder) {
        return args -> {
            User seller = user(users, encoder, "seller@nova.local", "Sam", "Seller", User.Role.SELLER);
            user(users, encoder, "admin@nova.local", "Nova", "Admin", User.Role.ADMIN);
            user(users, encoder, "customer@nova.local", "Casey", "Customer", User.Role.CUSTOMER);
            Category home = category(categories, "Home", "Practical pieces for a calmer home");
            Category desk = category(categories, "Desk", "Tools for focused work");
            product(products, inventory, seller, home, "NOVA-MUG-01", "Stoneware Mug", "Hand-finished stoneware for your morning ritual.", new BigDecimal("799"), 24);
            product(products, inventory, seller, desk, "NOVA-NOTE-01", "Daily Notes", "A clean notebook for everyday ideas.", new BigDecimal("499"), 40);
            product(products, inventory, seller, home, "NOVA-LAMP-01", "Soft Light Lamp", "Warm, diffused light for the end of the day.", new BigDecimal("2499"), 8);
        };
    }

    private User user(UserRepository r, PasswordEncoder e, String email, String first, String last, User.Role role) {
        return r.findByEmail(email).orElseGet(() -> {
            User u = new User();
            u.email = email;
            u.firstName = first;
            u.lastName = last;
            u.role = role;
            u.password = e.encode("Password@123");
            return r.save(u);
        });
    }

    private Category category(CategoryRepository r, String name, String description) {
        return r.findAll().stream().filter(c -> c.name.equals(name)).findFirst().orElseGet(() -> {
            Category c = new Category();
            c.name = name;
            c.description = description;
            return r.save(c);
        });
    }

    private void product(ProductRepository products, InventoryRepository inventory, User seller, Category category, String sku, String name, String description, BigDecimal price, int stock) {
        if (products.findBySku(sku).isPresent()) {
            return;
        
        }Product p = new Product();
        p.sku = sku;
        p.name = name;
        p.description = description;
        p.price = price;
        p.category = category;
        p.seller = seller;
        products.save(p);
        Inventory i = new Inventory();
        i.product = p;
        i.availableQuantity = stock;
        i.reorderLevel = 5;
        inventory.save(i);
    }
}
