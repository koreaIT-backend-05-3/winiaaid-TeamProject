package com.project.winiaaid.domain.solution;

import com.project.winiaaid.web.dto.solution.SolutionFileDto;
import lombok.Data;

@Data
public class SolutionFile {
    private String file_name;

    public SolutionFileDto toSolutionFileDto() {
        return new SolutionFileDto(file_name);
    }
}