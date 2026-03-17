package com.hackathon.eco_dashboard_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.eco_dashboard_backend.model.Site;
import com.hackathon.eco_dashboard_backend.service.SiteService;
import java.util.List;
import org.springframework.http.ResponseEntity;       
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.PutMapping;    
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@RequestMapping("/sites")
public class SiteController {

    @Autowired
    private SiteService siteService;

    @PostMapping
    public Site createSite(@RequestBody Site site){

        return siteService.createSite(site);
    }

    @GetMapping
    public List<Site> getAllSites(){
        return siteService.getAllSites();
    }
     @GetMapping("/{id}")
    public ResponseEntity<Site> getSiteById(@PathVariable Long id) {
        return siteService.getSiteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
  @PutMapping("/{id}")
    public ResponseEntity<Site> updateSite(@PathVariable Long id, @RequestBody Site site) {
        try {
            Site updatedSite = siteService.updateSite(id, site);
            return ResponseEntity.ok(updatedSite);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

     @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSite(@PathVariable Long id) {
        try {
            siteService.deleteSite(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 

