package com.practice.ecom.security;

import org.springframework.security.core.context.SecurityContextHolder;

import com.practice.ecom.exception.ApiException;

public final class CurrentUser {

    private CurrentUser() {
    }

    public static Long id() {
        Object p = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (p instanceof Long id) {
            return id;
        
        }throw new ApiException(401, "UNAUTHORIZED", "Authentication required");
    }
}
