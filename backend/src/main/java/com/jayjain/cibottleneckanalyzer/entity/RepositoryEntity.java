package com.jayjain.cibottleneckanalyzer.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class RepositoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String owner;

    private String name;

    private String externalId;

    private String repositoryUrl;

    private String ciProvider;
}