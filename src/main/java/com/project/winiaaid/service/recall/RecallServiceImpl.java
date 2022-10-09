package com.project.winiaaid.service.recall;

import com.project.winiaaid.domain.recall.RecallProductInfoEntity;
import com.project.winiaaid.domain.recall.RecallRepository;
import com.project.winiaaid.domain.recall.RecallServiceCode;
import com.project.winiaaid.domain.recall.RecallUserInfoEntity;
import com.project.winiaaid.domain.repair.RepairProductInfoEntity;
import com.project.winiaaid.domain.repair.RepairServiceCode;
import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.util.RequestService;
import com.project.winiaaid.util.UserService;
import com.project.winiaaid.web.dto.recall.RecallServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import com.project.winiaaid.web.dto.requestInfo.ServiceRequestResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecallServiceImpl implements RecallService {

	private final RequestService requestService;
	private final RecallRepository recallRepository;
	private final UserService userService;
	private final ConfigMap configMapper;

	@Override
	public ServiceRequestResponseDto addRecallRequest(RecallServiceRequestDto recallServiceRequestDto) throws Exception {
		ServiceInfo recallEntity = null;
		RecallProductInfoEntity recallProductInfoEntity = null;
		ServiceRequestResponseDto serviceRequestResponseDto = null;
		RecallServiceCode serviceCodeEntity = null;
		Map<String, Object> configMap = null;
		int status = 0;
		String serviceCode = null;

		recallEntity = changeToRecallServiceInfoEntity(recallServiceRequestDto);
		recallProductInfoEntity = (RecallProductInfoEntity) recallEntity.getProductInfoEntity();

		configMap = configMapper.setCreateModelConfigMap(recallEntity);

		serviceCodeEntity = recallRepository.findServiceCode(configMap);

		if(((RecallUserInfoEntity) recallEntity.getUserInfoEntity()).isNon_member_flag()) {
			userService.setServiceTypeNonMemberUserCode(recallEntity.getUserInfoEntity());
		}

		serviceCode = createServiceCode(recallEntity, serviceCodeEntity);

		setServiceCodeAndIdToEntity(recallProductInfoEntity, serviceCodeEntity, serviceCode);

		status = recallRepository.addRecallRequest(recallEntity);

		serviceRequestResponseDto =
				requestService.buildServiceRequestResponseDto(recallServiceRequestDto.getUserInfoObject().getUserName(), serviceCode);
		
		return status == 0 ? null : serviceRequestResponseDto;
	}

	@Override
	public ReadServiceInfoResponseDto getRecallRequest(String serviceCode, int userCode, String userName) throws Exception {
		ServiceInfo recallServiceInfo = null;
		ReadServiceInfoResponseDto readServiceInfoResponseDto = null;
		Map<String, Object> configMap = null;

		configMap = configMapper.setReadServiceDetailHistoryConfigMap(serviceCode, userCode, userName);

		recallServiceInfo = recallRepository.getRecallRequest(configMap);

		if(recallServiceInfo != null) {
			readServiceInfoResponseDto = requestService.changeToRepairServiceResponseDto(recallServiceInfo);
		}

		return readServiceInfoResponseDto;
	}
	
	@Override
	public List<ReadServiceInfoResponseDto> getRecallRequestList(int page, int userCode) throws Exception {
			int index = (page - 1) * 10;
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("index", index);
			map.put("user_code", userCode);
			
			List<ReadServiceInfoResponseDto> list = new ArrayList<ReadServiceInfoResponseDto>();
			
			recallRepository.getRecallRequestList(map).forEach(recall -> {
				list.add(recall.toServiceResponseDto());
			});
			
		return list;
	}

	@Override
	public boolean updateCancelRecallRequest(String serviceCode) throws Exception {
		return recallRepository.updateCancelRecallRequest(serviceCode) > 0;
	}

	private ServiceInfo changeToRecallServiceInfoEntity(RecallServiceRequestDto recallServiceRequestDto) {
		return recallServiceRequestDto.toServiceInfoEntity();
	}

	private String createServiceCode(ServiceInfo serviceInfo, RecallServiceCode serviceCodeEntity) {
		return ((RecallProductInfoEntity) serviceInfo.getProductInfoEntity()).getModel_number().substring(0, 4).replaceAll("-", "") + "0" + serviceCodeEntity.getService_code();
	}

	private void setServiceCodeAndIdToEntity(RecallProductInfoEntity productInfoEntity, RecallServiceCode serviceCodeEntity, String serviceCode) {
		productInfoEntity.setService_code(serviceCode);
		productInfoEntity.setId2(serviceCodeEntity.getId2());
	}

}