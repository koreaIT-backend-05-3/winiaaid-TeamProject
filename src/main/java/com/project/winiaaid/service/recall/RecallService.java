package com.project.winiaaid.service.recall;

import com.project.winiaaid.web.dto.recall.RecallServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceDetailRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import com.project.winiaaid.web.dto.requestInfo.ServiceRequestResponseDto;

import java.util.List;

public interface RecallService {
	public ServiceRequestResponseDto addRecallRequest(RecallServiceRequestDto recallServiceRequestDto) throws Exception;
	public ReadServiceInfoResponseDto getRecallRequest(ReadServiceDetailRequestDto readServiceDetailRequestDto) throws Exception;
	public List<ReadServiceInfoResponseDto> getRecallRequestList(int page, int userCode) throws Exception;
	public boolean updateCancelRecallRequest(String serviceCode) throws Exception;
}
