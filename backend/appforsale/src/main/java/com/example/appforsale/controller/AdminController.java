// // package com.example.appforsale.controller;

// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.http.ResponseEntity;
// // import org.springframework.web.bind.annotation.CrossOrigin;
// // import org.springframework.web.bind.annotation.PostMapping;
// // import org.springframework.web.bind.annotation.RequestBody;
// // import org.springframework.web.bind.annotation.RequestMapping;
// // import org.springframework.web.bind.annotation.RestController;

// // import com.example.appforsale.dto.AdminDto;
// // import com.example.appforsale.service.AdminService;

// // @RestController
// // @RequestMapping("/api/admin")
// // @CrossOrigin("*")
// // public class AdminController {

// //     @Autowired
// //     private AdminService adminService;

// //    @PostMapping("/setup")
// // public ResponseEntity<?> setupAdmin(@RequestBody AdminDto dto) {
// //     System.out.println("ADMIN DTO: " + dto.getEmail());
// //     return ResponseEntity.ok(adminService.createAdmin(dto));
// // }
// // }

// package com.example.appforsale.controller;

// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.example.appforsale.dto.AdminDto;
// import com.example.appforsale.service.AdminService;

// @RestController
// @RequestMapping("/api/admin")
// @CrossOrigin("*")
// public class AdminController {

//     @Autowired
//     private AdminService adminService;

    
//     // CREATE ADMIN (ONLY FIRST TIME)
//     // @PostMapping("/setup")
//     // public ResponseEntity<?> setupAdmin(@RequestBody AdminDto dto) {

//     //     System.out.println("ADMIN DTO: " + dto.getEmail());

//     //     return ResponseEntity.ok(
//     //             adminService.createAdmin(dto)
//     //     );
//     // }
// @PostMapping("/setup")
// public ResponseEntity<?> setupAdmin(@RequestBody AdminDto dto) {
//     if (adminService.adminExists()) {
//         return ResponseEntity.status(400)
//             .body(Map.of("message", "Admin already exists"));
//     }
//     return ResponseEntity.ok(adminService.createAdmin(dto));
// }

//     // CHECK ADMIN EXISTS
//     @GetMapping("/exists")
//     public ResponseEntity<Boolean> adminExists() {

//         boolean exists = adminService.adminExists();

//         return ResponseEntity.ok(exists);
//     }
// }
// package com.example.appforsale.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import com.example.appforsale.dto.AdminDto;
// import com.example.appforsale.service.AdminService;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/admin")
// @CrossOrigin("*")
// public class AdminController {

//     @Autowired
//     private AdminService adminService;

//     @PostMapping("/setup")
//     public ResponseEntity<?> setupAdmin(@RequestBody AdminDto dto) {
//         if (adminService.adminExists()) {
//             return ResponseEntity.status(400)
//                 .body(Map.of("message", "Admin already exists"));
//         }
//         return ResponseEntity.ok(adminService.createAdmin(dto));
//     }

//     @GetMapping("/exists")
//     public ResponseEntity<Boolean> adminExists() {
//         return ResponseEntity.ok(adminService.adminExists());
//     }
// }

// package com.example.appforsale.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import com.example.appforsale.dto.AdminDto;
// import com.example.appforsale.service.AdminService;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/admin")
// @CrossOrigin("*")
// public class AdminController {

//     @Autowired
//     private AdminService adminService;

//     @PostMapping("/setup")
//     public ResponseEntity<?> setupAdmin(@RequestBody AdminDto dto) {
//         try {
//             if (adminService.adminExists()) {
//                 // 200 OK తో return చేయి — frontend లో error వేయట్లేదు
//                 return ResponseEntity.ok(
//                     Map.of(
//                         "message", "Admin already exists",
//                         "alreadyExists", true
//                     )
//                 );
//             }
//             Object result = adminService.createAdmin(dto);
//             return ResponseEntity.ok(result);
//         } catch (Exception e) {
//             return ResponseEntity.status(500)
//                 .body(Map.of("message", "Server error: " + e.getMessage()));
//         }
//     }

//     @GetMapping("/exists")
//     public ResponseEntity<?> adminExists() {
//         return ResponseEntity.ok(Map.of("exists", adminService.adminExists()));
//     }
// }


