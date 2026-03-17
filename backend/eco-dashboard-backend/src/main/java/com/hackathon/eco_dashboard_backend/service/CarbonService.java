package com.hackathon.eco_dashboard_backend.service;

import org.springframework.stereotype.Service;

import com.hackathon.eco_dashboard_backend.model.Material;
import java.util.List;

@Service
public class CarbonService {

    public double calculateConstruction(List<Material> materials) {

        double total = 0;

        for(Material m : materials){
            total += m.getQuantity() * m.getEmissionFactor();
        }

        return total;
    }

    public double calculateEnergy(double energyConsumption){

        double factor = 0.05; // kgCO2 / kWh

        return energyConsumption * factor;
    }

} 