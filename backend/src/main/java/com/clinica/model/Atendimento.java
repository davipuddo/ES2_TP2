package com.clinica.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "atendimentos")
public class Atendimento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Data é obrigatória")
    private LocalDate data;

    private LocalTime horario;

    @Column(name = "problema_texto", columnDefinition = "TEXT")
    private String problemaTexto;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "atendimento_receitas", joinColumns = @JoinColumn(name = "atendimento_id"))
    @Column(name = "receita_saude")
    private List<String> receitaSaude = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "profissional_id", nullable = false)
    private ProfissionalSaude profissional;

    public Atendimento() {
    }

    public Atendimento(Long id, LocalDate data, LocalTime horario, String problemaTexto, List<String> receitaSaude, ProfissionalSaude profissional) {
        this.id = id;
        this.data = data;
        this.horario = horario;
        this.problemaTexto = problemaTexto;
        this.receitaSaude = receitaSaude;
        this.profissional = profissional;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHorario() {
        return horario;
    }

    public void setHorario(LocalTime horario) {
        this.horario = horario;
    }

    public String getProblemaTexto() {
        return problemaTexto;
    }

    public void setProblemaTexto(String problemaTexto) {
        this.problemaTexto = problemaTexto;
    }

    public List<String> getReceitaSaude() {
        return receitaSaude;
    }

    public void setReceitaSaude(List<String> receitaSaude) {
        this.receitaSaude = receitaSaude;
    }

    public ProfissionalSaude getProfissional() {
        return profissional;
    }

    public void setProfissional(ProfissionalSaude profissional) {
        this.profissional = profissional;
    }
}