// package com.example.appforsale.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import com.example.appforsale.dto.AdminDto;
// import com.example.appforsale.service.AdminService;
// import java.util.HashMap;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/admin")
// @CrossOrigin("*")
// public class AdminController {

//     @Autowired
//     private AdminService adminService;

//     @PostMapping("/setup")
//     public ResponseEntity<Map<String, Object>> setupAdmin(@RequestBody AdminDto dto) {
//         Map<String, Object> response = new HashMap<>();
        
//         // Admin already exists అయినా 200 OK return చేయి
//         if (adminService.adminExists()) {
//             response.put("message", "Admin already exists");
//             response.put("alreadyExists", true);
//             response.put("success", true);
//             return ResponseEntity.ok(response); // 200 OK — never 400
//         }

//         adminService.createAdmin(dto);
//         response.put("message", "Admin created successfully");
//         response.put("alreadyExists", false);
//         response.put("success", true);
//         return ResponseEntity.ok(response);
//     }

//     @GetMapping("/exists")
//     public ResponseEntity<Map<String, Object>> adminExists() {
//         Map<String, Object> response = new HashMap<>();
//         response.put("exists", adminService.adminExists());
//         return ResponseEntity.ok(response);
//     }
// }

// package com.example.appforsale.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import com.example.appforsale.entity.Admin;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import com.example.appforsale.dto.AdminDto;
// import com.example.appforsale.service.AdminService;
// import java.util.HashMap;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/admin")
// @CrossOrigin("*")
// public class AdminController {

//     @Autowired
//     private AdminService adminService;
//         @GetMapping("/count")
//     public ResponseEntity<Long> getAdminCount() {
//         return ResponseEntity.ok(adminService.getAdminCount());
//     }



//     // @PostMapping("/setup")
//     // public ResponseEntity<Map<String, Object>> setupAdmin(@RequestBody AdminDto dto) {
//     //     Map<String, Object> response = new HashMap<>();

//     //     System.out.println("=== /api/admin/setup POST called ===");
//     //     System.out.println("Received email: " + dto.getEmail());

//     //     boolean exists = adminService.adminExists();
//     //     System.out.println("Admin exists: " + exists);

//     //     if (exists) {
//     //         System.out.println("Returning alreadyExists = true");
//     //         response.put("message", "Admin already exists");
//     //         response.put("alreadyExists", true);
//     //         response.put("success", true);
//     //         return ResponseEntity.ok(response);
//     //     }

//     //     System.out.println("Creating new admin...");
//     //     Admin saved = adminService.createAdmin(dto);
//     //     System.out.println("Admin created with ID: " + saved.getId());

//     //     response.put("message", "Admin created successfully");
//     //     response.put("alreadyExists", false);
//     //     response.put("success", true);
//     //     return ResponseEntity.ok(response);
//     // }
// // @PostMapping("/setup")
// // public ResponseEntity<Map<String, Object>> setupAdmin(@RequestBody AdminDto dto) {
// //     Map<String, Object> response = new HashMap<>();

// //     boolean exists = adminService.adminExistsByEmail(dto.getEmail());

// //     if (exists) {
// //         response.put("message", "Admin already exists");
// //         response.put("alreadyExists", true);
// //         response.put("success", true);
// //         return ResponseEntity.ok(response);
// //     }

// //     Admin saved = adminService.createAdmin(dto);

// //     response.put("message", "Admin created successfully");
// //     response.put("alreadyExists", false);
// //     response.put("success", true);
// //     return ResponseEntity.ok(response);
// // }
//     // @GetMapping("/exists")
//     // public ResponseEntity<Map<String, Object>> adminExists() {
//     //     System.out.println("=== /api/admin/exists GET called ===");
//     //     Map<String, Object> response = new HashMap<>();
//     //     response.put("exists", adminService.adminExists());
//     //     return ResponseEntity.ok(response);
//     // }

//     @PostMapping("/setup")
// public ResponseEntity<Map<String, Object>> setupAdmin(@RequestBody AdminDto dto) {
//     Map<String, Object> response = new HashMap<>();

//     long count = adminService.getAdminCount();

