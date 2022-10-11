package com.project.winiaaid.domain.board;

import com.project.winiaaid.web.dto.board.ReadBoardTitleResponseDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;

@Data
public class BoardTitle {
    private String board_code;
    private int board_type_code;

    private String board_title;

    private int user_code;
    private String user_name;
    private String company_name;

    private int progress_status;
    private int total_count;
    private LocalDateTime create_date;

    public ReadBoardTitleResponseDto toReadBoardTitleResponseDto() {
        return ReadBoardTitleResponseDto.builder()
                .boardCode(board_code)
                .boardTitle(board_title)
                .userName(user_name)
                .companyName(company_name)
                .progressStatus(progress_status)
                .totalCount(total_count)
                .createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .build();
    }
}