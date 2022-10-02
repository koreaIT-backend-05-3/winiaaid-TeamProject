package com.project.winiaaid.service.recall;

import java.util.List;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.web.dto.recall.RecallServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;

public interface RecallService {
	public ServiceInfo addRecallRequest(RecallServiceRequestDto recallServiceRequestDto) throws Exception;
	public ReadServiceInfoResponseDto getRecallRequest(String serviceCode, int userCode) throws Exception;
	public List<ReadServiceInfoResponseDto> getRecallRequestList(int page, int userCode) throws Exception;
	public boolean updateCancelRecallRequest(String serviceCode) throws Exception;
}
