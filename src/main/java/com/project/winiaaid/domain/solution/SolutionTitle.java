package com.project.winiaaid.domain.solution;

import com.project.winiaaid.web.dto.solution.ReadSolutionTitleResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolutionTitle {
    private int solution_code;
    private String solution_title;
    private int solution_board_type;

    public ReadSolutionTitleResponseDto toReadSolutionTitleResponseDto() {
        return ReadSolutionTitleResponseDto.builder()
                .solutionCode(solution_code)
                .solutionTitle(solution_title)
                .solutionBoardType(solution_board_type == 1 ? "자주하는 질문" : "자가진단")
                .build();
    }
}