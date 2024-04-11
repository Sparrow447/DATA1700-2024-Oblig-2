package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billetter")
public class BillettController {

    private final BillettRepository billettRepository;

    public BillettController(BillettRepository billettRepository) {
        this.billettRepository = billettRepository;
    }

    @PostMapping
    public Billett leggTilBillett(@RequestBody Billett billett) {
        return billettRepository.save(billett);
    }

    @GetMapping
    public List<Billett> hentAlleBilletter() {
        return billettRepository.findAll();
    }

    @DeleteMapping
    public void slettAlleBilletter() {
        billettRepository.deleteAll();
    }
}
