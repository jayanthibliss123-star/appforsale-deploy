package com.example.appforsale.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.appforsale.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
