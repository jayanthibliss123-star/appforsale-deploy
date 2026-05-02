package com.example.appforsale.service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.appforsale.dto.AuthResponse;
import com.example.appforsale.dto.SignInRequest;
import com.example.appforsale.dto.SignUpRequest;
import com.example.appforsale.dto.UserDto;
import com.example.appforsale.entity.User;
import com.example.appforsale.exception.InvalidCredentialsException;
import com.example.appforsale.exception.UserAlreadyExistsException;
import com.example.appforsale.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthResponse signUp(SignUpRequest req) {
        String email  = req.getEmail().trim().toLowerCase();
        String mobile = req.getMobile().trim();

        if (userRepository.existsByEmailIgnoreCase(email))
            throw new UserAlreadyExistsException(
                "This email is already registered. Please sign in.");

        if (userRepository.existsByMobile(mobile))
            throw new UserAlreadyExistsException(
                "This mobile number is already registered.");

        User user = User.builder()
            .fullName(req.getFullName().trim())
            .email(email)
            .mobile(mobile)
            .password(passwordEncoder.encode(req.getPassword()))
            .build();

        User saved = userRepository.save(user);

        return AuthResponse.builder()
            .success(true)
            .message("Account created successfully! Welcome aboard.")
            .user(toDto(saved))
            .build();
    }

    public AuthResponse signIn(SignInRequest req) {
        String email = req.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new InvalidCredentialsException(
                "No account found with this email. Please sign up first."));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
            throw new InvalidCredentialsException(
                "Incorrect password. Please try again.");

        return AuthResponse.builder()
            .success(true)
            .message("Welcome back!")
            .user(toDto(user))
            .build();
    }

    private UserDto toDto(User u) {
        return UserDto.builder()
            .id(u.getId())
            .fullName(u.getFullName())
            .name(u.getFullName())
            .email(u.getEmail())
            .mobile(u.getMobile())
            .phone(u.getMobile())
            .role(u.getRole())
            // .location(u.getLocation())
            // .company(u.getCompany())
            // .department(u.getDepartment())
            // .bio(u.getBio())
            .build();
    }
    public AuthResponse forgotPassword(String email) {
    try {
        String normalizedEmail = email.trim().toLowerCase();

        System.out.println("🔍 Looking for email: " + normalizedEmail); // ADD

        User user = userRepository.findByEmailIgnoreCase(normalizedEmail)
            .orElse(null);

        System.out.println("👤 User found: " + (user != null)); // ADD

        if (user == null) {
            return AuthResponse.builder()
                .success(false)
                .message("Email not registered")
                .build();
        }

        System.out.println("✅ Returning success"); // ADD

        return AuthResponse.builder()
            .success(true)
            .message("Reset link sent to your email")
            .build();

    } catch (Exception e) {
        System.out.println("❌ forgotPassword crashed: " + e.getMessage()); // ADD
        e.printStackTrace();
        throw e;
    }
}
public AuthResponse resetPassword(String email, String newPassword) {
    User user = userRepository.findByEmailIgnoreCase(email).orElse(null);

    if (user == null) {
        return AuthResponse.builder()
            .success(false)
            .message("Email not registered")
            .build();
    }

    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);

    return AuthResponse.builder()
        .success(true)
        .message("Password updated successfully!")
        .build();
}
}
