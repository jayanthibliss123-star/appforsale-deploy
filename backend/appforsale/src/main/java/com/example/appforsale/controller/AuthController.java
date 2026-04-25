package com.example.appforsale.controller;




import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.example.appforsale.dto.AuthResponse;
import com.example.appforsale.dto.SignInRequest;
import com.example.appforsale.dto.SignUpRequest;
import com.example.appforsale.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@Valid @RequestBody SignUpRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(authService.signUp(req));
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@Valid @RequestBody SignInRequest req) {
        return ResponseEntity.ok(authService.signIn(req));
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Auth service running ✓");
    }
    @PostMapping("/forgot-password")
public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> req) {
    System.out.println("🔥 FORGOT PASSWORD HIT: " + req);
    return ResponseEntity.ok(
        AuthResponse.builder()
            .success(true)
            .message("Test working!")
            .build()
    );
}
@PostMapping("/reset-password")
public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> req) {
    String email = req.getOrDefault("email", "").trim().toLowerCase();
    String newPassword = req.getOrDefault("newPassword", "").trim();

    if (email.isEmpty() || newPassword.isEmpty()) {
        return ResponseEntity.badRequest().body(
            AuthResponse.builder()
                .success(false)
                .message("Email and password are required")
                .build()
        );
    }

    return ResponseEntity.ok(authService.resetPassword(email, newPassword));
}
}
