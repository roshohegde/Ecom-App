package com.practice.ecom.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.practice.ecom.user.repository.UserRepository;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    final JwtService jwt;
    final UserRepository users;

    public JwtFilter(JwtService j, UserRepository u) {
        jwt = j;
        users = u;
    }

    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        String h = req.getHeader("Authorization");
        if (h != null && h.startsWith("Bearer "))try {
            Claims c = jwt.parse(h.substring(7));
            users.findById(Long.valueOf(c.getSubject())).filter(u -> u.status == com.practice.ecom.user.entity.User.UserStatus.ACTIVE).ifPresent(u -> SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(u.id, null, List.of(new SimpleGrantedAuthority("ROLE_" + u.role.name())))));
        } catch (Exception ignored) {
        }
        chain.doFilter(req, res);
    }
}
