package com.example.appforsale.controller;

// import com.example.appforsale.dto.NotificationDto;
// import com.example.appforsale.service.NotificationService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/notifications")
// @RequiredArgsConstructor
// @CrossOrigin(origins = "*")
// public class NotificationController {

//     private final NotificationService notificationService;

//     // Get notifications by role: USER or ADMIN
//     @GetMapping("/{role}")
//     public ResponseEntity<List<NotificationDto>> getNotifications(@PathVariable String role) {
//         return ResponseEntity.ok(notificationService.getNotificationsByRole(role));
//     }

//     // Get unread count
//     @GetMapping("/{role}/unread-count")
//     public ResponseEntity<Map<String, Long>> getUnreadCount(@PathVariable String role) {
//         long count = notificationService.getUnreadCount(role);
//         return ResponseEntity.ok(Map.of("count", count));
//     }

//     // Mark all read
//     @PutMapping("/{role}/mark-read")
//     public ResponseEntity<Map<String, String>> markAllRead(@PathVariable String role) {
//         notificationService.markAllRead(role);
//         return ResponseEntity.ok(Map.of("message", "All notifications marked as read"));
//     }
// }

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.appforsale.entity.Notification;
import com.example.appforsale.repository.NotificationRepository;

import java.util.*;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    // ── ADMIN: get all admin notifications ────────────────────────────
    @GetMapping("/ADMIN")
    public ResponseEntity<List<Notification>> getAdminNotifications() {
        List<Notification> list = notificationRepository.findByRoleOrderByCreatedAtDesc("ADMIN");
        return ResponseEntity.ok(list);
    }

    // ── ADMIN: unread count (for bell badge) ──────────────────────────
    @GetMapping("/ADMIN/unread-count")
    public ResponseEntity<Map<String, Long>> getAdminUnreadCount() {
        long count = notificationRepository.countByRoleAndIsRead("ADMIN", false);
        return ResponseEntity.ok(Map.of("count", count));
    }

    // ── ADMIN: mark all as read ───────────────────────────────────────
    @PutMapping("/ADMIN/mark-read")
    public ResponseEntity<?> markAdminRead() {
        notificationRepository.markAllReadByRole("ADMIN");
        return ResponseEntity.ok(Map.of("message", "Marked all admin notifications as read"));
    }

    // ── USER: get notifications for a specific user email ─────────────
    // Called with: GET /api/notifications/USER?email=owner@gmail.com
    @GetMapping("/USER")
    public ResponseEntity<List<Notification>> getUserNotifications(
            @RequestParam(required = false) String email) {
        List<Notification> list;
        if (email != null && !email.isEmpty()) {
            list = notificationRepository
                .findByRoleAndTargetEmailOrderByCreatedAtDesc("USER", email);
        } else {
            list = notificationRepository.findByRoleOrderByCreatedAtDesc("USER");
        }
        return ResponseEntity.ok(list);
    }

    // ── USER: unread count for specific email ────────────────────────
    @GetMapping("/USER/unread-count")
    public ResponseEntity<Map<String, Long>> getUserUnreadCount(
            @RequestParam(required = false) String email) {
        long count;
        if (email != null && !email.isEmpty()) {
            count = notificationRepository
                .countByRoleAndTargetEmailAndIsRead("USER", email, false);
        } else {
            count = notificationRepository.countByRoleAndIsRead("USER", false);
        }
        return ResponseEntity.ok(Map.of("count", count));
    }

    // ── USER: mark all read for specific email ───────────────────────
    @PutMapping("/USER/mark-read")
    public ResponseEntity<?> markUserRead(
            @RequestParam(required = false) String email) {
        if (email != null && !email.isEmpty()) {
            notificationRepository.markAllReadByRoleAndEmail("USER", email);
        } else {
            notificationRepository.markAllReadByRole("USER");
        }
        return ResponseEntity.ok(Map.of("message", "Marked read"));
    }
}