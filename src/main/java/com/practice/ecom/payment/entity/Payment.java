package com.practice.ecom.payment.entity;

import java.math.BigDecimal;

import com.practice.ecom.common.BaseEntity;
import com.practice.ecom.order.entity.CustomerOrder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Payment extends BaseEntity {

    @Column(unique = true, nullable = false)
    public String paymentReference;
    @OneToOne(optional = false)
    @JoinColumn(unique = true)
    public CustomerOrder order;
    public BigDecimal amount;
    public String currency;
    @Enumerated(EnumType.STRING)
    public Method paymentMethod;
    @Enumerated(EnumType.STRING)
    public Status status = Status.INITIATED;
    public String transactionReference;

    public enum Method {
        CARD, UPI, NET_BANKING, COD
    }

    public enum Status {
        INITIATED, PROCESSING, SUCCESS, FAILED, REFUNDED
    }
}
