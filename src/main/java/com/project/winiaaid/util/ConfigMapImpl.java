package com.project.winiaaid.util;

import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class ConfigMapImpl implements ConfigMap{

    @Override
    public Map<String, Object> setConfigMap(String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("company_code", company.equals("winia") ? 2 : 1);
        configMap.put("keyword", readSolutionKeywordRequestDto.getKeyword() != null ? readSolutionKeywordRequestDto.getKeyword() : null);
        configMap.put("solution_board_type", readSolutionKeywordRequestDto.getBoardType().equals("faq") ? 1 : 2);

        return configMap;
    }

    @Override
    public Map<String, Object> setConfigMap(int keyCode, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("keyCode", keyCode);
        configMap.put("keyword", readSolutionKeywordRequestDto.getKeyword() != null ? readSolutionKeywordRequestDto.getKeyword() : null);
        configMap.put("solution_board_type", readSolutionKeywordRequestDto.getBoardType().equals("faq") ? 1 : 2);
        configMap.put("solution_type_code", readSolutionKeywordRequestDto.getSolutionType());

        return configMap;
    }

    @Override
    public Map<String, Object> setConfigMap(int keyCode, String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("keyCode", keyCode);
        configMap.put("company_code", company.equals("winia")? 2 : 1);
        configMap.put("keyword", readSolutionKeywordRequestDto.getKeyword() != null ? readSolutionKeywordRequestDto.getKeyword() : null);
        configMap.put("solution_board_type", readSolutionKeywordRequestDto.getBoardType().equals("faq") ? 1 : 2);
        configMap.put("solution_type_code", readSolutionKeywordRequestDto.getSolutionType());

        return configMap;
    }
}