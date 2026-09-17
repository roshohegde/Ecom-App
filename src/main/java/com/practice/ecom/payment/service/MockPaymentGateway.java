package com.practice.ecom.payment.service;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.practice.ecom.payment.entity.Payment;

@Component
public class MockPaymentGateway implements PaymentGateway {

    public Result process(BigDecimal amount, Payment.Method method) {
        return new Result(method != Payment.Method.CARD || amount.signum() > 0, "txn_" + UUID.randomUUID());
    }

    public Result refund(String ref) {
        return new Result(true, "refund_" + UUID.randomUUID());
    }
}
