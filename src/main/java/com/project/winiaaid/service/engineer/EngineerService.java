package com.project.winiaaid.service.engineer;

import com.project.winiaaid.web.dto.Engineer.ReadEngineerResponseDto;

import java.util.List;
import java.util.Map;

public interface EngineerService {
    public List<ReadEngineerResponseDto> getEngineerReservationInfo() throws Exception;
}