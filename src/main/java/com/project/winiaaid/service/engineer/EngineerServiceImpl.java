package com.project.winiaaid.service.engineer;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.winiaaid.domain.engineer.Engineer;
import com.project.winiaaid.domain.engineer.EngineerRepository;
import com.project.winiaaid.web.dto.engineer.ReadEngineerInfoResponseDto;
import com.project.winiaaid.web.dto.engineer.ReadEngineerReservationInfoResponseDto;
import com.project.winiaaid.web.dto.engineer.ReadEngineerReservationResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EngineerServiceImpl implements EngineerService {

    private final EngineerRepository engineerRepository;

    @Override
        public List<ReadEngineerInfoResponseDto> getEngineerInfoList() throws Exception {
        List<Engineer> engineerList = null;
        List<ReadEngineerInfoResponseDto> engineerInfoResponseDtoList = null;

        engineerList = engineerRepository.findEngineerList();

        if(engineerList != null && engineerList.size() != 0) {
            engineerInfoResponseDtoList = changeToReadEngineerInfoResponseDto(engineerList);
        }

        return engineerInfoResponseDtoList;
    }

    @Override
    public List<ReadEngineerReservationInfoResponseDto> getEngineerReservationInfo(String date) throws Exception {
        List<Engineer> engineerEntityList = null;
        List<ReadEngineerReservationInfoResponseDto> engineerReservationInfoDtoList = null;

        engineerEntityList = engineerRepository.findEngineerReservationInfo(date);

        if(engineerEntityList != null && engineerEntityList.size() != 0) {
            engineerReservationInfoDtoList = engineerEntityList.stream()
                    .map(Engineer::toReadEngineerReservationInfoResponseDto)
                    .collect(Collectors.toList());
            }

        return engineerReservationInfoDtoList;

    }

    private List<ReadEngineerInfoResponseDto> changeToReadEngineerInfoResponseDto(List<Engineer> engineerList) {
        return engineerList.stream()
                .map(engineer -> engineer.toReadEngineerInfoResponseDto())
                .collect(Collectors.toList());
    }
}