package com.project.winiaaid.web.dto.manager.solution;

import com.project.winiaaid.domain.manager.ManagerSolution;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class UpdateSolutionRequestDto {
    private int solutionCode;
    private String solutionTitle;
    private String solutionContent;
    private int solutionTypeCode;
    private int solutionBoardTypeCode;
    private List<Integer> deleteFileCodeList;
    private List<String> deleteFileNameList;
    private List<MultipartFile> fileList;
    private List<String> tempFileNameList;

    public ManagerSolution toManagerSolution() {
        return ManagerSolution.builder()
                .solution_code(solutionCode)
                .solution_title(solutionTitle)
                .solution_content(solutionContent)
                .solution_type_code(solutionTypeCode)
                .solution_board_type_code(solutionBoardTypeCode)
                .build();
    }
}