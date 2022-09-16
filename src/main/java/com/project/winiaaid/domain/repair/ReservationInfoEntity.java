package com.project.winiaaid.domain.repair;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.project.winiaaid.web.dto.repair.ReservationInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationInfoEntity {
    private int engineer_code;
    private String engineer_name;
    private String service_type;
    private int completed_flag;
    private LocalDateTime request_date;
    private LocalDateTime reservation_date;
    private int total_count;

    public ReservationInfoDto toReservationInfoDto() {
        return ReservationInfoDto.builder()
                .engineerCode(engineer_code)
                .engineerName(engineer_name)
                .serviceType(service_type)
                .completedFlag(completed_flag)
                .requestDate(request_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .reservationDate(reservation_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .totalCount(total_count)
                .build();
    }
}
