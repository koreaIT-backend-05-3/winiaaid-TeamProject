package com.project.winiaaid.domain.history;

import com.project.winiaaid.web.dto.history.ReadServiceHistoryTitleResponseDto;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ServiceHistoryTitle {
    private String service_code;
    private String service_type_name;
    private String product_name;
    private LocalDateTime request_date;
    private int progress_status;
    private int completed_total_count;
    private int incompleted_total_count;

    public ReadServiceHistoryTitleResponseDto toReadServiceHistoryTitleResponseDto() {
        return ReadServiceHistoryTitleResponseDto.builder()
                .serviceCode(service_code)
                .serviceTypeName(service_type_name)
                .productName(product_name)
                .requestDate(request_date)
                .progressStatus(progress_status == 0 ? "접수 취소" : progress_status == 1 ? "접수 완료" : "방문 완료")
                .completedTotalCount(completed_total_count)
                .incompletedTotalCount(incompleted_total_count)
                .build();
    }
}