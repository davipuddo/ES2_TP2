package com.clinica.controller;

import com.clinica.model.ProfissionalSaude;
import com.clinica.repository.ProfissionalSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/profissionais")
@CrossOrigin(origins = "*")
public class ProfissionalSaudeController {

    @Autowired
    private ProfissionalSaudeRepository repository;

    @GetMapping
    public List<ProfissionalSaude> listarTodos(@RequestParam(required = false) String nome, @RequestParam(required = false) String categoria) {
        if (nome != null) {
            return repository.findByNomeContainingIgnoreCase(nome);
        } else if (categoria != null) {
            return repository.findByCategoriasContainingIgnoreCase(categoria);
        }
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfissionalSaude> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ProfissionalSaude criar(@Valid @RequestBody ProfissionalSaude profissional) {
        return repository.save(profissional);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfissionalSaude> atualizar(@PathVariable Long id, @Valid @RequestBody ProfissionalSaude detalhes) {
        return repository.findById(id)
                .map(profissional -> {
                    profissional.setNome(detalhes.getNome());
                    profissional.setTelefone(detalhes.getTelefone());
                    profissional.setEndereco(detalhes.getEndereco());
                    profissional.setCategorias(detalhes.getCategorias());
                    ProfissionalSaude atualizado = repository.save(profissional);
                    return ResponseEntity.ok().body(atualizado);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return repository.findById(id)
                .map(profissional -> {
                    repository.delete(profissional);
                    return ResponseEntity.ok().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }
}