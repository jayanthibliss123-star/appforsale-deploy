package com.example.appforsale.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {

    // ✅ In-memory notifications (DB add cheyyadam optional)
    private final List<Map<String, Object>> notifications = new ArrayList<>();

    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestBody Map<String, String> req) {
        Map<String, Object> notification = new LinkedHashMap<>();
        notification.put("id", UUID.randomUUID().toString());
        notification.put("title", req.getOrDefault("title", "New Notification"));
        notification.put("message", req.getOrDefault("message", ""));
        notification.put("type", req.getOrDefault("type", "info"));
        notification.put("read", false);
        notification.put("createdAt", LocalDateTime.now().toString());

        notifications.add(0, notification);

        return ResponseEntity.ok(Map.of("success", true, "message", "Notification sent"));
    }

    @GetMapping
    public ResponseEntity<?> getNotifications() {
        return ResponseEntity.ok(notifications);
    }
}