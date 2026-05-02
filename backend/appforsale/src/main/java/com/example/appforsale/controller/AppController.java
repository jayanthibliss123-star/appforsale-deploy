
package com.example.appforsale.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.appforsale.entity.App;
import com.example.appforsale.entity.Notification;
import com.example.appforsale.repository.AppRepository;
import com.example.appforsale.repository.NotificationRepository;

import java.util.*;

@RestController
@RequestMapping("/api/apps")
@CrossOrigin(origins = "*")
public class AppController {

    @Autowired private AppRepository appRepository;
    @Autowired private NotificationRepository notificationRepository;

    // ── UPLOAD ────────────────────────────────────────────────────────────
    @PostMapping("/upload")
    public ResponseEntity<?> uploadApp(@RequestBody App app) {

        // Always PENDING on upload (admin direct publish వేరే flow — approve API call చేస్తాం)
        app.setStatus("PENDING");

        // First image as imageUrl (backward compat)
        if (app.getImageUrls() != null && !app.getImageUrls().isEmpty()) {
            app.setImageUrl(app.getImageUrls().get(0));
        }

        App saved = appRepository.save(app);

        // ✅ ADMIN కి SUBMISSION notification మాత్రమే — user కి ఏమీ వద్దు
        Notification adminNotif = new Notification();
        adminNotif.setTitle("New App Submitted: " + app.getTitle());
        adminNotif.setMessage(
            "\"" + app.getTitle() + "\" submitted by " + app.getOwnerName() +
            " (" + app.getOwnerEmail() + ")" +
            " — Category: " + app.getCategory() +
            " — Price: ₹" + (app.getPrice() != null ? app.getPrice().longValue() : 0)
        );
        adminNotif.setType("SUBMISSION");
        adminNotif.setRole("ADMIN");
        adminNotif.setTargetEmail(null); // admin-wide
        adminNotif.setRead(false);
        notificationRepository.save(adminNotif);

        return ResponseEntity.ok(Map.of("message", "App submitted", "id", saved.getId()));
    }

    // ── GET APPROVED (marketplace) ─────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<App>> getApprovedApps() {
        return ResponseEntity.ok(appRepository.findByStatus("APPROVED"));
    }

    // ── GET PENDING (admin queue) ──────────────────────────────────────
    @GetMapping("/pending")
    public ResponseEntity<List<App>> getPendingApps() {
        return ResponseEntity.ok(appRepository.findByStatus("PENDING"));
    }

    // ── APPROVE ────────────────────────────────────────────────────────
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveApp(@PathVariable Long id) {
        App app = appRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("App not found"));
        app.setStatus("APPROVED");
        appRepository.save(app);

        // ✅ USER కి మాత్రమే APPROVED notification — admin కి వద్దు
        Notification userNotif = new Notification();
        userNotif.setTitle("✅ Your App is Approved!");
        userNotif.setMessage(
            "Your app \"" + app.getTitle() + "\" has been approved and is now live in the marketplace!"
        );
        userNotif.setType("APPROVED");
        userNotif.setRole("USER");
        userNotif.setTargetEmail(app.getOwnerEmail()); // owner కి మాత్రమే
        userNotif.setRead(false);
        notificationRepository.save(userNotif);

        return ResponseEntity.ok(Map.of("message", "Approved"));
    }

    // ── REJECT ─────────────────────────────────────────────────────────
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectApp(@PathVariable Long id) {
        App app = appRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("App not found"));
        app.setStatus("REJECTED");
        appRepository.save(app);

        // ✅ USER కి మాత్రమే REJECTED notification — admin కి వద్దు
        Notification userNotif = new Notification();
        userNotif.setTitle("❌ App Rejected");
        userNotif.setMessage(
            "Your app \"" + app.getTitle() + "\" was rejected by admin."
        );
        userNotif.setType("REJECTED");
        userNotif.setRole("USER");
        userNotif.setTargetEmail(app.getOwnerEmail()); // owner కి మాత్రమే
        userNotif.setRead(false);
        notificationRepository.save(userNotif);

        return ResponseEntity.ok(Map.of("message", "Rejected"));
    }

    // ── STATS ──────────────────────────────────────────────────────────
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        try {
            Map<String, Long> stats = new HashMap<>();
            stats.put("pending",  appRepository.countByStatus("PENDING"));
            stats.put("approved", appRepository.countByStatus("APPROVED"));
            stats.put("rejected", appRepository.countByStatus("REJECTED"));
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}