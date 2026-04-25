package com.example.appforsale.repository;

import com.example.appforsale.entity.ContactInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<ContactInquiry, Long> {
}
    