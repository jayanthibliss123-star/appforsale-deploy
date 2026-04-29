// package com.example.appforsale.controller;

// import com.example.appforsale.dto.AppDto;
// import com.example.appforsale.dto.AppRequest;
// import com.example.appforsale.entity.App;
// import com.example.appforsale.entity.AppStatus;
// import com.example.appforsale.repository.AppRepository;
// import com.example.appforsale.service.AppService;

// import jakarta.validation.Valid;
// import lombok.RequiredArgsConstructor;

// import org.springframework.http.*;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/apps")
// @RequiredArgsConstructor
// @CrossOrigin(origins = "*")
// public class AppController {

//     private final AppService appService;
//     private final AppRepository appRepository;

//     // ✅ Upload app
//     @PostMapping("/upload")
//     public ResponseEntity<AppDto> uploadApp(@Valid @RequestBody AppRequest req) {
//         return ResponseEntity.status(HttpStatus.CREATED).body(appService.uploadApp(req));
//     }

//     // ✅ Get ALL apps (optional)
//     @GetMapping("/all")
//     public ResponseEntity<List<AppDto>> getAllApps() {
//         return ResponseEntity.ok(appService.getAllApps());
//     }
//     @GetMapping
// public ResponseEntity<List<AppDto>> getApprovedAppsForUsers() {
//     List<AppDto> apps = appRepository.findByStatus(AppStatus.APPROVED)
//             .stream()
//             .map(appService::toDto)
//             .toList();

//     return ResponseEntity.ok(apps);
// }

//     // ✅ Get apps by category
//     @GetMapping("/category/{category}")
//     public ResponseEntity<List<AppDto>> getByCategory(@PathVariable String category) {
//         return ResponseEntity.ok(appService.getAppsByCategory(category));
//     }

//     // ✅ Get PENDING apps
//     @GetMapping("/pending")
//     public ResponseEntity<List<App>> getPendingApps() {
//         return ResponseEntity.ok(appRepository.findByStatus(AppStatus.PENDING));
//     }

//     // ✅ Get APPROVED apps
//     @GetMapping("/approved")
//     public ResponseEntity<List<App>> getApprovedApps() {
//         return ResponseEntity.ok(appRepository.findByStatus(AppStatus.APPROVED));
//     }

//     // ✅ Approve app
//     @PutMapping("/{id}/approve")
//     public ResponseEntity<?> approveApp(@PathVariable Long id) {
//         App app = appRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("App not found"));

//         app.setStatus(AppStatus.APPROVED);
//         appRepository.save(app);

//         return ResponseEntity.ok(Map.of("message", "App approved"));
//     }

//     // ✅ Reject app
//     @PutMapping("/{id}/reject")
//     public ResponseEntity<?> rejectApp(@PathVariable Long id) {
//         App app = appRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("App not found"));

//         app.setStatus(AppStatus.REJECTED);
//         appRepository.save(app);

//         return ResponseEntity.ok(Map.of("message", "App rejected"));
//     }
// }

// package com.example.appforsale.controller;

// import com.example.appforsale.dto.AppDto;
// import com.example.appforsale.dto.AppRequest;
// import com.example.appforsale.entity.App;
// import com.example.appforsale.entity.AppStatus;
// import com.example.appforsale.repository.AppRepository;
// import com.example.appforsale.service.AppService;
// import com.example.appforsale.service.NotificationService;
// import jakarta.validation.Valid;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.*;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/apps")
// @RequiredArgsConstructor
// @CrossOrigin(origins = "*")
// public class AppController {

//     private final AppService appService;
//     private final AppRepository appRepository;
//     private final NotificationService notificationService;  // ✅ ADD THIS

//     // ✅ Upload app — notify ADMIN
//     @PostMapping("/upload")
//     public ResponseEntity<AppDto> uploadApp(@Valid @RequestBody AppRequest req) {
//         AppDto savedApp = appService.uploadApp(req);

//         // Notify admin about new submission
//         notificationService.createNotification(
//             "New App Submitted",
//             "\"" + req.getTitle() + "\" has been submitted for approval by " + req.getOwnerName(),
//             "SUBMISSION",
//             "ADMIN"
//         );

//         return ResponseEntity.status(HttpStatus.CREATED).body(savedApp);
//     }

//     @GetMapping("/all")
//     public ResponseEntity<List<AppDto>> getAllApps() {
//         return ResponseEntity.ok(appService.getAllApps());
//     }

