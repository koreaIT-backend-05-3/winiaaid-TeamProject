package com.project.winiaaid.domain.engineer;

import com.project.winiaaid.web.dto.engineer.EngineerReservationInfoDto;
import com.project.winiaaid.web.dto.engineer.ReadEngineerInfoResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Engineer {
    private int engineer_code;
    private String engineer_name;
//    private List<ReservationTime> times;
    private LocalDateTime reservation_date;

    public EngineerReservationInfoDto toEngineerReservationInfoDto() {
        return EngineerReservationInfoDto.builder()
                .engineerCode(engineer_code)
                .engineerName(engineer_name)
                .reservationDay(DateTimeFormatter.ofPattern("yyyy-MM-dd").format(reservation_date))
                .reservationTime(DateTimeFormatter.ofPattern("HH:mm").format(reservation_date))
                .build();
    }

    public ReadEngineerInfoResponseDto toReadEngineerInfoResponseDto() {
        return ReadEngineerInfoResponseDto.builder()
                .engineerCode(engineer_code)
                .engineerName(engineer_name)
                .build();
    }
}