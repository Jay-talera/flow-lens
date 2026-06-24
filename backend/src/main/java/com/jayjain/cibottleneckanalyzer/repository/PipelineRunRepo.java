package com.jayjain.cibottleneckanalyzer.repository;

import com.jayjain.cibottleneckanalyzer.entity.PipelineRun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PipelineRunRepo extends JpaRepository<PipelineRun, Long> {

    List<PipelineRun> findByRepositoryId(Long repoId);

    Optional<PipelineRun> findByExternalRunId(
            Long externalRunId
    );

    @Query("""
SELECT DATE(p.startTime),
       COUNT(CASE WHEN p.conclusion='success' THEN 1 END),
       COUNT(CASE WHEN p.conclusion='failure' THEN 1 END)
FROM PipelineRun p
WHERE p.repository.id = :repositoryId
GROUP BY DATE(p.startTime)
ORDER BY DATE(p.startTime)
""")
    List<Object[]> successTrend(Long repositoryId);

    @Query("""
SELECT DATE(p.startTime),
       AVG(p.durationMs)
FROM PipelineRun p
WHERE p.repository.id = :repositoryId
GROUP BY DATE(p.startTime)
ORDER BY DATE(p.startTime)
""")
    List<Object[]> durationTrend(Long repositoryId);

    @Query("""
SELECT p.workflowName,
       COUNT(p)
FROM PipelineRun p
WHERE p.repository.id=:repositoryId
GROUP BY p.workflowName
ORDER BY COUNT(p) DESC
""")
    List<Object[]> workflowDistribution(Long repositoryId);

    @Query("""
SELECT p.branch,
       COUNT(p)
FROM PipelineRun p
WHERE p.repository.id=:repositoryId
GROUP BY p.branch
ORDER BY COUNT(p) DESC
""")
    List<Object[]> branchActivity(Long repositoryId);

    List<PipelineRun> findTop20ByRepositoryIdOrderByStartTimeDesc(Long repositoryId);

}