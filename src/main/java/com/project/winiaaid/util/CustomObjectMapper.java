package com.project.winiaaid.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.winiaaid.handler.exception.CustomApiUriTypeException;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import com.project.winiaaid.web.dto.history.ReadServiceRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class CustomObjectMapper {
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ReadSolutionRequestDto createReadSolutionKeywordRequestDtoByObjectMapper(Map<String, Object> parameters) {
        try {
            return objectMapper.convertValue(parameters, ReadSolutionRequestDto.class);
        }catch(Exception e) {
            e.printStackTrace();
            throw new CustomApiUriTypeException("URI type ERROR");
        }
    }

    public ReadBoardRequestDto createReadBoardRequestDtoByObjectMapper(Map<String, Object> parameters) {
        try {
            return objectMapper.convertValue(parameters, ReadBoardRequestDto.class);
        }catch(Exception e) {
            e.printStackTrace();
            throw new CustomApiUriTypeException("URI type ERROR");
        }
    }

    public ReadServiceRequestDto createReadServiceRequestDtoByObjectMapper(Map<String, Object> parameters) {
        try {
            return objectMapper.convertValue(parameters, ReadServiceRequestDto.class);
        }catch(Exception e) {
            e.printStackTrace();
            throw new CustomApiUriTypeException("URI type ERROR");
        }
    }
}