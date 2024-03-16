package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/billetter")
public class BillettController {
    private final List<Billett> billetter = new ArrayList<>();

    @PostMapping
    public Billett leggTilBillett(@RequestBody Billett billett) {
        billetter.add(billett);
        return billett;
    }

    @GetMapping
    public List<Billett> hentAlleBilletter() {
        return billetter;
    }

    @DeleteMapping
    public void slettAlleBilletter() {
        billetter.clear();
    }
}

