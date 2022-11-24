package com.project.winiaaid.domain.recall;

import com.project.winiaaid.domain.requestInfo.ReservationInfoEntity;
import com.project.winiaaid.web.dto.recall.RecallReservationInfoDto;
import com.project.winiaaid.web.dto.requestInfo.ReservationInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecallReservationInfoEntity implements ReservationInfoEntity {
    private int service_type_code;
    private String service_type_name;
    private LocalDateTime request_date;
    private int progress_status;
    
    private int total_count;

    @Override
    public ReservationInfoDto toReservationInfoDto() {
        return RecallReservationInfoDto.builder()
                .serviceTypeCode(service_type_code)
                .serviceTypeName(service_type_name)
                .requestDate(request_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .progressStatus(progress_status)
                .totalCount(total_count)
                .build();
    }

    @Override
    public boolean isEmpty() {
        return total_count == 0;
    }
}