//     @GetMapping
//     public ResponseEntity<List<AppDto>> getApprovedAppsForUsers() {
//         List<AppDto> apps = appRepository.findByStatus(AppStatus.APPROVED)
//                 .stream()
//                 .map(appService::toDto)
//                 .toList();
//         return ResponseEntity.ok(apps);
//     }

//     @GetMapping("/category/{category}")
//     public ResponseEntity<List<AppDto>> getByCategory(@PathVariable String category) {
//         return ResponseEntity.ok(appService.getAppsByCategory(category));
//     }

//     @GetMapping("/pending")
//     public ResponseEntity<List<App>> getPendingApps() {
//         return ResponseEntity.ok(appRepository.findByStatus(AppStatus.PENDING));
//     }

//     @GetMapping("/approved")
//     public ResponseEntity<List<App>> getApprovedApps() {
//         return ResponseEntity.ok(appRepository.findByStatus(AppStatus.APPROVED));
//     }

//     // ✅ Stats endpoint
//     @GetMapping("/stats")
//     public ResponseEntity<Map<String, Long>> getStats() {
//         long pending  = appRepository.findByStatus(AppStatus.PENDING).size();
//         long approved = appRepository.findByStatus(AppStatus.APPROVED).size();
//         long rejected = appRepository.findByStatus(AppStatus.REJECTED).size();
//         return ResponseEntity.ok(Map.of(
//             "pending",  pending,
//             "approved", approved,
//             "rejected", rejected
//         ));
//     }

//     // ✅ Approve — notify USER
//     @PutMapping("/{id}/approve")
//     public ResponseEntity<?> approveApp(@PathVariable Long id) {
//         App app = appRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("App not found"));

//         app.setStatus(AppStatus.APPROVED);
//         appRepository.save(app);

//         // Notify USER
//         notificationService.createNotification(
//             "App Approved ✅",
//             "\"" + app.getTitle() + "\" has been approved and is now live in the marketplace!",
//             "APPROVAL",
//             "USER"
//         );

//         // Notify ADMIN (own log)
//         notificationService.createNotification(
//             "You approved: " + app.getTitle(),
//             "App is now live in marketplace.",
//             "APPROVAL",
//             "ADMIN"
//         );

//         return ResponseEntity.ok(Map.of("message", "App approved"));
//     }

//     // ✅ Reject — notify USER
//     @PutMapping("/{id}/reject")
//     public ResponseEntity<?> rejectApp(@PathVariable Long id) {
//         App app = appRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("App not found"));

//         app.setStatus(AppStatus.REJECTED);
//         appRepository.save(app);

//         // Notify USER
//         notificationService.createNotification(
//             "App Not Approved ❌",
//             "\"" + app.getTitle() + "\" was not approved. Please review and resubmit.",
//             "REJECTION",
//             "USER"
//         );

//         // Notify ADMIN (own log)
//         notificationService.createNotification(
//             "You rejected: " + app.getTitle(),
//             "App has been rejected.",
//             "REJECTION",
//             "ADMIN"
//         );

//         return ResponseEntity.ok(Map.of("message", "App rejected"));
//     }
// }
// package com.example.appforsale.controller;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.example.appforsale.entity.App;
// import com.example.appforsale.entity.Notification;
// import com.example.appforsale.repository.AppRepository;
// import com.example.appforsale.repository.NotificationRepository;

// import java.util.*;

// @RestController
// @RequestMapping("/api/apps")
// @CrossOrigin(origins = "*")
// public class AppController {

//     @Autowired
//     private AppRepository appRepository;

//     @Autowired
//     private NotificationRepository notificationRepository;

//     // ── Upload App (status = PENDING by default) ──────────────────────
//     @PostMapping("/upload")
//     public ResponseEntity<?> uploadApp(@RequestBody App app) {
//         app.setStatus("PENDING");
//         App saved = appRepository.save(app);

//         // ✅ Notify ADMIN about new submission
//         Notification adminNotif = new Notification();
//         adminNotif.setTitle("New App Submitted: " + app.getTitle());
//         adminNotif.setMessage(
//             "\"" + app.getTitle() + "\" has been submitted by " + app.getOwnerName() +
//             " (" + app.getOwnerEmail() + ") in category \"" + app.getCategory() + "\"." +
//             " Price: ₹" + (app.getPrice() != null ? app.getPrice().longValue() : 0) + ". Review and approve/reject."
//         );
//         adminNotif.setType("SUBMISSION");
//         adminNotif.setRole("ADMIN");
//         adminNotif.setRead(false);
//         notificationRepository.save(adminNotif);

