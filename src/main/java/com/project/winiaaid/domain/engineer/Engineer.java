package com.project.winiaaid.domain.engineer;

import com.project.winiaaid.web.dto.engineer.ReadEngineerReservationInfoResponseDto;
import com.project.winiaaid.web.dto.engineer.ReadEngineerInfoResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Engineer {
    private int engineer_code;
    private String engineer_name;
    private List<ReservationDate> reservation_date_list;

    public ReadEngineerReservationInfoResponseDto toReadEngineerReservationInfoResponseDto() {
        return ReadEngineerReservationInfoResponseDto.builder()
                .engineerCode(engineer_code)
                .engineerName(engineer_name)
                .reservationDayList(reservation_date_list.stream()
                        .map(reservation_date -> DateTimeFormatter.ofPattern("yyyy-MM-dd").format(reservation_date.getReservation_date()))
                        .collect(Collectors.toList()))
                .reservationTimeList(reservation_date_list.stream()
                        .map(reservation_date -> DateTimeFormatter.ofPattern("HH:mm").format(reservation_date.getReservation_date()))
                        .collect(Collectors.toList()))
                .build();
    }

    public ReadEngineerInfoResponseDto toReadEngineerInfoResponseDto() {
        return ReadEngineerInfoResponseDto.builder()
                .engineerCode(engineer_code)
                .engineerName(engineer_name)
                .build();
    }
}