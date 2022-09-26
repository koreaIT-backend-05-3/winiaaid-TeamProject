package com.project.winiaaid.web.dto.recall;

import com.project.winiaaid.domain.requestInfo.ReservationInfoEntity;
import com.project.winiaaid.web.dto.requestInfo.ReservationInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecallReservationInfoDto implements ReservationInfoDto {
    private int serviceTypeCode;
    private String serviceTypeName;
    private String requestDate;
    private String progressStatus;
    private int note;

    @Override
    public ReservationInfoEntity toReservationEntity(LocalDateTime resevationDate) {
        return null;
    }
}
