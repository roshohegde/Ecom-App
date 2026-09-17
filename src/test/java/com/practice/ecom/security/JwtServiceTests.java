package com.practice.ecom.security;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

import com.practice.ecom.user.entity.User;

class JwtServiceTests {

    @Test
    void token_contains_identity_and_role() {
        JwtService service = new JwtService("a-development-test-secret-that-is-long-enough", 60_000);
        User user = new User();
        user.id = 42L;
        user.email = "customer@example.com";
        String token = service.create(user);
        assertThat(service.parse(token).getSubject()).isEqualTo("42");
        assertThat(service.parse(token).get("role", String.class)).isEqualTo("CUSTOMER");
    }
}
