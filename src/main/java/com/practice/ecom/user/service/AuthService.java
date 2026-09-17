package com.practice.ecom.user.service;

import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.practice.ecom.exception.ApiException;
import com.practice.ecom.security.JwtService;
import com.practice.ecom.user.entity.User;
import com.practice.ecom.user.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public record RegisterCommand(String firstName, String lastName, String email, String password,
            String mobileNumber, User.Role role) {

    }

    public record LoginCommand(String email, String password) {

    }

    public record AuthResult(String token, Long userId, String email, String role) {

    }

    @Transactional
    public AuthResult register(RegisterCommand command) {
        String email = command.email().trim().toLowerCase(Locale.ROOT);
        if (users.findByEmail(email).isPresent()) {
            throw new ApiException(409, "DUPLICATE_RESOURCE", "Email already registered");
        }
        User user = new User();
        user.firstName = command.firstName();
        user.lastName = command.lastName();
        user.email = email;
        user.password = encoder.encode(command.password());
        user.mobileNumber = command.mobileNumber();
        user.role = command.role() == User.Role.SELLER ? User.Role.SELLER : User.Role.CUSTOMER;
        users.save(user);
        return result(user);
    }

    @Transactional(readOnly = true)
    public AuthResult login(LoginCommand command) {
        User user = users.findByEmail(command.email().trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new ApiException(401, "UNAUTHORIZED", "Invalid email or password"));
        if (user.status != User.UserStatus.ACTIVE || !encoder.matches(command.password(), user.password)) {
            throw new ApiException(401, "UNAUTHORIZED", "Invalid email or password");
        }
        return result(user);
    }

    private AuthResult result(User user) {
        return new AuthResult(jwt.create(user), user.id, user.email, user.role.name());
    }
}
