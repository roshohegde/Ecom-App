package com.practice.ecom.inventory.entity;

import com.practice.ecom.common.BaseEntity;
import com.practice.ecom.product.entity.Product;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Version;

@Entity
public class Inventory extends BaseEntity {

    @OneToOne(optional = false)
    @JoinColumn(unique = true)
    public Product product;
    public int availableQuantity;
    public int reservedQuantity;
    public int reorderLevel;
    @Version
    public Long version;
}
