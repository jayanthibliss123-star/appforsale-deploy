package com.example.appforsale.service;

import com.example.appforsale.dto.UserDto;
import com.example.appforsale.entity.User;
import com.example.appforsale.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    public UserDto getProfile(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return toDto(user);
    }

    public UserDto updateProfile(Long userId, Map<String, String> req) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (req.containsKey("fullName") && req.get("fullName") != null
                && !req.get("fullName").isBlank())
            user.setFullName(req.get("fullName").trim());

        // ✅ Phone — duplicate check
        if (req.containsKey("phone") && req.get("phone") != null
                && !req.get("phone").isBlank()) {
            String newPhone = req.get("phone").trim();
            if (!newPhone.equals(user.getMobile())) {
                boolean alreadyExists = userRepository.existsByMobile(newPhone);
                if (alreadyExists) {
                    throw new RuntimeException(
                        "This phone number is already registered to another account."
                    );
                }
                user.setMobile(newPhone);
            }
        }

        if (req.containsKey("role") && req.get("role") != null)
            user.setRole(req.get("role").trim());

        if (req.containsKey("location") && req.get("location") != null)
            user.setLocation(req.get("location").trim());

        if (req.containsKey("company") && req.get("company") != null)
            user.setCompany(req.get("company").trim());

        if (req.containsKey("department") && req.get("department") != null)
            user.setDepartment(req.get("department").trim());

        if (req.containsKey("bio") && req.get("bio") != null)
            user.setBio(req.get("bio").trim());

        User saved = userRepository.save(user);
        return toDto(saved);
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
            .location(u.getLocation())
            .company(u.getCompany())
            .department(u.getDepartment())
            .bio(u.getBio())
            .build();
    }
}