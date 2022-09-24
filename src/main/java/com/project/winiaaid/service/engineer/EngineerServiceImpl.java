package com.project.winiaaid.service.engineer;

import com.project.winiaaid.domain.engineer.Engineer;
import com.project.winiaaid.domain.engineer.EngineerRepository;
import com.project.winiaaid.web.dto.engineer.ReadEngineerInfoResponseDto;
import com.project.winiaaid.web.dto.engineer.ReadEngineerReservationInfoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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