package com.project.winiaaid.domain.repair;

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
    private String note;

    public ReservationInfoDto toReservationInfoDto() {
        return ReservationInfoDto.builder()
                .engineerName(engineer_name)
                .serviceType(service_type)
                .completedFlag(completed_flag == 0 ? "접수 취소" : completed_flag == 1 ? "접수 완료" : "해결")
                .requestDate(request_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .reservationDate(reservation_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .note(note)
                .build();
    }
}
