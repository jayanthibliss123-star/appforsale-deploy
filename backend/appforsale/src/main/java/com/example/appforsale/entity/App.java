// package com.example.appforsale.entity;



// import jakarta.persistence.*;

// @Entity
// @Table(name = "apps")
// public class App {

//     @Id
//     @GeneratedValue(strategy = GenerationType.UUID)
//     private String id;

//     private String title;

//     @Column(columnDefinition = "TEXT")
//     private String description;

//     private String category;
//     private Double price;
//     private String ownerName;
//     private String ownerEmail;
//     private String ownerPhone;
//     private String company;

//     @Column(columnDefinition = "TEXT")
//     private String features;

//     private String imageUrl;

//     // PENDING | APPROVED | REJECTED
//     @Column(nullable = false)
//     private String status = "PENDING";

//     // ── Getters & Setters ──────────────────────────
//     public String getId()                      { return id; }
//     public String getTitle()                   { return title; }
//     public void setTitle(String t)             { this.title = t; }
//     public String getDescription()             { return description; }
//     public void setDescription(String d)       { this.description = d; }
//     public String getCategory()                { return category; }
//     public void setCategory(String c)          { this.category = c; }
//     public Double getPrice()                   { return price; }
//     public void setPrice(Double p)             { this.price = p; }
//     public String getOwnerName()               { return ownerName; }
//     public void setOwnerName(String n)         { this.ownerName = n; }
//     public String getOwnerEmail()              { return ownerEmail; }
//     public void setOwnerEmail(String e)        { this.ownerEmail = e; }
//     public String getOwnerPhone()              { return ownerPhone; }
//     public void setOwnerPhone(String p)        { this.ownerPhone = p; }
//     public String getCompany()                 { return company; }
//     public void setCompany(String c)           { this.company = c; }
//     public String getFeatures()                { return features; }
//     public void setFeatures(String f)          { this.features = f; }
//     public String getImageUrl()                { return imageUrl; }
//     public void setImageUrl(String u)          { this.imageUrl = u; }
//     public String getStatus()                  { return status; }
//     public void setStatus(String s)            { this.status = s; }
// }

package com.example.appforsale.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "apps")
public class App {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;

    private Double price;

    private String ownerName;
    private String ownerEmail;
    private String ownerPhone;
    private String company;
@ElementCollection
@CollectionTable(name = "app_images", joinColumns = @JoinColumn(name = "app_id"))
@Column(name = "image_url")
private List<String> imageUrls = new ArrayList<>();
    @Column(columnDefinition = "TEXT")
    private String features;

    private String imageUrl;

    // PENDING | APPROVED | REJECTED
    @Column(nullable = false)
    private String status = "PENDING";

    // 🔥 FIX: created_at column mapping
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // 🔥 auto set time before insert
    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // ── Getters & Setters ──────────────────────────

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }

    public String getOwnerName() {
        return ownerName;
    }
    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }
    

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }
    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public String getOwnerPhone() {
        return ownerPhone;
    }
    public void setOwnerPhone(String ownerPhone) {
        this.ownerPhone = ownerPhone;
    }

    public String getCompany() {
        return company;
    }
    public void setCompany(String company) {
        this.company = company;
    }

    public String getFeatures() {
        return features;
    }
    public void setFeatures(String features) {
        this.features = features;
    }

    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}