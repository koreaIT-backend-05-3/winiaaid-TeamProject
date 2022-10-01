package com.project.winiaaid.service.recall;

import com.project.winiaaid.domain.recall.RecallProductInfoEntity;
import com.project.winiaaid.domain.recall.RecallRepository;
import com.project.winiaaid.domain.recall.RecallServiceCode;
import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.recall.RecallServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
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
	
	private final RecallRepository recallRepository;
	private final ConfigMap configMapper;

	@Override
	public ServiceInfo addRecallRequest(RecallServiceRequestDto recallServiceRequestDto) throws Exception {
		ServiceInfo recallEntity = recallServiceRequestDto.toServiceInfoEntity();
		RecallProductInfoEntity recallProductInfoEntity = (RecallProductInfoEntity) recallEntity.getProductInfoEntity();

		RecallServiceCode serviceCodeEntity = null;
		String serviceCode = null;
		Map<String, Object> configMap = null;

		configMap = configMapper.setCreateModelConfigMap(recallEntity);

		serviceCodeEntity = recallRepository.findServiceCode(configMap);

		serviceCode = createServiceCode(recallEntity, serviceCodeEntity);

		recallProductInfoEntity.setService_code(serviceCode);
		recallProductInfoEntity.setId2(serviceCodeEntity.getId2());

		recallRepository.addRecallRequest(recallEntity);
		
		return recallEntity;
	}

	@Override
	public ReadServiceInfoResponseDto getRecallRequest(String serviceCode) throws Exception {
		return recallRepository.getRecallRequest(serviceCode).toServiceResponseDto();
	}

	private String createServiceCode(ServiceInfo serviceInfo, RecallServiceCode serviceCodeEntity) {
		return ((RecallProductInfoEntity) serviceInfo.getProductInfoEntity()).getModel_number().substring(0, 4).replaceAll("-", "") + "0" + serviceCodeEntity.getService_code();
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
}
