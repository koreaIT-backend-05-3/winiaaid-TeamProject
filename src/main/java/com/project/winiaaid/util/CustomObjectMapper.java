package com.project.winiaaid.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.winiaaid.handler.exception.CustomApiUriTypeException;
import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class CustomObjectMapper {
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ReadSolutionKeywordRequestDto createReadSolutionKeywordRequestDtoByObjectMapper(Map<String, Object> parameters) {
        try {
            return objectMapper.convertValue(parameters, ReadSolutionKeywordRequestDto.class);
        }catch(Exception e) {
            e.printStackTrace();
            throw new CustomApiUriTypeException("URI type ERROR");
        }
    }

}