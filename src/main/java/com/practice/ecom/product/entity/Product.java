package com.practice.ecom.product.entity;

import java.math.BigDecimal;

import com.practice.ecom.category.entity.Category;
import com.practice.ecom.common.BaseEntity;
import com.practice.ecom.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;

@Entity
public class Product extends BaseEntity {

    @Column(nullable = false, unique = true)
    public String sku;
    @Column(nullable = false)
    public String name;
    @Column(length = 4000)
    public String description;
    @Column(nullable = false, precision = 19, scale = 2)
    public BigDecimal price;
    public String currency = "INR";
    @ManyToOne(optional = false)
    public Category category;
    @ManyToOne
    public User seller;
    @Enumerated(EnumType.STRING)
    public Status status = Status.ACTIVE;

    public enum Status {
        ACTIVE, INACTIVE, DISCONTINUED
    }
}
