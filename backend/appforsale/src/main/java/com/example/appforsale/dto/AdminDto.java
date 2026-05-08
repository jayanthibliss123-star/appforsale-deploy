// package com.example.appforsale.dto;

// public class AdminDto {

//     private String email;
//     private String password;
//     private String companyName;

//     // Constructors
//     public AdminDto() {}

//     public AdminDto(String email, String password, String companyName) {
//         this.email = email;
//         this.password = password;
//         this.companyName = companyName;
//     }

//     // Getters & Setters
//     public String getEmail() {
//         return email;
//     }

//     public void setEmail(String email) {
//         this.email = email;
//     }

//     public String getPassword() {
//         return password;
//     }

//     public void setPassword(String password) {
//         this.password = password;
//     }

//     public String getCompanyName() {
//         return companyName;
//     }

//     public void setCompanyName(String companyName) {
//         this.companyName = companyName;
//     }
// }

// package com.example.appforsale.dto;

// public class AdminDto {
//     private String email;
//     private String password;
//     private String companyName;

//     public String getEmail() { return email; }
//     public void setEmail(String email) { this.email = email; }

//     public String getPassword() { return password; }
//     public void setPassword(String password) { this.password = password; }

//     public String getCompanyName() { return companyName; }
//     public void setCompanyName(String companyName) { this.companyName = companyName; }
// }


package com.example.appforsale.dto;

public class AdminDto {
    private String oldEmail;   // ← ADD THIS — find చేయటానికి
    private String email;
    private String password;
    private String companyName;

    // Getters & Setters
    public String getOldEmail()               { return oldEmail; }
    public void   setOldEmail(String v)       { this.oldEmail = v; }

    public String getEmail()                  { return email; }
    public void   setEmail(String v)          { this.email = v; }

    public String getPassword()               { return password; }
    public void   setPassword(String v)       { this.password = v; }

    public String getCompanyName()            { return companyName; }
    public void   setCompanyName(String v)    { this.companyName = v; }
}