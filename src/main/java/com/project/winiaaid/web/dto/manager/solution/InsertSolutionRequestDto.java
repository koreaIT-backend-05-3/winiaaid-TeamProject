package com.project.winiaaid.web.dto.manager.solution;

import com.project.winiaaid.domain.manager.ManagerSolution;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class InsertSolutionRequestDto {
    private int solutionTypeCode;
    private int solutionBoardTypeCode;
    private String solutionTitle;
    private String solutionContent;
    private List<MultipartFile> fileList;
    private List<String> tempFileNameList;

    public ManagerSolution toManagerSolution() {
        return ManagerSolution.builder()
                .solution_type_code(solutionTypeCode)
                .solution_board_type_code(solutionBoardTypeCode)
                .solution_title(solutionTitle)
                .solution_content(solutionContent.replaceAll("temp_solution_files", "solution_files"))
                .build();
    }
}