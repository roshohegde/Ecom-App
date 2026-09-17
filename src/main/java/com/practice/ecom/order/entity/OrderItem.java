package com.practice.ecom.order.entity;

import java.math.BigDecimal;

import com.practice.ecom.common.BaseEntity;
import com.practice.ecom.product.entity.Product;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderItem extends BaseEntity {

    @ManyToOne(optional = false)
    public CustomerOrder order;
    @ManyToOne(optional = false)
    public Product product;
    public String productName;
    public String sku;
    public int quantity;
    public BigDecimal unitPrice;
    public BigDecimal totalPrice;
}
