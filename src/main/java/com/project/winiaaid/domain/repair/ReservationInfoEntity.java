package com.project.winiaaid.domain.repair;

import java.time.LocalDateTime;

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
    private String service_type;
    private int completed_flag;
    private LocalDateTime reservation_date;
}
