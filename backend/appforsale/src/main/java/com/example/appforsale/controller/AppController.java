package com.example.appforsale.controller;

import com.example.appforsale.dto.AppDto;
import com.example.appforsale.dto.AppRequest;
// import com.example.appforsale.entity.App;
import com.example.appforsale.service.AppService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apps")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AppController {

    private final AppService appService;

    // ✅ Upload app
    @PostMapping("/upload")
    public ResponseEntity<AppDto> uploadApp(@Valid @RequestBody AppRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(appService.uploadApp(req));
    }

    // ✅ Get all apps
    @GetMapping
    public ResponseEntity<List<AppDto>> getAllApps() {
        return ResponseEntity.ok(appService.getAllApps());
    }

    // ✅ Get apps by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<AppDto>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(appService.getAppsByCategory(category));
    }
    
 
}