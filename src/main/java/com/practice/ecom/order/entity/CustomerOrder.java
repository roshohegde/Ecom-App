package com.practice.ecom.order.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.practice.ecom.common.BaseEntity;
import com.practice.ecom.user.entity.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer_orders")
public class CustomerOrder extends BaseEntity {

    @Column(unique = true, nullable = false)
    public String orderNumber;
    @ManyToOne(optional = false)
    public User user;
    @Enumerated(EnumType.STRING)
    public Status status = Status.PENDING_PAYMENT;
    @Enumerated(EnumType.STRING)
    public PaymentStatus paymentStatus = PaymentStatus.PENDING;
    public BigDecimal subtotal;
    public BigDecimal tax = BigDecimal.ZERO;
    public BigDecimal shippingFee = BigDecimal.ZERO;
    public BigDecimal discount = BigDecimal.ZERO;
    public BigDecimal totalAmount;
    public String currency = "INR";
    @Column(length = 3000)
    public String shippingAddressSnapshot;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<OrderItem> items = new ArrayList<>();

    public enum Status {
        CREATED, PENDING_PAYMENT, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED
    }

    public enum PaymentStatus {
        PENDING, AUTHORIZED, PAID, FAILED, REFUNDED
    }
}
