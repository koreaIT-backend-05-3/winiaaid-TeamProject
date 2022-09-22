package com.project.winiaaid.domain.solution;

import com.project.winiaaid.web.dto.solution.ReadSolutionDetailResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Solution {
    private int solution_board_code;
    private int company_code;
    private String product_category_name;
    private String product_detail_name;
    private String solution_title;
    private String solution_content;
    private String solution_name;
    private int total_count;
    private int views;
    private String product_group_name;
    private List<SolutionFile> solutionFileList;
    private LocalDateTime create_date;
    private LocalDateTime update_date;

    public ReadSolutionResponseDto toReadSolutionResponseDto() {
        return ReadSolutionResponseDto.builder()
                .solutionBoardCode(solution_board_code)
                .productCategoryName(product_category_name)
                .productDetailName(product_detail_name)
                .solutionTitle(solution_title)
                .solutionContent(solution_content)
                .solutionName(solution_name)
                .totalCount(total_count)
                .createDate(create_date)
                .updateDate(update_date)
                .build();
    }

    public ReadSolutionDetailResponseDto toReadSolutionDetailResponseDto() {
        return ReadSolutionDetailResponseDto.builder()
                .companyCode(company_code)
                .solutionTitle(solution_title)
                .solutionContent(solution_content)
                .productCategoryName(product_category_name)
                .productDetailName(product_detail_name)
                .solutionName(solution_name)
                .productGroupName(product_group_name)
                .createDate(create_date)
                .build();
    }
}