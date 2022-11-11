package com.project.winiaaid.web.dto.manager.solution;

import com.project.winiaaid.domain.manager.ManagerSolution;
import lombok.Data;

@Data
public class UpdateSolutionTypeRequestDto {
    private int solutionTypeCode;
    private String solutionTypeName;

    public ManagerSolution toManagerSolution() {
        return ManagerSolution.builder()
                .solution_type_code(solutionTypeCode)
                .solution_type_name(solutionTypeName)
                .build();
    }
}