//         return ResponseEntity.ok(Map.of("message", "App submitted for review", "id", saved.getId()));
//     }

//     // ── Get APPROVED apps (public marketplace) ────────────────────────
//     @GetMapping
//     public ResponseEntity<List<App>> getApprovedApps() {
//         List<App> approved = appRepository.findByStatus("APPROVED");
//         return ResponseEntity.ok(approved);
//     }

//     // ── Get PENDING apps (admin review queue) ─────────────────────────
//     @GetMapping("/pending")
//     public ResponseEntity<List<App>> getPendingApps() {
//         List<App> pending = appRepository.findByStatus("PENDING");
//         return ResponseEntity.ok(pending);
//     }

//     // ── Stats for admin dashboard ─────────────────────────────────────
//     @GetMapping("/stats")
//     public ResponseEntity<Map<String, Long>> getStats() {
//         Map<String, Long> stats = new HashMap<>();
//         stats.put("pending",  appRepository.countByStatus("PENDING"));
//         stats.put("approved", appRepository.countByStatus("APPROVED"));
//         stats.put("rejected", appRepository.countByStatus("REJECTED"));
//         return ResponseEntity.ok(stats);
//     }

//     // ── Approve app ───────────────────────────────────────────────────
//     @PutMapping("/{id}/approve")
//     public ResponseEntity<?> approveApp(@PathVariable String id) {
//         App app = appRepository.findById(id)
//             .orElseThrow(() -> new RuntimeException("App not found"));

//         app.setStatus("APPROVED");
//         appRepository.save(app);

//         // ✅ Notify ADMIN log
//         Notification adminLog = new Notification();
//         adminLog.setTitle("App Approved: " + app.getTitle());
//         adminLog.setMessage("\"" + app.getTitle() + "\" has been approved and is now live in the marketplace.");
//         adminLog.setType("APPROVED");
//         adminLog.setRole("ADMIN");
//         adminLog.setRead(false);
//         notificationRepository.save(adminLog);

//         // ✅ Notify the USER who submitted this app
//         Notification userNotif = new Notification();
//         userNotif.setTitle("✅ Your App is Approved!");
//         userNotif.setMessage(
//             "Congratulations! Your app \"" + app.getTitle() + "\" has been approved by the admin." +
//             " It is now live in the Apps Marketplace. Thank you for your submission!"
//         );
//         userNotif.setType("APPROVED");
//         userNotif.setRole("USER");
//         userNotif.setTargetEmail(app.getOwnerEmail());
//         userNotif.setRead(false);
//         notificationRepository.save(userNotif);

//         return ResponseEntity.ok(Map.of("message", "App approved and published"));
//     }

//     // ── Reject app ────────────────────────────────────────────────────
//     @PutMapping("/{id}/reject")
//     public ResponseEntity<?> rejectApp(@PathVariable String id) {
//         App app = appRepository.findById(id)
//             .orElseThrow(() -> new RuntimeException("App not found"));

//         app.setStatus("REJECTED");
//         appRepository.save(app);

//         // ✅ Notify ADMIN log
//         Notification adminLog = new Notification();
//         adminLog.setTitle("App Rejected: " + app.getTitle());
//         adminLog.setMessage("\"" + app.getTitle() + "\" has been rejected.");
//         adminLog.setType("REJECTED");
//         adminLog.setRole("ADMIN");
//         adminLog.setRead(false);
//         notificationRepository.save(adminLog);

//         // ✅ Notify the USER who submitted
//         Notification userNotif = new Notification();
//         userNotif.setTitle("❌ App Rejected");
//         userNotif.setMessage(
//             "Your app \"" + app.getTitle() + "\" has been reviewed and rejected by the admin." +
//             " Please check the app details and resubmit after making improvements."
//         );
//         userNotif.setType("REJECTED");
//         userNotif.setRole("USER");
//         userNotif.setTargetEmail(app.getOwnerEmail());
//         userNotif.setRead(false);
//         notificationRepository.save(userNotif);

//         return ResponseEntity.ok(Map.of("message", "App rejected"));
//     }
// }

