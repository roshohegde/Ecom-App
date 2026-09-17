package com.practice.ecom.user.entity;

import java.util.UUID;

import com.practice.ecom.common.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @Column(nullable = false, unique = true, updatable = false)
    public UUID uuid = UUID.randomUUID();
    @Column(nullable = false)
    public String firstName;
    @Column(nullable = false)
    public String lastName;
    @Column(nullable = false, unique = true)
    public String email;
    @Column(nullable = false)
    public String password;
    public String mobileNumber;
    @Enumerated(EnumType.STRING)
    public UserStatus status = UserStatus.ACTIVE;
    @Enumerated(EnumType.STRING)
    public Role role = Role.CUSTOMER;

    public enum Role {
        CUSTOMER, SELLER, ADMIN
    }

    public enum UserStatus {
        ACTIVE, INACTIVE, BLOCKED
    }
}
