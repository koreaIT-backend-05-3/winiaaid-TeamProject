package com.project.winiaaid.domain.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerSolution {
    private int solution_code;
    private int solution_type_code;
    private String solution_type_name;
    private int solution_type_board_code;
    private String solution_title;
    private String solution_content;
    private List<String> file_name_list;
}