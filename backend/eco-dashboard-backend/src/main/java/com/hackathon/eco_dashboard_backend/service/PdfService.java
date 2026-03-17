package com.hackathon.eco_dashboard_backend.service;

import com.hackathon.eco_dashboard_backend.model.Site;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public byte[] generateSitePdfBytes(Site site) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, baos);

        document.open();

        document.add(new Paragraph("Informations du Site"));
        document.add(new Paragraph("ID : " + site.getId()));
        document.add(new Paragraph("Nom : " + site.getName()));
        document.add(new Paragraph("Surface : " + site.getSurface()));
        document.add(new Paragraph("Places de parking : " + site.getParkingPlaces()));
        document.add(new Paragraph("Consommation énergie : " + site.getEnergyConsumption()));
        document.add(new Paragraph("Nombre d'employés : " + site.getEmployees()));
        document.add(new Paragraph("Carbone total : " + site.getCarbonTotal()));
        document.add(new Paragraph("Date de création : " + site.getCreatedAt()));

        if (site.getMaterials() != null && !site.getMaterials().isEmpty()) {
            document.add(new Paragraph("Matériaux :"));
            site.getMaterials().forEach(m ->
                    document.add(new Paragraph(
                            "- " + m.getName() +
                            " | Quantité : " + m.getQuantity() +
                            " | Facteur émission : " + m.getEmissionFactor()
                    ))
            );
        }

        document.close();
        return baos.toByteArray();
    }
}