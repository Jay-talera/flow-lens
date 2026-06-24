package com.jayjain.cibottleneckanalyzer.repository;

import com.jayjain.cibottleneckanalyzer.entity.RepositoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepositoryRepo
        extends JpaRepository<RepositoryEntity, Long> {

    Optional<RepositoryEntity> findByOwnerAndName(
            String owner,
            String name
    );

    Optional<RepositoryEntity> findByName(
            String name
    );
}