// package com.example.appforsale.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.example.appforsale.entity.App;
// import com.example.appforsale.entity.Notification;
// import com.example.appforsale.repository.AppRepository;
// import com.example.appforsale.repository.NotificationRepository;

// import java.util.*;

// @RestController
// @RequestMapping("/api/apps")
// @CrossOrigin(origins = "*")
// public class AppController {

//     @Autowired
//     private AppRepository appRepository;

//     @Autowired
//     private NotificationRepository notificationRepository;

//     // ── Upload App ──────────────────────
//     @PostMapping("/upload")
//     public ResponseEntity<?> uploadApp(@RequestBody App app) {
//         app.setStatus("PENDING");
//         App saved = appRepository.save(app);

//         Notification adminNotif = new Notification();
//         adminNotif.setTitle("New App Submitted: " + app.getTitle());
//         adminNotif.setMessage(
//             "\"" + app.getTitle() + "\" has been submitted by " + app.getOwnerName() +
//             " (" + app.getOwnerEmail() + ") in category \"" + app.getCategory() + "\"." +
//             " Price: ₹" + (app.getPrice() != null ? app.getPrice().longValue() : 0)
//         );
//         adminNotif.setType("SUBMISSION");
//         adminNotif.setRole("ADMIN");
//         adminNotif.setRead(false);
//         notificationRepository.save(adminNotif);

//         return ResponseEntity.ok(Map.of("message", "App submitted", "id", saved.getId()));
//     }

//     // ── Approved apps ───────────────────
//     @GetMapping
//     public ResponseEntity<List<App>> getApprovedApps() {
//         return ResponseEntity.ok(appRepository.findByStatus("APPROVED"));
//     }

//     // ── Pending apps ────────────────────
//     @GetMapping("/pending")
//     public ResponseEntity<List<App>> getPendingApps() {
//         return ResponseEntity.ok(appRepository.findByStatus("PENDING"));
//     }

//     // ── Stats ──────────────────────────
//     // @GetMapping("/stats")
//     // public ResponseEntity<Map<String, Long>> getStats() {
//     //     Map<String, Long> stats = new HashMap<>();
//     //     stats.put("pending",  appRepository.countByStatus("PENDING"));
//     //     stats.put("approved", appRepository.countByStatus("APPROVED"));
//     //     stats.put("rejected", appRepository.countByStatus("REJECTED"));
//     //     return ResponseEntity.ok(stats);
//     // }

//     // ── Approve app ────────────────────
//     @PutMapping("/{id}/approve")
//     public ResponseEntity<?> approveApp(@PathVariable Long id) {   // ✅ FIXED
//         App app = appRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("App not found"));

//         app.setStatus("APPROVED");
//         appRepository.save(app);

//         Notification adminLog = new Notification();
//         adminLog.setTitle("App Approved: " + app.getTitle());
//         adminLog.setMessage("\"" + app.getTitle() + "\" is now live.");
//         adminLog.setType("APPROVED");
//         adminLog.setRole("ADMIN");
//         adminLog.setRead(false);
//         notificationRepository.save(adminLog);

//         Notification userNotif = new Notification();
//         userNotif.setTitle("✅ Your App is Approved!");
//         userNotif.setMessage("Your app \"" + app.getTitle() + "\" is now live.");
//         userNotif.setType("APPROVED");
//         userNotif.setRole("USER");
//         userNotif.setTargetEmail(app.getOwnerEmail());
//         userNotif.setRead(false);
//         notificationRepository.save(userNotif);

//         return ResponseEntity.ok(Map.of("message", "Approved"));
//     }

//     // ── Reject app ─────────────────────
//     @PutMapping("/{id}/reject")
//     public ResponseEntity<?> rejectApp(@PathVariable Long id) {   // ✅ FIXED
//         App app = appRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("App not found"));

//         app.setStatus("REJECTED");
//         appRepository.save(app);

//         Notification adminLog = new Notification();
//         adminLog.setTitle("App Rejected: " + app.getTitle());
//         adminLog.setMessage("\"" + app.getTitle() + "\" rejected.");
//         adminLog.setType("REJECTED");
//         adminLog.setRole("ADMIN");
//         adminLog.setRead(false);
//         notificationRepository.save(adminLog);

