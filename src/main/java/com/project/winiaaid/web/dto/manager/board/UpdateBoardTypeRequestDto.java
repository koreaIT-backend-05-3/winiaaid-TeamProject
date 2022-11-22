package com.project.winiaaid.web.dto.manager.board;

import com.project.winiaaid.domain.manager.ManagerBoard;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateBoardTypeRequestDto {
    private String boardCode;
    private int boardTypeCode;

    public ManagerBoard toManagerBoardEntity() {
        return ManagerBoard.builder()
                .board_code(boardCode)
                .temp_board_code(setTempBoardCode())
                .board_type_code(boardTypeCode)
                .build();
    }

    public String setTempBoardCode() {
        LocalDateTime nowDate = LocalDateTime.now();

        int year = nowDate.getYear();
        int month = nowDate.getMonthValue();
        int day = nowDate.getDayOfMonth();

        return boardTypeCode + "0" + (year + month + day);
    }
}
