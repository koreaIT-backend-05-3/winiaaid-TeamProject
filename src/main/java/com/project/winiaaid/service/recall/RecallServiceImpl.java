package com.project.winiaaid.service.recall;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import com.project.winiaaid.domain.recall.RecallProductInfoEntity;
import com.project.winiaaid.domain.recall.RecallServiceCode;
import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.recall.RecallServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.project.winiaaid.domain.recall.RecallRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecallServiceImpl implements RecallService {
	
	private final RecallRepository recallRepository;
	private final ConfigMap configMapper;

	@Override
	public String addRecallRequest(RecallServiceRequestDto recallServiceRequestDto) throws Exception {
		ServiceInfo recallEntity = recallServiceRequestDto.toServiceInfoEntity();
		RecallProductInfoEntity recallProductInfoEntity = (RecallProductInfoEntity) recallEntity.getProductInfoEntity();

		RecallServiceCode serviceCodeEntity = null;
		String serviceCode = null;
		Map<String, Object> configMap = null;

		configMap = configMapper.setConfigMap(recallEntity);

		serviceCodeEntity = recallRepository.findServiceCode(configMap);

		serviceCode = createServiceCode(recallEntity, serviceCodeEntity);

		recallProductInfoEntity.setService_code(serviceCode);
		recallProductInfoEntity.setId2(serviceCodeEntity.getId2());

		recallRepository.addRecallRequest(recallEntity);
		
		return recallProductInfoEntity.getService_code();
	}

	@Override
	public ReadServiceInfoResponseDto getRecallRequest(String serviceCode, String userName, int userCode) throws Exception {
		Map<String, Object> map =  new HashMap<String, Object>();
		
		map.put("service_code", serviceCode);
		map.put("user_name", userName);
		map.put("user_code", userCode);

		log.info("check: {}", map);
		
		return recallRepository.getRecallRequest(map).toServiceResponseDto();
	}

	private String createServiceCode(ServiceInfo serviceInfo, RecallServiceCode serviceCodeEntity) {
		return ((RecallProductInfoEntity) serviceInfo.getProductInfoEntity()).getModel_number().substring(0, 4).replaceAll("-", "") + "0" + serviceCodeEntity.getService_code();
	}

}
