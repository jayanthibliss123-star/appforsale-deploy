

package com.example.appforsale.controller;

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

    // ── ADMIN: SUBMISSION notifications మాత్రమే ───────────────────────
    @GetMapping("/ADMIN")
    public ResponseEntity<List<Notification>> getAdminNotifications() {
        List<Notification> list = notificationRepository
            .findByRoleAndTypeOrderByCreatedAtDesc("ADMIN", "SUBMISSION");
        return ResponseEntity.ok(list);
    }

    // ── ADMIN: unread count — SUBMISSION only ─────────────────────────
    @GetMapping("/ADMIN/unread-count")
    public ResponseEntity<Map<String, Long>> getAdminUnreadCount() {
        long count = notificationRepository
            .countByRoleAndTypeAndIsRead("ADMIN", "SUBMISSION", false);
        return ResponseEntity.ok(Map.of("count", count));
    }

    // ── ADMIN: mark SUBMISSION notifications as read ──────────────────
    @PutMapping("/ADMIN/mark-read")
    public ResponseEntity<?> markAdminRead() {
        notificationRepository.markAllReadByRoleAndType("ADMIN", "SUBMISSION");
        return ResponseEntity.ok(Map.of("message", "Marked read"));
    }

    // ── USER: APPROVED/REJECTED only, filtered by email ──────────────
    @GetMapping("/USER")
    public ResponseEntity<List<Notification>> getUserNotifications(
            @RequestParam(required = false) String email) {
        List<Notification> list;
        if (email != null && !email.isEmpty()) {
            list = notificationRepository
                .findByRoleAndTargetEmailAndTypeInOrderByCreatedAtDesc(
                    "USER", email, List.of("APPROVED", "REJECTED"));
        } else {
            list = notificationRepository
                .findByRoleAndTypeInOrderByCreatedAtDesc(
                    "USER", List.of("APPROVED", "REJECTED"));
        }
        return ResponseEntity.ok(list);
    }

    // ── USER: unread count — APPROVED/REJECTED only, by email ─────────
    @GetMapping("/USER/unread-count")
    public ResponseEntity<Map<String, Long>> getUserUnreadCount(
            @RequestParam(required = false) String email) {
        long count;
        if (email != null && !email.isEmpty()) {
            count = notificationRepository
                .countByRoleAndTargetEmailAndTypeInAndIsRead(
                    "USER", email, List.of("APPROVED", "REJECTED"), false);
        } else {
            count = notificationRepository
                .countByRoleAndTypeInAndIsRead(
                    "USER", List.of("APPROVED", "REJECTED"), false);
        }
        return ResponseEntity.ok(Map.of("count", count));
    }

    // ── USER: mark read — APPROVED/REJECTED only, by email ────────────
    @PutMapping("/USER/mark-read")
    public ResponseEntity<?> markUserRead(
            @RequestParam(required = false) String email) {
        if (email != null && !email.isEmpty()) {
            notificationRepository.markReadByRoleAndTargetEmailAndTypeIn(
                "USER", email, List.of("APPROVED", "REJECTED"));
        } else {
            notificationRepository.markAllReadByRoleAndTypeIn(
                "USER", List.of("APPROVED", "REJECTED"));
        }
        return ResponseEntity.ok(Map.of("message", "Marked read"));
    }
}