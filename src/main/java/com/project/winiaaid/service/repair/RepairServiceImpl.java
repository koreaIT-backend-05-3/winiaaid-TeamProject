package com.project.winiaaid.service.repair;

import com.project.winiaaid.domain.repair.*;
import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.util.RequestService;
import com.project.winiaaid.util.UserService;
import com.project.winiaaid.web.dto.repair.AddressResponseDto;
import com.project.winiaaid.web.dto.repair.RepairReservationInfoDto;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceDetailRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import com.project.winiaaid.web.dto.requestInfo.ServiceRequestResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RepairServiceImpl implements RepairService {

    private final RepairRepository repairRepository;
    private final RequestService requestService;
    private final UserService userService;
    private final ConfigMap configMapper;

    @Override
    public ServiceRequestResponseDto addRepairServiceRequest(RepairServiceRequestDto repairServiceRequestDto) throws Exception {
        ServiceInfo repairServiceInfo = null;
        RepairProductInfoEntity productInfoEntity = null;
        ServiceRequestResponseDto serviceRequestResponseDto = null;
        RepairServiceCode serviceCodeEntity = null;
        Map<String, Object> configMap = null;
        int status = 0;

        repairServiceInfo = changeToRepairServiceInfoEntity(repairServiceRequestDto);
        productInfoEntity = (RepairProductInfoEntity) repairServiceInfo.getProductInfoEntity();

        configMap = configMapper.setCreateRepairServiceConfigMap(productInfoEntity);

        serviceCodeEntity = repairRepository.findRepairServiceCode(configMap);

        if(((RepairUserInfoEntity) repairServiceInfo.getUserInfoEntity()).isNon_member_flag()) {
            userService.setServiceTypeNonMemberUserCode(repairServiceInfo.getUserInfoEntity());
        }

        setServiceCodeAndIdToEntity(productInfoEntity, serviceCodeEntity);

        status = repairRepository.addRepairServiceRequest(repairServiceInfo);

        serviceRequestResponseDto =
                requestService.buildServiceRequestResponseDto(repairServiceRequestDto.getUserInfoObject().getUserName(), serviceCodeEntity.getService_code());

        return status == 0 ? null : serviceRequestResponseDto;
    }

    @Override
    public List<ReadServiceInfoResponseDto> getServiceHistoryDetailInfoListByUserCode(int userCode, int page) throws Exception {
        List<ServiceInfo> serviceInfoEntityList = null;
        List<ReadServiceInfoResponseDto> serviceResponseDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadRepairServiceHistoryDetailListAndPastAddressListConfigMap(userCode, page, "repairService");

        serviceInfoEntityList = repairRepository.findRepairServiceHistoryDetailInfoListByUserCode(configMap);

        if(serviceInfoEntityList != null && serviceInfoEntityList.size() != 0) {
            serviceResponseDtoList = changeToServiceResponseDtoList(serviceInfoEntityList);
        }

        return serviceResponseDtoList;
    }

    @Override
    public ReadServiceInfoResponseDto getRepairServiceDetailHistoryInfo(ReadServiceDetailRequestDto readServiceDetailRequestDto) throws Exception {
        ServiceInfo repairServiceInfoEntity = null;
        ReadServiceInfoResponseDto repairServiceResponseDto = null;

        repairServiceInfoEntity = repairRepository.findRepairServiceDetailHistoryInfo(readServiceDetailRequestDto.toReadServiceDetailRequestEntity());

        if(repairServiceInfoEntity != null) {
            repairServiceResponseDto = requestService.changeToRepairServiceResponseDto(repairServiceInfoEntity);
        }

        return repairServiceResponseDto;
    }

    @Override
    public List<AddressResponseDto> getPastReceptionAddressListByUserCode(int userCode, int page) throws Exception {
        List<Address> addressList = null;
        List<AddressResponseDto> addressResponseDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadRepairServiceHistoryDetailListAndPastAddressListConfigMap(userCode, page, "address");

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

    private void setServiceCodeAndIdToEntity(RepairProductInfoEntity productInfoEntity, RepairServiceCode serviceCodeEntity) {
        productInfoEntity.setService_code(serviceCodeEntity.getService_code());
        productInfoEntity.setId2(serviceCodeEntity.getId2());
    }

    private List<AddressResponseDto> changeToAddressResponseDtoList(List<Address> addressList) {
        return addressList.stream()
                .map(Address::toAddressResponseDto)
                .collect(Collectors.toList());
    }

    private List<ReadServiceInfoResponseDto> changeToServiceResponseDtoList(List<ServiceInfo> serviceResponseDtoList) {
        return serviceResponseDtoList.stream()
                .map(ServiceInfo::toServiceResponseDto)
                .collect(Collectors.toList());
    }
}