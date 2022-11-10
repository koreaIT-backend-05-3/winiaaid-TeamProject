package com.project.winiaaid.web.dto.solution;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolutionFileDto {
    private int fileCode;
    private String fileName;
}