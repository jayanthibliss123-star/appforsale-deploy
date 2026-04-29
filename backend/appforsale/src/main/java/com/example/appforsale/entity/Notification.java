package com.example.appforsale.entity;



import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    // "SUBMISSION" | "APPROVED" | "REJECTED"
    private String type;

    // "ADMIN" | "USER"
    private String role;

    // For USER notifications — which user's email to target
    private String targetEmail;

    private boolean isRead = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    // ── Getters & Setters ──────────────────────────
    public Long getId()                        { return id; }
    public String getTitle()                   { return title; }
    public void setTitle(String title)         { this.title = title; }
    public String getMessage()                 { return message; }
    public void setMessage(String message)     { this.message = message; }
    public String getType()                    { return type; }
    public void setType(String type)           { this.type = type; }
    public String getRole()                    { return role; }
    public void setRole(String role)           { this.role = role; }
    public String getTargetEmail()             { return targetEmail; }
    public void setTargetEmail(String e)       { this.targetEmail = e; }
    public boolean isRead()                    { return isRead; }
    public void setRead(boolean read)          { this.isRead = read; }
    public LocalDateTime getCreatedAt()        { return createdAt; }
    public void setCreatedAt(LocalDateTime t)  { this.createdAt = t; }
}