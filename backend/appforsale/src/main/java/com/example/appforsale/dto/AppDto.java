package com.example.appforsale.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppDto {
    private Long id;
    private String title;
    private String description;
    private String category;
    private Double price;
    private String ownerName;
    private String ownerEmail;
    private String ownerPhone;
    private String company;
    private String features;
    private String imageUrl;
    private String createdAt;
}