package com.clinica.repository;

import com.clinica.model.ExameLab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExameLabRepository extends JpaRepository<ExameLab, Long> {
}