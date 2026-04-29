package com.example.appforsale.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationDto {
    private Long id;
    private String title;
    private String message;
    private String type;
    private String role;
    private boolean isRead;
    private LocalDateTime createdAt;
}