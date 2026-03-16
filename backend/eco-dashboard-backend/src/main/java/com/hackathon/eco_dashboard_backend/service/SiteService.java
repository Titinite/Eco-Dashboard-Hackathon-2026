package com.hackathon.eco_dashboard_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.hackathon.eco_dashboard_backend.model.Site;
import com.hackathon.eco_dashboard_backend.repository.SiteRepository;
import java.util.List;

@Service
public class SiteService {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private CarbonService carbonService;

    public Site createSite(Site site){

        double construction = carbonService.calculateConstruction(site.getMaterials());

        double exploitation = carbonService.calculateEnergy(site.getEnergyConsumption());

        double total = construction + exploitation;

        site.setCarbonTotal(total);

        return siteRepository.save(site);
    }

    public List<Site> getAllSites(){
        return siteRepository.findAll();
    }
}
