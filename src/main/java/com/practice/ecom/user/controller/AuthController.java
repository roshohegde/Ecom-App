package com.practice.ecom.user.controller;

import java.util.Locale;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.ecom.exception.ApiException;
import com.practice.ecom.security.JwtService;
import com.practice.ecom.user.entity.User;
import com.practice.ecom.user.repository.UserRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    final UserRepository users;
    final PasswordEncoder encoder;
    final JwtService jwt;

    public AuthController(UserRepository u, PasswordEncoder e, JwtService j) {
        users = u;
        encoder = e;
        jwt = j;
    }

    public record Register(@NotBlank String firstName, @NotBlank String lastName, @Email String email, @Size(min = 8) String password, String mobileNumber, User.Role role) {

    }

    public record Login(@Email String email, @NotBlank String password) {

    }

    public record Auth(String token, Long userId, String email, String role) {

    }

    @PostMapping("/register")
    ResponseEntity<Auth> register(@Valid @RequestBody Register r) {
        String email = r.email().trim().toLowerCase(Locale.ROOT);
        if (users.findByEmail(email).isPresent()) {
            throw new ApiException(409, "DUPLICATE_RESOURCE", "Email already registered");
        
        }User u = new User();
        u.firstName = r.firstName();
        u.lastName = r.lastName();
        u.email = email;
        u.password = encoder.encode(r.password());
        u.mobileNumber = r.mobileNumber();
        u.role = r.role() == User.Role.SELLER ? User.Role.SELLER : User.Role.CUSTOMER;
        users.save(u);
        return ResponseEntity.status(201).body(new Auth(jwt.create(u), u.id, u.email, u.role.name()));
    }

    @PostMapping("/login")
    Auth login(@Valid @RequestBody Login r) {
        User u = users.findByEmail(r.email().trim().toLowerCase(Locale.ROOT)).orElseThrow(() -> new ApiException(401, "UNAUTHORIZED", "Invalid email or password"));
        if (u.status != User.UserStatus.ACTIVE || !encoder.matches(r.password(), u.password)) {
            throw new ApiException(401, "UNAUTHORIZED", "Invalid email or password");
        
        }return new Auth(jwt.create(u), u.id, u.email, u.role.name());
    }
}
