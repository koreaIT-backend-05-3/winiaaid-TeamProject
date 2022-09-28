package com.project.winiaaid.service.repair;

import com.project.winiaaid.domain.repair.Address;
import com.project.winiaaid.domain.repair.RepairProductInfoEntity;
import com.project.winiaaid.domain.repair.RepairRepository;
import com.project.winiaaid.domain.repair.RepairServiceCode;
import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.repair.AddressResponseDto;
import com.project.winiaaid.web.dto.repair.RepairReservationInfoDto;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final ConfigMap configMapper;

    @Override
    public String addRepairServiceRequest(RepairServiceRequestDto repairServiceRequestDto) throws Exception {
        ServiceInfo repairServiceInfo = changeToRepairServiceInfoEntity(repairServiceRequestDto);
        RepairProductInfoEntity productInfoEntity = (RepairProductInfoEntity) repairServiceInfo.getProductInfoEntity();

        RepairServiceCode serviceCode = null;
        Map<String, Object> configMap = new HashMap<String, Object>();

        configMap.put("temp_service_code", productInfoEntity.getTemp_service_code());
        configMap.put("product_code", productInfoEntity.getProduct_code());

        serviceCode = repairRepository.findRepairServiceCode(configMap);

        log.info("repairServiceCode: {}", serviceCode);

        productInfoEntity.setService_code(serviceCode.getService_code());
        productInfoEntity.setId2(serviceCode.getId2());

        repairRepository.addRepairServiceRequest(repairServiceInfo);

        return serviceCode.getService_code();
    }

    @Override
    public List<ReadServiceInfoResponseDto> getServiceHistoryDetailInfoListByUserCode(int userCode, int page) throws Exception {
        List<ServiceInfo> serviceInfoEntityList = null;
        List<ReadServiceInfoResponseDto> serviceResponseDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadRepariServiceHistoryDetailInfoListConfigMap(userCode, page);

        serviceInfoEntityList = repairRepository.findRepairServiceHistoryDetailInfoListByUserCode(configMap);

        if(serviceInfoEntityList != null && serviceInfoEntityList.size() != 0) {
            serviceResponseDtoList = changeToServiceResponseDtoList(serviceInfoEntityList);
        }

        return serviceResponseDtoList;
    }

    @Override
    public ReadServiceInfoResponseDto getRepairServiceDetailHistoryInfo(String serviceCode) throws Exception {
        ServiceInfo repairServiceInfoEntity = null;
        ReadServiceInfoResponseDto repairServiceResponseDto = null;

        repairServiceInfoEntity = repairRepository.findRepairServiceDetailHistoryInfo(serviceCode);

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
        ServiceInfo repairServiceInfo = changeToRepairServiceInfoEntity(repairServiceRequestDto);

        repairRepository.updateRepairReservationInfoByRepairServiceCode(repairServiceInfo);

        return ((RepairProductInfoEntity)repairServiceInfo.getProductInfoEntity()).getService_code();
    }

    @Override
    public boolean cancelRepairServiceByRepairServiceCode(String repairServiceCode) throws Exception {
        return repairRepository.cancelRepairServiceByRepairServiceCode(repairServiceCode) > 0;
    }

    private ServiceInfo changeToRepairServiceInfoEntity(RepairServiceRequestDto repairServiceRequestDto) {
        return repairServiceRequestDto.toServiceInfoEntity(
                changeStringToLocalDateTime(
                        ((RepairReservationInfoDto) repairServiceRequestDto.getReservationInfoObject()).getReservationDay(),
                        ((RepairReservationInfoDto)repairServiceRequestDto.getReservationInfoObject()).getReservationTime()
                )
        );
    }

    private LocalDateTime changeStringToLocalDateTime(String reservationDay, String reservationTime) {
        String reservationDate = reservationDay.replaceAll("\\.", "-") + " " + reservationTime + ":00";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return LocalDateTime.parse(reservationDate, formatter);
    }

    private ReadServiceInfoResponseDto changeToRepairServiceResponseDto(ServiceInfo repairServiceInfo) {
        return repairServiceInfo.toServiceResponseDto();
    }

    private List<AddressResponseDto> changeToAddressResponseDtoList(List<Address> addressList) {
        return addressList.stream()
                .map(address -> address.toAddressResponseDto())
                .collect(Collectors.toList());
    }

    private List<ReadServiceInfoResponseDto> changeToServiceResponseDtoList(List<ServiceInfo> serviceResponseDtoList) {
        return serviceResponseDtoList.stream()
                .map(ServiceInfo::toServiceResponseDto)
                .collect(Collectors.toList());
    }
}