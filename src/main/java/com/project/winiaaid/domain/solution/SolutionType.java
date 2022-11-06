package com.project.winiaaid.domain.solution;

import com.project.winiaaid.web.dto.solution.ReadSolutionTypeResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolutionType {
    private int solution_type_code;
    private String solution_name;

    public ReadSolutionTypeResponseDto toReadSolutionTypeResponseDto() {
        return ReadSolutionTypeResponseDto.builder()
                .solutionTypeCode(solution_type_code)
                .solutionName(solution_name)
                .build();
    }
}