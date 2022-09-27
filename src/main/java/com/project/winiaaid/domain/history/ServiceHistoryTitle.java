package com.project.winiaaid.domain.history;

import com.project.winiaaid.web.dto.history.ReadServiceHistoryTitleResponseDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class ServiceHistoryTitle {
    private String service_code;
    private int service_type_code;
    private String service_type_name;
    private String product_name;
    private LocalDateTime request_date;
    private int progress_status;
    private int completed_total_count;
    private int incompleted_total_count;
    private int total_count;

    public ReadServiceHistoryTitleResponseDto toReadServiceHistoryTitleResponseDto() {
        return ReadServiceHistoryTitleResponseDto.builder()
                .serviceCode(service_code)
                .serviceTypeCode(service_type_code)
                .serviceTypeName(service_type_name)
                .productName(product_name)
                .requestDate(request_date != null ? request_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) : null)
                .progressStatus(progress_status)
                .completedTotalCount(completed_total_count)
                .incompletedTotalCount(incompleted_total_count)
                .totalCount(total_count)
                .build();
    }
}