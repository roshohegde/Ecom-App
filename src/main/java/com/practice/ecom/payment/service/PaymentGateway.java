package com.practice.ecom.payment.service;

import java.math.BigDecimal;

import com.practice.ecom.payment.entity.Payment;

public interface PaymentGateway {

    record Result(boolean success, String transactionReference) {

    }

    Result process(BigDecimal amount, Payment.Method method);

    Result refund(String transactionReference);
}
