package com.hackathon.eco_dashboard_backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import java.util.List;

 @Entity
public class Site {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double surface;

    private int parkingPlaces;

    private double energyConsumption;

    private int employees;

    private double carbonTotal;

    private LocalDateTime createdAt;

     @OneToMany(cascade = CascadeType.ALL)
    private List<Material> materials;


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public double getSurface() {
        return surface;
    }
    public void setSurface(double surface) {
        this.surface = surface;
    }
    public int getParkingPlaces() {
        return parkingPlaces;
    }
    public void setParkingPlaces(int parkingPlaces) {
        this.parkingPlaces = parkingPlaces;
    }
    public double getEnergyConsumption() {
        return energyConsumption;
    }
    public void setEnergyConsumption(double energyConsumption) {
        this.energyConsumption = energyConsumption;
    }
    public int getEmployees() {
        return employees;
    }
    public void setEmployees(int employees) {
        this.employees = employees;
    }
    public double getCarbonTotal() {
        return carbonTotal;
    }
    public void setCarbonTotal(double carbonTotal) {
        this.carbonTotal = carbonTotal;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public List<Material> getMaterials() {
        return materials;
    }
    public void setMaterials(List<Material> materials) {
        this.materials = materials;
    }
}   

