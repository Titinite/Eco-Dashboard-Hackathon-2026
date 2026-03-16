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

} 

