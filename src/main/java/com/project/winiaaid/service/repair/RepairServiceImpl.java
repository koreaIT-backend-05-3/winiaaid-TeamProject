package com.project.winiaaid.service.repair;

import com.project.winiaaid.domain.repair.RepairRepository;
import com.project.winiaaid.domain.repair.RepairServiceInfo;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class RepairServiceImpl implements RepairService {

    private final RepairRepository repairRepository;

    @Override
    public boolean addRepairServiceRequest(RepairServiceRequestDto applyServiceRequestDto) throws Exception {
        RepairServiceInfo repairServiceInfo = applyServiceRequestDto.toRepairServiceInfoEntity(
                changeStringToLocalDateTime(
                        applyServiceRequestDto.getReservationInfoObject().getReservationDay(),
                        applyServiceRequestDto.getReservationInfoObject().getReservationTime())
        );

        System.out.println(repairServiceInfo);

        return repairRepository.addRepairServiceRequest(repairServiceInfo) > 0;
    }

    @Override
    public RepairServiceInfo getRepariServiceByUserCode() throws Exception {
        RepairServiceInfo repairServiceInfoList = null;
        repairServiceInfoList = repairRepository.findRepariServiceByUserCode();

        System.out.println(repairServiceInfoList);

        return repairServiceInfoList;
    }

    private LocalDateTime changeStringToLocalDateTime(String reservationDay, String reservationTime) {
        String reservationDate = reservationDay.replaceAll("\\.", "-") + " " + reservationTime + ":00";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return LocalDateTime.parse(reservationDate, formatter);
    }
}