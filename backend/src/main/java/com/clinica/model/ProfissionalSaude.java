package com.clinica.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "profissionais_saude")
public class ProfissionalSaude {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(length = 100, nullable = false)
    private String nome;

    @Column(length = 20)
    private String telefone;

    @Column(length = 200)
    private String endereco;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "profissional_categorias", joinColumns = @JoinColumn(name = "profissional_id"))
    @Column(name = "categoria")
    private List<String> categorias = new ArrayList<>();

    public ProfissionalSaude() {
    }

    public ProfissionalSaude(Long id, String nome, String telefone, String endereco, List<String> categorias) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.categorias = categorias;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public List<String> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<String> categorias) {
        this.categorias = categorias;
    }
}