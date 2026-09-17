package com.practice.ecom.address.entity;
import com.practice.ecom.common.BaseEntity; import com.practice.ecom.user.entity.User; import jakarta.persistence.*;
@Entity public class Address extends BaseEntity { @ManyToOne(optional=false) public User user; public String addressLine1; public String addressLine2; public String city; public String state; public String country; public String postalCode; @Enumerated(EnumType.STRING) public Type addressType=Type.HOME; public boolean defaultAddress; public enum Type {HOME,WORK,OTHER} }
