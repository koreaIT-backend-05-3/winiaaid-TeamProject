package com.project.winiaaid.domain.engineer;

import com.project.winiaaid.web.dto.Engineer.EngineerReservationInfoDto;
import com.project.winiaaid.web.dto.Engineer.ReadEngineerResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Engineer {
    private int engineer_code;
    private String engineer_name;
    private LocalDateTime reservation_time;

    public EngineerReservationInfoDto toEngineerReservationInfoDto() {
        return EngineerReservationInfoDto.builder()
                .engineerCode(engineer_code)
                .engineerName(engineer_name)
                .reservationTime(reservation_time.getHour() + ":" + reservation_time.getMinute())
                .build();
    }
}