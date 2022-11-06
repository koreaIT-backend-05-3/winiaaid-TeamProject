package com.project.winiaaid.web.dto.manager.solution;

import com.project.winiaaid.domain.manager.ManagerSolution;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class InsertSolutionRequestDto {
    private int solutionTypeCode;
    private int solutionTypeBoardCode;
    private String solutionTitle;
    private String solutionContent;
    private List<MultipartFile> fileList;

    public ManagerSolution toManagerSolution() {
        return ManagerSolution.builder()
                .solution_type_code(solutionTypeCode)
                .solution_type_board_code(solutionTypeBoardCode)
                .solution_title(solutionTitle)
                .solution_content(solutionContent)
                .build();
    }
}