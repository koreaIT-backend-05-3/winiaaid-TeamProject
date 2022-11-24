package com.project.winiaaid.domain.repair;

import com.project.winiaaid.domain.requestInfo.ReservationInfoEntity;
import com.project.winiaaid.web.dto.repair.RepairReservationInfoDto;
import com.project.winiaaid.web.dto.requestInfo.ReservationInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
public class RepairReservationInfoEntity implements ReservationInfoEntity {
    private int engineer_code;
    private String engineer_name;
    private int service_type_code;
    private String service_type_name;
    private int progress_status;
    private LocalDateTime request_date;
    private LocalDateTime reservation_date;
    private int total_count;

    @Override
    public ReservationInfoDto toReservationInfoDto() {
        return RepairReservationInfoDto.builder()
                .engineerCode(engineer_code)
                .engineerName(engineer_name)
                .serviceTypeName(service_type_name)
                .progressStatus(progress_status)
                .requestDate(request_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .reservationDate(reservation_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .totalCount(total_count)
                .build();
    }

    @Override
    public boolean isEmpty() {
        log.info("total_count: {}", total_count);
        log.info("total_count == 0: {}", total_count == 0);
        return total_count == 0;
    }
}
