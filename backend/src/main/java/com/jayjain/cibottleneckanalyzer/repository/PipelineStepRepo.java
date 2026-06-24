package com.jayjain.cibottleneckanalyzer.repository;

import com.jayjain.cibottleneckanalyzer.entity.PipelineRun;
import com.jayjain.cibottleneckanalyzer.entity.PipelineStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PipelineStepRepo
        extends JpaRepository<PipelineStep, Long> {

    @Query("""
SELECT p.name,
       AVG(p.durationMs),
       COUNT(p)
FROM PipelineStep p
GROUP BY p.name
ORDER BY AVG(p.durationMs) DESC
""")
    List<Object[]> findTopBottlenecks();

    List<PipelineStep> findByPipelineRun(PipelineRun pipelineRun);

    @Query("""
SELECT s.name,
       AVG(s.durationMs),
       COUNT(s)
FROM PipelineStep s
JOIN s.pipelineRun r
WHERE r.repository.id=:repositoryId
GROUP BY s.name
ORDER BY AVG(s.durationMs) DESC
""")
    List<Object[]> topBottlenecks(Long repositoryId);

}