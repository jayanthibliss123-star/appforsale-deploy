
package com.example.appforsale.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.appforsale.entity.Notification;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // ── ADMIN queries (SUBMISSION type only) ──────────────────────────

    List<Notification> findByRoleAndTypeOrderByCreatedAtDesc(String role, String type);

    long countByRoleAndTypeAndIsRead(String role, String type, boolean isRead);

    @Modifying
    @Transactional
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.role = :role AND n.type = :type")
    void markAllReadByRoleAndType(@Param("role") String role, @Param("type") String type);

    // ── USER queries (APPROVED/REJECTED types, filtered by email) ─────

    List<Notification> findByRoleAndTargetEmailAndTypeInOrderByCreatedAtDesc(
        String role, String targetEmail, List<String> types);

    List<Notification> findByRoleAndTypeInOrderByCreatedAtDesc(
        String role, List<String> types);

    long countByRoleAndTargetEmailAndTypeInAndIsRead(
        String role, String targetEmail, List<String> types, boolean isRead);

    long countByRoleAndTypeInAndIsRead(
        String role, List<String> types, boolean isRead);

    @Modifying
    @Transactional
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.role = :role AND n.targetEmail = :email AND n.type IN :types")
    void markReadByRoleAndTargetEmailAndTypeIn(
        @Param("role") String role,
        @Param("email") String email,
        @Param("types") List<String> types);

    @Modifying
    @Transactional
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.role = :role AND n.type IN :types")
    void markAllReadByRoleAndTypeIn(
        @Param("role") String role,
        @Param("types") List<String> types);
}