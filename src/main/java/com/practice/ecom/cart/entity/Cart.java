package com.practice.ecom.cart.entity;

import java.util.ArrayList;
import java.util.List;

import com.practice.ecom.common.BaseEntity;
import com.practice.ecom.user.entity.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Cart extends BaseEntity {

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    public User user;
    @Enumerated(EnumType.STRING)
    public Status status = Status.ACTIVE;
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<CartItem> items = new ArrayList<>();

    public enum Status {
        ACTIVE, CHECKED_OUT, ABANDONED
    }
}
