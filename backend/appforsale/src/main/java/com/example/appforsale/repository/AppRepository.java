// package com.example.appforsale.repository;

// import com.example.appforsale.entity.App;
// import com.example.appforsale.entity.AppStatus;

// import org.springframework.data.jpa.repository.JpaRepository;
// import java.util.List;

// public interface AppRepository extends JpaRepository<App, Long> {
//     List<App> findByCategory(String category);
//     List<App> findAllByOrderByCreatedAtDesc();
//     List<App> findByStatus(AppStatus status);
// }
// package com.example.appforsale.repository;

// import org.springframework.data.jpa.repository.JpaRepository;


// import com.example.appforsale.entity.App;

// import java.util.List;

// public interface AppRepository extends JpaRepository<App, String> {

//     List<App> findByStatus(String status);

//     // Stats count
//     long countByStatus(String status);

//     // All apps (for marketplace — only APPROVED)
//     List<App> findByStatusOrderByTitleAsc(String status);
// }

package com.example.appforsale.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.appforsale.entity.App;
import java.util.List;

public interface AppRepository extends JpaRepository<App, Long> { // ✅ FIXED

    List<App> findByStatus(String status);

    long countByStatus(String status);

    List<App> findByStatusOrderByTitleAsc(String status);
}