package com.practice.ecom.exception;

import java.time.Instant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class ApiExceptionHandler {

    record Error(Instant timestamp, int status, String error, String message, String path) {

    }

    @ExceptionHandler(ApiException.class)
    ResponseEntity<Error> api(ApiException e, HttpServletRequest r) {
        return ResponseEntity.status(e.status).body(new Error(Instant.now(), e.status, e.code, e.getMessage(), r.getRequestURI()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<Error> validation(MethodArgumentNotValidException e, HttpServletRequest r) {
        String m = e.getBindingResult().getFieldErrors().stream().findFirst().map(x -> x.getField() + " " + x.getDefaultMessage()).orElse("Validation failed");
        return ResponseEntity.badRequest().body(new Error(Instant.now(), 400, "VALIDATION_ERROR", m, r.getRequestURI()));
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<Error> other(Exception e, HttpServletRequest r) {
        return ResponseEntity.status(500).body(new Error(Instant.now(), 500, "INTERNAL_ERROR", "Unexpected server error", r.getRequestURI()));
    }
}
