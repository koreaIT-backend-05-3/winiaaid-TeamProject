package com.project.winiaaid.service.engineer;

import com.project.winiaaid.domain.engineer.Engineer;
import com.project.winiaaid.domain.engineer.EngineerRepository;
import com.project.winiaaid.web.dto.Engineer.ReadEngineerInfoResponseDto;
import com.project.winiaaid.web.dto.Engineer.ReadEngineerReservationResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EngineerServiceImpl implements EngineerService {

    private final EngineerRepository engineerRepository;

    @Override
    public List<ReadEngineerInfoResponseDto> getEngineerInfoList() throws Exception {
        List<Engineer> engineerList = null;
        List<ReadEngineerInfoResponseDto> engineerInfoResponseDtoList = null;

        engineerList = engineerRepository.findEngineerList();

        if(engineerList != null) {
            engineerInfoResponseDtoList = changeToReadEngineerInfoResponseDto(engineerList);
        }

        return engineerInfoResponseDtoList;
    }

    @Override
    public List<ReadEngineerReservationResponseDto> getEngineerReservationInfo(String date) throws Exception {
        List<Engineer> engineerList = null;
        List<ReadEngineerReservationResponseDto> engineerResponseDtoList = null;

        engineerList = engineerRepository.findEngineerReservationInfo(date);

        if(engineerList != null) {
            Set<Integer> engineerCodeSet = new HashSet<>();
            engineerResponseDtoList = new ArrayList<>();

            engineerList.forEach(engineer -> engineerCodeSet.add(engineer.getEngineer_code()));

            Iterator<Integer> iterator = engineerCodeSet.iterator();

            while(iterator.hasNext()) {
                int engineerCode = iterator.next();

                ReadEngineerReservationResponseDto readEngineerResponseDto = ReadEngineerReservationResponseDto.builder()
                        .engineerReservationInfoDtoList(
                                engineerList.stream()
                                    .filter(engineer -> engineerCode == engineer.getEngineer_code())
                                    .map(engineer -> engineer.toEngineerReservationInfoDto())
                                    .collect(Collectors.toList())
                        )
                        .build();

                engineerResponseDtoList.add(readEngineerResponseDto);
//                List<String> reservationTimeList = engineerList.stream()
//                        .filter(engineer -> engineerCode == engineer.getEngineer_code())
//                        .map(engineer -> engineer.getReservation_time().getHour() + ":" + engineer.getReservation_time().getMinute())
//                        .collect(Collectors.toList());
            }
        }


        return engineerResponseDtoList;
    }

    private List<ReadEngineerInfoResponseDto> changeToReadEngineerInfoResponseDto(List<Engineer> engineerList) {
        return engineerList.stream()
                .map(engineer -> engineer.toReadEngineerInfoResponseDto())
                .collect(Collectors.toList());
    }
}