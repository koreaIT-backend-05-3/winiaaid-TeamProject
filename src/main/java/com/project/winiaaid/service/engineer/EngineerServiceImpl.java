package com.project.winiaaid.service.engineer;

import com.project.winiaaid.domain.engineer.Engineer;
import com.project.winiaaid.domain.engineer.EngineerRepository;
import com.project.winiaaid.web.dto.Engineer.EngineerReservationInfoDto;
import com.project.winiaaid.web.dto.Engineer.ReadEngineerResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EngineerServiceImpl implements EngineerService {

    private final EngineerRepository engineerRepository;

    @Override
    public List<ReadEngineerResponseDto> getEngineerReservationInfo() throws Exception {
        List<Engineer> engineerList = null;
        List<ReadEngineerResponseDto> engineerResponseDtoList = null;

        engineerList = engineerRepository.getEngineerReservationInfo();

        if(engineerList != null) {
            Set<Integer> engineerCodeSet = new HashSet<>();
            engineerResponseDtoList = new ArrayList<>();

            engineerList.forEach(engineer -> engineerCodeSet.add(engineer.getEngineer_code()));

            Iterator<Integer> iterator = engineerCodeSet.iterator();

            while(iterator.hasNext()) {
                int engineerCode = iterator.next();

                ReadEngineerResponseDto readEngineerResponseDto = ReadEngineerResponseDto.builder()
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
}