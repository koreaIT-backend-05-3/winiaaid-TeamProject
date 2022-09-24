package com.project.winiaaid.service.recall;

import com.project.winiaaid.web.dto.recall.RecallServiceRequestDto;
import com.project.winiaaid.web.dto.recall.RecallServiceResponseDto;

public interface RecallService {
	public String addRecallRequest(RecallServiceRequestDto recallServiceRequestDto) throws Exception;
	public RecallServiceResponseDto getRecallRequest(String recallCode, String userName, int userCode) throws Exception;
}