package com.hackathon.eco_dashboard_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.hackathon.eco_dashboard_backend.model.Site;
import com.hackathon.eco_dashboard_backend.repository.SiteRepository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

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

        site.setCreatedAt(LocalDateTime.now());
        return siteRepository.save(site);
    }

    public List<Site> getAllSites(){
        return siteRepository.findAll();
    }
     public Optional<Site> getSiteById(Long id){
        return siteRepository.findById(id);
    }
     public Site updateSite(Long id, Site updatedSite) {
        return siteRepository.findById(id)
                .map(existingSite -> {
                    existingSite.setName(updatedSite.getName());
                    existingSite.setSurface(updatedSite.getSurface());
                    existingSite.setParkingPlaces(updatedSite.getParkingPlaces());
                    existingSite.setEnergyConsumption(updatedSite.getEnergyConsumption());
                    existingSite.setEmployees(updatedSite.getEmployees());
                    existingSite.setMaterials(updatedSite.getMaterials());
                    // Recalcul du carbone total
                    double total = carbonService.calculateConstruction(updatedSite.getMaterials())
                                 + carbonService.calculateEnergy(updatedSite.getEnergyConsumption());
                    existingSite.setCarbonTotal(total);
                    return siteRepository.save(existingSite);
                })
                .orElseThrow(() -> new RuntimeException("Site non trouvé avec l'id " + id));
    }

      public void deleteSite(Long id) {
        if (!siteRepository.existsById(id)) {
            throw new RuntimeException("Site non trouvé avec l'id " + id);
        }
        siteRepository.deleteById(id);
    }
}