//     // 🔴 LIMIT CHECK
//     if (count >= 3) {
//         response.put("message", "Maximum 3 admins allowed");
//         response.put("limitReached", true);
//         response.put("success", false);
//         return ResponseEntity.ok(response);
//     }

//     boolean exists = adminService.adminExistsByEmail(dto.getEmail());

//     if (exists) {
//         response.put("message", "Admin already exists");
//         response.put("alreadyExists", true);
//         response.put("success", true);
//         return ResponseEntity.ok(response);
//     }

//     Admin saved = adminService.createAdmin(dto);

//     response.put("message", "Admin created successfully");
//     response.put("alreadyExists", false);
//     response.put("limitReached", false);
//     response.put("success", true);
//     return ResponseEntity.ok(response);
// }
// }

// package com.example.appforsale.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import com.example.appforsale.entity.Admin;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.example.appforsale.dto.AdminDto;
// import com.example.appforsale.service.AdminService;

// import java.util.HashMap;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/admin")
// @CrossOrigin("*")
// public class AdminController {

//     @Autowired
//     private AdminService adminService;

//     @GetMapping("/count")
//     public ResponseEntity<Long> getAdminCount() {
//         return ResponseEntity.ok(adminService.getAdminCount());
//     }

//     @PostMapping("/setup")
//     public ResponseEntity<Map<String, Object>> setupAdmin(
//             @RequestBody AdminDto dto) {

//         Map<String, Object> response = new HashMap<>();

//         // Check email already exists
//         boolean exists = adminService.adminExistsByEmail(dto.getEmail());

//         if (exists) {
//             response.put("message", "Admin already exists");
//             response.put("alreadyExists", true);
//             response.put("success", true);

//             return ResponseEntity.ok(response);
//         }

//         // Create admin
//         Admin saved = adminService.createAdmin(dto);

//         response.put("message", "Admin created successfully");
//         response.put("alreadyExists", false);
//         response.put("success", true);
//         response.put("adminId", saved.getId());

//         return ResponseEntity.ok(response);
//     }
// }


package com.example.appforsale.controller;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.appforsale.entity.Admin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.appforsale.dto.AdminDto;
import com.example.appforsale.service.AdminService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/count")
    public ResponseEntity<Long> getAdminCount() {
        return ResponseEntity.ok(adminService.getAdminCount());
    }

    @PostMapping("/setup")
    public ResponseEntity<Map<String, Object>> setupAdmin(@RequestBody AdminDto dto) {
        Map<String, Object> response = new HashMap<>();
        boolean exists = adminService.adminExistsByEmail(dto.getEmail());
        if (exists) {
            response.put("message", "Admin already exists");
            response.put("alreadyExists", true);
            response.put("success", true);
            return ResponseEntity.ok(response);
        }
        Admin saved = adminService.createAdmin(dto);
        response.put("message", "Admin created successfully");
        response.put("alreadyExists", false);
        response.put("success", true);
        response.put("adminId", saved.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateAdmin(@RequestBody AdminDto dto) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Debug: ఏమి వస్తోందో చూడటానికి (optional, production లో తీసేయవచ్చు)
            System.out.println("Update request → oldEmail=" + dto.getOldEmail()
                    + " newEmail=" + dto.getEmail()
                    + " company=" + dto.getCompanyName());

            Admin updated = adminService.updateAdmin(dto);
            response.put("message", "Admin updated successfully");
            response.put("success", true);
            response.put("adminId", updated.getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.err.println("Update failed: " + e.getMessage());
            response.put("message", e.getMessage());
            response.put("success", false);
            return ResponseEntity.status(404).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody AdminDto dto) {
        Map<String, Object> response = new HashMap<>();
        Admin admin = adminService.findByEmail(dto.getEmail());
        if (admin == null || !admin.getPassword().equals(dto.getPassword())) {
            response.put("message", "Invalid email or password");
            response.put("success", false);
            return ResponseEntity.status(401).body(response);
        }
        response.put("message", "Login successful");
        response.put("success", true);
        response.put("email", admin.getEmail());
        response.put("companyName", admin.getCompanyName());
        response.put("role", admin.getRole());
        return ResponseEntity.ok(response);
    }
}