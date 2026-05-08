// // // package com.example.appforsale.service;

// // // import org.springframework.beans.factory.annotation.Autowired;
// // // import org.springframework.stereotype.Service;

// // // import com.example.appforsale.dto.AdminDto;
// // // import com.example.appforsale.entity.Admin;
// // // import com.example.appforsale.repository.AdminRepository;

// // // @Service
// // // public class AdminService {

// // //     @Autowired
// // //     private AdminRepository repo;

// // //     public String createAdmin(AdminDto dto) {

// // //         if(repo.existsByEmail(dto.getEmail())){
// // //             throw new RuntimeException("Admin already exists");
// // //         }

// // //         Admin admin = new Admin();
// // //         admin.setEmail(dto.getEmail());
// // //         admin.setPassword(dto.getPassword());
// // //         admin.setCompanyName(dto.getCompanyName());

// // //         repo.save(admin);

// // //         return "Admin created successfully";
// // //     }
// // // }

// // package com.example.appforsale.service;

// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.stereotype.Service;

// // import com.example.appforsale.dto.AdminDto;
// // import com.example.appforsale.entity.Admin;
// // import com.example.appforsale.repository.AdminRepository;

// // @Service
// // public class AdminService {

// //     @Autowired
// //     private AdminRepository repo;


// //     // CREATE ADMIN
// //     public String createAdmin(AdminDto dto) {

// //         // CHECK ANY ADMIN EXISTS
// //         if(repo.count() > 0){
// //             throw new RuntimeException("Admin already exists");
// //         }

// //         Admin admin = new Admin();

// //         admin.setEmail(dto.getEmail());
// //         admin.setPassword(dto.getPassword());
// //         admin.setCompanyName(dto.getCompanyName());

// //         // OPTIONAL
// //         admin.setRole("ADMIN");

// //         repo.save(admin);

// //         return "Admin created successfully";
// //     }


// //     // CHECK ADMIN EXISTS
// //     public boolean adminExists() {

// //         return repo.count() > 0;
// //     }
// // }

// package com.example.appforsale.service;

// import com.example.appforsale.dto.AdminDto;
// import com.example.appforsale.entity.Admin;
// import com.example.appforsale.repository.AdminRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// @Service
// public class AdminService {

//     @Autowired
//     private AdminRepository adminRepository;

//     public boolean adminExists() {
//         return adminRepository.count() > 0;
//     }

//     public Admin createAdmin(AdminDto dto) {
//         Admin admin = new Admin();
//         admin.setEmail(dto.getEmail().toLowerCase().trim());
//         admin.setPassword(dto.getPassword().trim());
//         admin.setCompanyName(dto.getCompanyName().trim());
//         admin.setRole("ADMIN");
//         return adminRepository.save(admin);
//     }
// }

// package com.example.appforsale.service;

// import com.example.appforsale.dto.AdminDto;
// import com.example.appforsale.entity.Admin;
// import com.example.appforsale.repository.AdminRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// @Service
// public class AdminService {

//     @Autowired
//     private AdminRepository adminRepository;

//     public boolean adminExists() {
//         return adminRepository.count() > 0;
//     }

//     public Admin createAdmin(AdminDto dto) {
//         Admin admin = new Admin();
//         admin.setEmail(dto.getEmail().trim().toLowerCase());
//         admin.setPassword(dto.getPassword().trim());
//         admin.setCompanyName(dto.getCompanyName().trim());
//         admin.setRole("ADMIN");
//         return adminRepository.save(admin);
//     }
// }

// package com.example.appforsale.service;

// import com.example.appforsale.dto.AdminDto;
// import com.example.appforsale.entity.Admin;
// import com.example.appforsale.repository.AdminRepository;
// import org.springframework.beans.factory.annotation.Autowired;

// import org.springframework.stereotype.Service;

// // @Service
// // public class AdminService {

// //     @Autowired
// //     private AdminRepository adminRepository;

// //     public boolean adminExists() {
// //         long count = adminRepository.count();
// //         System.out.println("=== adminExists check: count = " + count + " ===");
// //         return count > 0;
// //     }

// //     public Admin createAdmin(AdminDto dto) {
// //         System.out.println("=== createAdmin called ===");
// //         System.out.println("Email: " + dto.getEmail());

// //         Admin admin = new Admin();
// //         admin.setEmail(dto.getEmail().trim().toLowerCase());
// //         admin.setPassword(dto.getPassword().trim());
// //         admin.setCompanyName(dto.getCompanyName().trim());
// //         admin.setRole("ADMIN");

// //         Admin saved = adminRepository.save(admin);
// //         System.out.println("=== Admin saved with ID: " + saved.getId() + " ===");
// //         return saved;
// //     }
// // }

// @Service
// public class AdminService {

//     @Autowired
//     private AdminRepository adminRepository;

//     public boolean adminExistsByEmail(String email) {
//         return adminRepository.existsByEmail(email.trim().toLowerCase());
//     }

//     public Admin createAdmin(AdminDto dto) {
//         Admin admin = new Admin();
//         admin.setEmail(dto.getEmail().trim().toLowerCase());
//         admin.setPassword(dto.getPassword().trim());
//         admin.setCompanyName(dto.getCompanyName().trim());
//         admin.setRole("ADMIN");
//         return adminRepository.save(admin);
//     }

//     public Admin findByEmail(String email) {
//     return adminRepository.findByEmail(email.trim().toLowerCase())
//         .orElseThrow(() -> new RuntimeException("Admin not found"));
// }
// public long getAdminCount() {
//     return adminRepository.count();
// }
// }


package com.example.appforsale.service;

import com.example.appforsale.dto.AdminDto;
import com.example.appforsale.entity.Admin;
import com.example.appforsale.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public long getAdminCount() {
        return adminRepository.count();
    }

    public boolean adminExistsByEmail(String email) {
        return adminRepository.findByEmail(email).isPresent();  // ← Optional fix
    }

    public Admin createAdmin(AdminDto dto) {
        Admin admin = new Admin();
        admin.setEmail(dto.getEmail());
        admin.setPassword(dto.getPassword());
        admin.setCompanyName(dto.getCompanyName());
        admin.setRole("ADMIN");
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(AdminDto dto) {
        String lookupEmail = (dto.getOldEmail() != null && !dto.getOldEmail().isBlank())
                ? dto.getOldEmail()
                : dto.getEmail();

        // ← Optional<Admin> గా handle చేయి
        Admin admin = adminRepository.findByEmail(lookupEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found with email: " + lookupEmail));

        if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
            admin.setEmail(dto.getEmail());
        }
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            admin.setPassword(dto.getPassword());
        }
        if (dto.getCompanyName() != null && !dto.getCompanyName().isBlank()) {
            admin.setCompanyName(dto.getCompanyName());
        }

        return adminRepository.save(admin);
    }

    public Admin findByEmail(String email) {
        // ← Optional గా handle చేయి, null return చేయి if not found
        return adminRepository.findByEmail(email).orElse(null);
    }
}