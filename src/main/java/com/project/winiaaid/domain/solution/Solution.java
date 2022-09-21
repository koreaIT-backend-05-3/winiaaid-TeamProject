package com.project.winiaaid.domain.solution;

import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Solution {
    private String product_category_name;
    private String product_detail_name;
    private String solution_title;
    private String solution_content;
    private String solution_name;
    private int total_count;
    private int views;
    private LocalDateTime create_date;
    private LocalDateTime update_date;

    public ReadSolutionResponseDto toReadSolutionResponseDto() {
        return ReadSolutionResponseDto.builder()
                .views(views)
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
}