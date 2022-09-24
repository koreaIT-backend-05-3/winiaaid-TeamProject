package com.project.winiaaid.service.repair;

import com.project.winiaaid.domain.repair.Address;
import com.project.winiaaid.domain.repair.RepairRepository;
import com.project.winiaaid.domain.repair.RepairServiceCode;
import com.project.winiaaid.domain.repair.RepairServiceInfo;
import com.project.winiaaid.web.dto.repair.AddressResponseDto;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import com.project.winiaaid.web.dto.repair.RepairServiceResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.jni.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RepairServiceImpl implements RepairService {

    private final RepairRepository repairRepository;

    @Override
    public String addRepairServiceRequest(RepairServiceRequestDto applyServiceRequestDto) throws Exception {
        RepairServiceInfo repairServiceInfo = changeToRepairServiceInfoEntity(applyServiceRequestDto);
        RepairServiceCode serviceCode = null;
        Map<String, Object> configMap = new HashMap<String, Object>();

        configMap.put("temp_repair_service_code", repairServiceInfo.getProductInfoEntity().getTemp_repair_service_code());
        configMap.put("product_code", repairServiceInfo.getProductInfoEntity().getProduct_code());

        serviceCode = repairRepository.findRepairServiceCode(configMap);

        log.info("repairServiceCode: {}", serviceCode);

        repairServiceInfo.getProductInfoEntity().setRepair_service_code(serviceCode.getRepair_service_code());
        repairServiceInfo.getProductInfoEntity().setId2(serviceCode.getId2());

        repairRepository.addRepairServiceRequest(repairServiceInfo);

        return serviceCode.getRepair_service_code();
    }

    @Override
    public List<RepairServiceResponseDto> getRepairServiceHistoryInfoByUserCode(String type, int userCode, int page) throws Exception {
        List<RepairServiceInfo> repairServiceInfoEntityList = null;
        List<RepairServiceResponseDto> repairServiceResponseDtoList = null;
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("limit", type.equals("popup") ? 3 : 10);
        configMap.put("page", (page - 1) * (Integer) configMap.get("limit"));
        configMap.put("user_code", userCode);

        repairServiceInfoEntityList = repairRepository.findRepairServiceByUserCode(configMap);

        if(repairServiceInfoEntityList != null && repairServiceInfoEntityList.size() != 0) {
            repairServiceResponseDtoList = changeToRepairServiceResponseDtoList(repairServiceInfoEntityList);
        }

        return repairServiceResponseDtoList;
    }

    @Override
    public RepairServiceResponseDto getRepairServiceDetailHistoryInfo(String repairServiceCode) throws Exception {
        RepairServiceInfo repairServiceInfoEntity = null;
        RepairServiceResponseDto repairServiceResponseDto = null;

        repairServiceInfoEntity = repairRepository.findRepairServiceDetailHistoryInfo(repairServiceCode);

        if(repairServiceInfoEntity != null) {
            repairServiceResponseDto = changeToRepairServiceResponseDto(repairServiceInfoEntity);
        }

        return repairServiceResponseDto;
    }

    @Override
    public List<AddressResponseDto> getPastReceptionAddressListByUserCode(int userCode, int page) throws Exception {
        List<Address> addressList = null;
        List<AddressResponseDto> addressResponseDtoList = null;
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("user_code", userCode);
        configMap.put("page", (page - 1) * 4);

        addressList = repairRepository.findPastReceptionAddressListByUserCode(configMap);

        if(addressList != null && addressList.size() != 0) {
            addressResponseDtoList = changeToAddressResponseDtoList(addressList);
        }

        return addressResponseDtoList;
    }

    @Override
    public String modifyRepairReservationInfoByRepairServiceCode(RepairServiceRequestDto repairServiceRequestDto) throws Exception {
        RepairServiceInfo repairServiceInfo = changeToRepairServiceInfoEntity(repairServiceRequestDto);

        repairRepository.updateRepairReservationInfoByRepairServiceCode(repairServiceInfo);

        return repairServiceInfo.getProductInfoEntity().getRepair_service_code();
    }

    @Override
    public boolean cancelRepairServiceByRepairServiceCode(String repairServiceCode) throws Exception {
        return repairRepository.cancelRepairServiceByRepairServiceCode(repairServiceCode) > 0;
    }

    private RepairServiceInfo changeToRepairServiceInfoEntity(RepairServiceRequestDto repairServiceRequestDto) {
        return repairServiceRequestDto.toRepairServiceInfoEntity(
                changeStringToLocalDateTime(
                        repairServiceRequestDto.getReservationInfoObject().getReservationDay(),
                        repairServiceRequestDto.getReservationInfoObject().getReservationTime()
                )
        );
    }

    private LocalDateTime changeStringToLocalDateTime(String reservationDay, String reservationTime) {
        String reservationDate = reservationDay.replaceAll("\\.", "-") + " " + reservationTime + ":00";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return LocalDateTime.parse(reservationDate, formatter);
    }

    private RepairServiceResponseDto changeToRepairServiceResponseDto(RepairServiceInfo repairServiceInfo) {
        return repairServiceInfo.toRepairServiceResponseDto();
    }

    private List<RepairServiceResponseDto> changeToRepairServiceResponseDtoList(List<RepairServiceInfo> repairServiceInfoList) {
        return repairServiceInfoList.stream()
                .map(repairServiceInfo -> repairServiceInfo.toRepairServiceResponseDto())
                .collect(Collectors.toList());
    }

    private List<AddressResponseDto> changeToAddressResponseDtoList(List<Address> addressList) {
        return addressList.stream()
                .map(address -> address.toAddressResponseDto())
                .collect(Collectors.toList());
    }
}