package com.hackathon.eco_dashboard_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.hackathon.eco_dashboard_backend.model.Site;

@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {
}
