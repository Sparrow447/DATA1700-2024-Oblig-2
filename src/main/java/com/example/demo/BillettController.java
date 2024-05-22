package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{id}")
    public Optional<Billett> hentBillett(@PathVariable Long id) {
        return billettRepository.findById(id);
    }

    @PutMapping("/{id}")
    public Billett oppdaterBillett(@PathVariable Long id, @RequestBody Billett oppdatertBillett) {
        Optional<Billett> eksisterendeBillett = billettRepository.findById(id);

        if (eksisterendeBillett.isPresent()) {
            Billett billett = eksisterendeBillett.get();
            billett.setFilm(oppdatertBillett.getFilm());
            billett.setAntall(oppdatertBillett.getAntall());
            billett.setFornavn(oppdatertBillett.getFornavn());
            billett.setEtternavn(oppdatertBillett.getEtternavn());
            billett.setTelefon(oppdatertBillett.getTelefon());
            billett.setEpost(oppdatertBillett.getEpost());
            return billettRepository.save(billett);
        } else {
            throw new RuntimeException("Billett ikke funnet med ID: " + id);
        }
    }

    @DeleteMapping("/{id}")
    public void slettBillett(@PathVariable Long id) {
        billettRepository.deleteById(id);
    }

    @DeleteMapping
    public void slettAlleBilletter() {
        billettRepository.deleteAll();
    }
}
