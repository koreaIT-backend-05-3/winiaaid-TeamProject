package com.project.winiaaid.domain.manager;

import com.project.winiaaid.domain.solution.SolutionFile;
import com.project.winiaaid.web.dto.manager.solution.ReadSolutionDetailResponseDto;
import com.project.winiaaid.web.dto.solution.SolutionFileDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerSolution {
    private int solution_code;
    private int solution_type_code;
    private String solution_type_name;
    private int solution_board_type_code;
    private String solution_title;
    private String solution_content;
    private List<String> file_name_list;
    private List<SolutionFile> file_list;

    private int product_code;
    private List<Integer> solution_code_list;

    public ReadSolutionDetailResponseDto toReadSolutionDetailResponseDto() {
        return ReadSolutionDetailResponseDto.builder()
                .solutionTitle(solution_title)
                .solutionContent(solution_content)
                .solutionTypeCode(solution_type_code)
                .solutionBoardType(solution_board_type_code == 1 ? "자주하는 질문" : "자가진단")
                .fileList(file_list.stream()
                        .map(SolutionFile::toSolutionFileDto)
                        .collect(Collectors.toList()))
                .build();
    }
}