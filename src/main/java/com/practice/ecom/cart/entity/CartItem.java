package com.practice.ecom.cart.entity;

import java.math.BigDecimal;

import com.practice.ecom.common.BaseEntity;
import com.practice.ecom.product.entity.Product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItem extends BaseEntity {

    @ManyToOne(optional = false)
    public Cart cart;
    @ManyToOne(optional = false)
    public Product product;
    public int quantity;
    @Column(precision = 19, scale = 2)
    public BigDecimal unitPrice;
}
