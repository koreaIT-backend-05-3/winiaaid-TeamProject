package com.project.winiaaid.web.dto.manager.board;

import com.project.winiaaid.domain.manager.ManagerBoard;
import lombok.Data;

@Data
public class UpdateBoardResponseRequestDto {
    private String boardCode;
    private String responseContent;

    public ManagerBoard toManagerBoardEntity() {
        return ManagerBoard.builder()
                .board_code(boardCode)
                .response_content(responseContent)
                .build();
    }

}