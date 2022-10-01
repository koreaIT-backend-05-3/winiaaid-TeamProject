package com.project.winiaaid.domain.history;

import com.project.winiaaid.web.dto.history.ReadWritingServiceHistoryTitleResponseDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class WritingServiceHistoryTitle {
    private String company_name;
    private int board_code;
    private int board_type_code;
    private String board_type_name;
    private String board_title;
    private String board_content;
    private LocalDateTime create_date;
    private int progress_status;
    private String assessment;
    private int counsel_total_count;
    private int customer_total_count;
    private int total_count;

    public ReadWritingServiceHistoryTitleResponseDto toReadWritingServiceHistoryTitleDto() {
        return ReadWritingServiceHistoryTitleResponseDto.builder()
                .companyName(company_name)
                .boardCode(board_code)
                .boardTypeCode(board_type_code)
                .boardTypeName(board_type_name)
                .boardTitle(board_title)
                .boardContent(board_content)
                .createDate(create_date != null ? create_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) : null)
                .progressStatus(progress_status)
                .assessment(assessment)
                .counselTotalCount(counsel_total_count)
                .customerTotalCount(customer_total_count)
                .totalCount(total_count)
                .build();
    }
}