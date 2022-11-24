package com.project.winiaaid.domain.manager;

import com.project.winiaaid.web.dto.manager.service.ReadServiceHistoryTitleResponseManagerDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class ManagerServiceTitle {
    private String service_code;
    private String user_name;
    private int service_type_code;
    private int progress_status;
    private String model_number;
    private String product_name;
    private String trouble_symptom;
    private LocalDateTime request_date;
    private int total_count;

    public ReadServiceHistoryTitleResponseManagerDto toReadSolutionDetailResponseDto() {
        return ReadServiceHistoryTitleResponseManagerDto.builder()
                .serviceCode(service_code)
                .userName(user_name)
                .progressStatusCode(progress_status)
                .progressStatus(progress_status == 0 ? "접수 최소" : progress_status == 1 ? "접수 완료" : "방문 완료")
                .modelNumber(model_number)
                .productName(product_name)
                .troubleSymptom(trouble_symptom)
                .requestDate(request_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .totalCount(total_count)
                .build();

    }
}