package com.example.appforsale.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.appforsale.entity.Notification;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // All notifications for a role (ADMIN or USER), newest first
    List<Notification> findByRoleOrderByCreatedAtDesc(String role);

    // Unread count for a role
    long countByRoleAndIsRead(String role, boolean isRead);

    // Mark all as read for a role
    @Modifying
    @Transactional
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.role = :role")
    void markAllReadByRole(String role);

    // USER notifications — filter by ownerEmail
    List<Notification> findByRoleAndTargetEmailOrderByCreatedAtDesc(String role, String targetEmail);

    // Unread count for a specific user email
    long countByRoleAndTargetEmailAndIsRead(String role, String targetEmail, boolean isRead);

    // Mark all read for a specific user email
    @Modifying
    @Transactional
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.role = :role AND n.targetEmail = :email")
    void markAllReadByRoleAndEmail(String role, String email);
}