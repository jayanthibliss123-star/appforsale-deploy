package com.example.appforsale.repository;

import com.example.appforsale.entity.App;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppRepository extends JpaRepository<App, Long> {
    List<App> findByCategory(String category);
    List<App> findAllByOrderByCreatedAtDesc();
}