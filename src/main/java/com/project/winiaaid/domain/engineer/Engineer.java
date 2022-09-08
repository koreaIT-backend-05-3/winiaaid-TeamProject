package com.project.winiaaid.domain.engineer;

import com.project.winiaaid.web.dto.Engineer.EngineerReservationInfoDto;
import com.project.winiaaid.web.dto.Engineer.ReadEngineerInfoResponseDto;
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
public class Engineer {
    private int engineer_code;
    private String engineer_name;
    private LocalDateTime reservation_time;

    public EngineerReservationInfoDto toEngineerReservationInfoDto() {
        return EngineerReservationInfoDto.builder()
                .engineerCode(engineer_code)
                .engineerName(engineer_name)
                .reservationDay(DateTimeFormatter.ofPattern("yyyy-MM-dd").format(reservation_time))
                .reservationTime(DateTimeFormatter.ofPattern("HH:mm").format(reservation_time))
                .build();
    }

    public ReadEngineerInfoResponseDto toReadEngineerInfoResponseDto() {
        return ReadEngineerInfoResponseDto.builder()
                .engineerCode(engineer_code)
                .engineerName(engineer_name)
                .build();
    }
}