//         Notification userNotif = new Notification();
//         userNotif.setTitle("❌ App Rejected");
//         userNotif.setMessage("Your app \"" + app.getTitle() + "\" was rejected.");
//         userNotif.setType("REJECTED");
//         userNotif.setRole("USER");
//         userNotif.setTargetEmail(app.getOwnerEmail());
//         userNotif.setRead(false);
//         notificationRepository.save(userNotif);

//         return ResponseEntity.ok(Map.of("message", "Rejected"));
//     }
//    @GetMapping("/stats")
// public ResponseEntity<?> getStats() {
//     try {
//         Map<String, Long> stats = new HashMap<>();

//         stats.put("pending", appRepository.countByStatus("PENDING"));
//         stats.put("approved", appRepository.countByStatus("APPROVED"));
//         stats.put("rejected", appRepository.countByStatus("REJECTED"));

//         return ResponseEntity.ok(stats);

//     } catch (Exception e) {
//         e.printStackTrace();
//         return ResponseEntity.status(500)
//                 .body("Error: " + e.getMessage());
//     }
// }
// }


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

    @PostMapping("/upload")
    public ResponseEntity<?> uploadApp(@RequestBody App app) {
        app.setStatus("PENDING");

        // ✅ If imageUrls list has items, set first one as imageUrl too (for backward compat)
        if (app.getImageUrls() != null && !app.getImageUrls().isEmpty()) {
            app.setImageUrl(app.getImageUrls().get(0));
        }

        App saved = appRepository.save(app);

        Notification adminNotif = new Notification();
        adminNotif.setTitle("New App Submitted: " + app.getTitle());
        adminNotif.setMessage(
            "\"" + app.getTitle() + "\" submitted by " + app.getOwnerName() +
            " (" + app.getOwnerEmail() + ") — Category: \"" + app.getCategory() + "\"" +
            " — Price: ₹" + (app.getPrice() != null ? app.getPrice().longValue() : 0)
        );
        adminNotif.setType("SUBMISSION");
        adminNotif.setRole("ADMIN");
        adminNotif.setRead(false);
        notificationRepository.save(adminNotif);

        return ResponseEntity.ok(Map.of("message", "App submitted", "id", saved.getId()));
    }

    @GetMapping
    public ResponseEntity<List<App>> getApprovedApps() {
        return ResponseEntity.ok(appRepository.findByStatus("APPROVED"));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<App>> getPendingApps() {
        return ResponseEntity.ok(appRepository.findByStatus("PENDING"));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveApp(@PathVariable Long id) {
        App app = appRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("App not found"));
        app.setStatus("APPROVED");
        appRepository.save(app);

        Notification adminLog = new Notification();
        adminLog.setTitle("App Approved: " + app.getTitle());
        adminLog.setMessage("\"" + app.getTitle() + "\" is now live in marketplace.");
        adminLog.setType("APPROVED");
        adminLog.setRole("ADMIN");
        adminLog.setRead(false);
        notificationRepository.save(adminLog);

        Notification userNotif = new Notification();
        userNotif.setTitle("✅ Your App is Approved!");
        userNotif.setMessage("Your app \"" + app.getTitle() + "\" is now live in marketplace.");
        userNotif.setType("APPROVED");
        userNotif.setRole("USER");
        userNotif.setTargetEmail(app.getOwnerEmail());
        userNotif.setRead(false);
        notificationRepository.save(userNotif);

        return ResponseEntity.ok(Map.of("message", "Approved"));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectApp(@PathVariable Long id) {
        App app = appRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("App not found"));
        app.setStatus("REJECTED");
        appRepository.save(app);

        Notification adminLog = new Notification();
        adminLog.setTitle("App Rejected: " + app.getTitle());
        adminLog.setMessage("\"" + app.getTitle() + "\" has been rejected.");
        adminLog.setType("REJECTED");
        adminLog.setRole("ADMIN");
        adminLog.setRead(false);
        notificationRepository.save(adminLog);

        Notification userNotif = new Notification();
        userNotif.setTitle("❌ App Rejected");
        userNotif.setMessage("Your app \"" + app.getTitle() + "\" was rejected.");
        userNotif.setType("REJECTED");
        userNotif.setRole("USER");
        userNotif.setTargetEmail(app.getOwnerEmail());
        userNotif.setRead(false);
        notificationRepository.save(userNotif);

        return ResponseEntity.ok(Map.of("message", "Rejected"));
    }

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