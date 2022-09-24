package com.project.winiaaid.service.engineer;

import com.project.winiaaid.domain.engineer.Engineer;
import com.project.winiaaid.web.dto.engineer.ReadEngineerInfoResponseDto;
import com.project.winiaaid.web.dto.engineer.ReadEngineerReservationResponseDto;

import java.util.List;

public interface EngineerService {
    public List<ReadEngineerInfoResponseDto> getEngineerInfoList() throws Exception;
    public List<ReadEngineerReservationResponseDto> getEngineerReservationInfo(String date) throws Exception;

//    public List<Engineer> getEngineerList() throws Exception;
}