package com.project.winiaaid.service.repair;

import com.project.winiaaid.domain.repair.RepairRepository;
import com.project.winiaaid.domain.repair.RepairServiceInfo;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import com.project.winiaaid.web.dto.repair.RepairServiceResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.jni.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RepairServiceImpl implements RepairService {

    private final RepairRepository repairRepository;

    @Override
    public boolean addRepairServiceRequest(RepairServiceRequestDto applyServiceRequestDto) throws Exception {
        RepairServiceInfo repairServiceInfo = applyServiceRequestDto.toRepairServiceInfoEntity(
                changeStringToLocalDateTime(
                        applyServiceRequestDto.getReservationInfoObject().getReservationDay(),
                        applyServiceRequestDto.getReservationInfoObject().getReservationTime())
        );

        return repairRepository.addRepairServiceRequest(repairServiceInfo) > 0;
    }

    @Override
    public List<RepairServiceResponseDto> getRepariServiceByUserCode(int userCode) throws Exception {
        List<RepairServiceInfo> repairServiceInfoEntityList = null;
        List<RepairServiceResponseDto> repairServiceResponseDtoList = null;

        repairServiceInfoEntityList = repairRepository.findRepairServiceByUserCode(userCode);

        if(repairServiceInfoEntityList != null) {
            repairServiceResponseDtoList = changeToRepairServiceResponseDto(repairServiceInfoEntityList);
        }

        return repairServiceInfoEntityList.size() != 0 ? repairServiceResponseDtoList : null;
    }

    private LocalDateTime changeStringToLocalDateTime(String reservationDay, String reservationTime) {
        String reservationDate = reservationDay.replaceAll("\\.", "-") + " " + reservationTime + ":00";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return LocalDateTime.parse(reservationDate, formatter);
    }

    private List<RepairServiceResponseDto> changeToRepairServiceResponseDto(List<RepairServiceInfo> repairServiceInfoList) {
        return repairServiceInfoList.stream()
                .map(repairServiceInfo -> repairServiceInfo.toRepairServiceResponseDto())
                .collect(Collectors.toList());
    }
}