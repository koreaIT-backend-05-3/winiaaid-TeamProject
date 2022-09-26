package com.project.winiaaid.service.recall;

import com.project.winiaaid.web.dto.recall.RecallServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;

public interface RecallService {
	public String addRecallRequest(RecallServiceRequestDto recallServiceRequestDto) throws Exception;
	public ReadServiceInfoResponseDto getRecallRequest(String serviceCode, String userName, int userCode) throws Exception;
}
