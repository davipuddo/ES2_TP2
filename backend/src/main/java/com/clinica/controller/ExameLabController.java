package com.clinica.controller;

import com.clinica.model.ExameLab;
import com.clinica.repository.ExameLabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/exames")
@CrossOrigin(origins = "*")
public class ExameLabController {

    @Autowired
    private ExameLabRepository repository;

    @GetMapping
    public List<ExameLab> listarTodos() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExameLab> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ExameLab criar(@Valid @RequestBody ExameLab exame) {
        return repository.save(exame);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExameLab> atualizar(@PathVariable Long id, @Valid @RequestBody ExameLab detalhes) {
        return repository.findById(id)
                .map(exame -> {
                    exame.setDescricao(detalhes.getDescricao());
                    exame.setAtendimento(detalhes.getAtendimento());
                    ExameLab atualizado = repository.save(exame);
                    return ResponseEntity.ok().body(atualizado);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return repository.findById(id)
                .map(exame -> {
                    repository.delete(exame);
                    return ResponseEntity.ok().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }
}