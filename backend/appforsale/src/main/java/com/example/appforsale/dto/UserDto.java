package com.example.appforsale.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String fullName;
    private String name;        // ✅ frontend ki
    private String email;
    private String mobile;
    private String phone;       // ✅ frontend ki
    private String role;
    private String location;
    private String company;
    private String department;
    private String bio;
}