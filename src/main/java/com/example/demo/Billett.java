package com.example.demo;

import jakarta.persistence.*;

@Entity // Markerer klassen som en JPA-entitet
@Table(name = "billetter") // Definerer tabellnavnet i databasen
public class Billett {
    @Id // Markerer feltet som primærnøkkelen til entiteten
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Konfigurerer automatisk generering av ID
    private Long id;

    private String film;
    private int antall;
    private String fornavn;
    private String etternavn;
    private String telefon;
    private String epost;

    // Konstruktører, inkludert en tom standardkonstruktør som JPA krever
    public Billett() {
    }

    public Billett(String film, int antall, String fornavn, String etternavn, String telefon, String epost) {
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefon = telefon;
        this.epost = epost;
    }

    // Getters og setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public int getAntall() {
        return antall;
    }

    public void setAntall(int antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }
}
