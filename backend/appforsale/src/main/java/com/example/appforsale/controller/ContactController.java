
 package com.example.appforsale.controller;

import com.example.appforsale.dto.ContactRequest;
import com.example.appforsale.entity.ContactInquiry;
import com.example.appforsale.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitInquiry(@Valid @RequestBody ContactRequest request) {
        ContactInquiry saved = contactService.submitInquiry(request);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Inquiry submitted successfully",
            "inquiryId", "ENQ-" + saved.getId(),
            "status", saved.getStatus(),
            "submittedAt", saved.getCreatedAt().toString()
        ));
    }
}
 
    

