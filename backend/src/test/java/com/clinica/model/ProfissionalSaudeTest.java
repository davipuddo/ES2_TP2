package com.clinica.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ProfissionalSaudeTest {

    @Test
    void testProfissionalSaudeGettersAndSetters() {
        ProfissionalSaude profissional = new ProfissionalSaude();
        profissional.setNome("Dr. Joao");
        profissional.setTelefone("123456789");
        
        assertEquals("Dr. Joao", profissional.getNome());
        assertEquals("123456789", profissional.getTelefone());
    }
}
