package com.clinica.controller;

import com.clinica.model.Atendimento;
import com.clinica.repository.AtendimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/atendimentos")
@CrossOrigin(origins = "*")
public class AtendimentoController {

    @Autowired
    private AtendimentoRepository repository;

    @GetMapping
    public List<Atendimento> listarTodos() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Atendimento> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Atendimento criar(@Valid @RequestBody Atendimento atendimento) {
        return repository.save(atendimento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Atendimento> atualizar(@PathVariable Long id, @Valid @RequestBody Atendimento detalhes) {
        return repository.findById(id)
                .map(atendimento -> {
                    atendimento.setData(detalhes.getData());
                    atendimento.setHorario(detalhes.getHorario());
                    atendimento.setProblemaTexto(detalhes.getProblemaTexto());
                    atendimento.setReceitaSaude(detalhes.getReceitaSaude());
                    atendimento.setProfissional(detalhes.getProfissional());
                    Atendimento atualizado = repository.save(atendimento);
                    return ResponseEntity.ok().body(atualizado);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return repository.findById(id)
                .map(atendimento -> {
                    repository.delete(atendimento);
                    return ResponseEntity.ok().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }
}