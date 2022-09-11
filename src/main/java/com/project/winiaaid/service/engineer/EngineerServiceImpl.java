package com.project.winiaaid.service.engineer;

import com.project.winiaaid.domain.engineer.Engineer;
import com.project.winiaaid.domain.engineer.EngineerRepository;
import com.project.winiaaid.web.dto.engineer.ReadEngineerInfoResponseDto;
import com.project.winiaaid.web.dto.engineer.ReadEngineerReservationResponseDto;
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
            engineerResponseDtoList = new ArrayList<>();

            Iterator<Integer> iterator = makeIteratorByEngineerCodeSet(engineerList);

            while(iterator.hasNext()) {
                int engineerCode = iterator.next();

                ReadEngineerReservationResponseDto readEngineerResponseDto = buildEngineerReservationDtoByEngineerCode(engineerCode, engineerList);

                engineerResponseDtoList.add(readEngineerResponseDto);
//                List<String> reservationTimeList = engineerList.stream()
//                        .filter(engineer -> engineerCode == engineer.getEngineer_code())
//                        .map(engineer -> engineer.getReservation_time().getHour() + ":" + engineer.getReservation_time().getMinute())
//                        .collect(Collectors.toList());
            }
        }

        return engineerList.size() != 0 ? engineerResponseDtoList : null;
    }


//    @Override
//    public List<Engineer> getEngineerList() throws Exception {
//        List<Engineer> engineer = null;
//
//        engineer = engineerRepository.findEngineerListTest();
//
//        System.out.println(engineer);
//        return engineer;
//    }

    private Iterator<Integer> makeIteratorByEngineerCodeSet(List<Engineer> engineerList) {
        Set<Integer> engineerCodeSet = new HashSet<>();

        engineerList.forEach(engineer -> engineerCodeSet.add(engineer.getEngineer_code()));

        return  engineerCodeSet.iterator();
    }
    private ReadEngineerReservationResponseDto buildEngineerReservationDtoByEngineerCode(int engineerCode, List<Engineer> engineerList) {
        return ReadEngineerReservationResponseDto.builder()
                .engineerReservationInfoDtoList(
                        engineerList.stream()
                                .filter(engineer -> engineerCode == engineer.getEngineer_code())
                                .map(engineer -> engineer.toEngineerReservationInfoDto())
                                .collect(Collectors.toList())
                )
                .build();
    }

    private List<ReadEngineerInfoResponseDto> changeToReadEngineerInfoResponseDto(List<Engineer> engineerList) {
        return engineerList.stream()
                .map(engineer -> engineer.toReadEngineerInfoResponseDto())
                .collect(Collectors.toList());
    }
}