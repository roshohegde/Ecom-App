package com.practice.ecom.category.entity;

import com.practice.ecom.common.BaseEntity;
import jakarta.persistence.*;

@Entity
public class Category extends BaseEntity {
    @Column(nullable = false, unique = true)
    public String name;
    @Column(length = 2000)
    public String description;
    @Enumerated(EnumType.STRING)
    public Status status = Status.ACTIVE;

    public enum Status {ACTIVE, INACTIVE}
}
