package com.project.winiaaid.domain.manager;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ManagerBoard {
    private int id2;
    private String board_code;
    private String new_board_code;
    private String temp_board_code;
    private int board_type_code;
    private String response_content;
}