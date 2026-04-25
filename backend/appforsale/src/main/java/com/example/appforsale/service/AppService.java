package com.example.appforsale.service;

import com.example.appforsale.dto.AppDto;
import com.example.appforsale.dto.AppRequest;
import com.example.appforsale.entity.App;
import com.example.appforsale.repository.AppRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppService {

    private final AppRepository appRepository;

    public AppDto uploadApp(AppRequest req) {
        App app = App.builder()
            .title(req.getTitle().trim())
            .description(req.getDescription().trim())
            .category(req.getCategory().trim())
            .price(req.getPrice())
            .ownerName(req.getOwnerName().trim())
            .ownerEmail(req.getOwnerEmail().trim().toLowerCase())
            .ownerPhone(req.getOwnerPhone().trim())
            .company(req.getCompany() != null ? req.getCompany().trim() : "")
            .features(req.getFeatures() != null ? req.getFeatures().trim() : "")
            .imageUrl(req.getImageUrl())
            .build();

        App saved = appRepository.save(app);
        return toDto(saved);
    }

    public List<AppDto> getAllApps() {
        return appRepository.findAllByOrderByCreatedAtDesc()
            .stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public List<AppDto> getAppsByCategory(String category) {
        return appRepository.findByCategory(category)
            .stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    private AppDto toDto(App app) {
        return AppDto.builder()
            .id(app.getId())
            .title(app.getTitle())
            .description(app.getDescription())
            .category(app.getCategory())
            .price(app.getPrice())
            .ownerName(app.getOwnerName())
            .ownerEmail(app.getOwnerEmail())
            .ownerPhone(app.getOwnerPhone())
            .company(app.getCompany())
            .features(app.getFeatures())
            .imageUrl(app.getImageUrl())
            .createdAt(app.getCreatedAt() != null ? app.getCreatedAt().toString() : "")
            .build();
    }
}