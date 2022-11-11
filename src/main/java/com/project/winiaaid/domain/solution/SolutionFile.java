package com.project.winiaaid.domain.solution;

import com.project.winiaaid.web.dto.solution.SolutionFileDto;
import lombok.Data;

@Data
public class SolutionFile {
    private int file_code;
    private String file_name;

    public SolutionFileDto toSolutionFileDto() {
        return SolutionFileDto.builder()
                .fileCode(file_code)
                .fileName(file_name)
                .build();
    }
}