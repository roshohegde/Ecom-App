package com.practice.ecom.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.ecom.user.entity.User;
import com.practice.ecom.user.service.AuthService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    public record Register(@NotBlank String firstName, @NotBlank String lastName, @Email String email, @Size(min = 8) String password, String mobileNumber, User.Role role) {

    }

    public record Login(@Email String email, @NotBlank String password) {

    }

    public record Auth(String token, Long userId, String email, String role) {}

    @PostMapping("/register")
    ResponseEntity<Auth> register(@Valid @RequestBody Register r) {
        AuthService.AuthResult result = auth.register(new AuthService.RegisterCommand(
                r.firstName(), r.lastName(), r.email(), r.password(), r.mobileNumber(), r.role()));
        return ResponseEntity.status(201).body(toAuth(result));
    }

    @PostMapping("/login")
    Auth login(@Valid @RequestBody Login r) {
        return toAuth(auth.login(new AuthService.LoginCommand(r.email(), r.password())));
    }

    private Auth toAuth(AuthService.AuthResult result) {
        return new Auth(result.token(), result.userId(), result.email(), result.role());
    }
}
