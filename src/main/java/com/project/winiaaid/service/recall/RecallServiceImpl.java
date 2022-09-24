package com.project.winiaaid.service.recall;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.winiaaid.domain.recall.Recall;
import com.project.winiaaid.domain.recall.RecallRepository;
import com.project.winiaaid.web.dto.recall.RecallServiceRequestDto;
import com.project.winiaaid.web.dto.recall.RecallServiceResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecallServiceImpl implements RecallService {
	
	private final RecallRepository recallRepository;

	@Override
	public String addRecallRequest(RecallServiceRequestDto recallServiceRequestDto) throws Exception {
		Recall recallEntity = recallServiceRequestDto.toRecallEntity();		
		recallRepository.addRecallRequest(recallEntity);
		
		return recallServiceRequestDto.toRecallEntity().getRecall_code();
	}

	@Override
	public RecallServiceResponseDto getRecallRequest(String recallCode, String userName, int userCode) throws Exception {
		Map<String, Object> map =  new HashMap<String, Object>();
		
		map.put("recall_code", recallCode);
		map.put("user_name", userName);
		map.put("user_code", userCode);
		
		return recallRepository.getRecallRequest(map).toRecallServiceResponseDto();
	}

}
