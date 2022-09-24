package com.project.winiaaid.util;

import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class ConfigMapImpl implements ConfigMap{

    @Override
    public Map<String, Object> setConfigMap(int solutionBoardCode, String solutionBoardType) {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("solution_board_code", solutionBoardCode);
        configMap.put("solution_board_type", solutionBoardType.equals("faq") ? 1 : 2);

        return configMap;
    }

    @Override
    public Map<String, Object> setConfigMap(String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("company_code", company.equals("winia") ? 2 : 1);
        configMap.put("keyword", readSolutionKeywordRequestDto.getKeyword() != null ? readSolutionKeywordRequestDto.getKeyword() : null);
        configMap.put("solution_board_type", readSolutionKeywordRequestDto.getBoardType().equals("faq") ? 1 : 2);
        configMap.put("sort_type", readSolutionKeywordRequestDto.getSortType());
        configMap.put("limit_date", createLocalDateTimeThreeMonthsAgo());

        return configMap;
    }

    @Override
    public Map<String, Object> setConfigMap(int keyCode, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("keyCode", keyCode);
        configMap.put("keyword", readSolutionKeywordRequestDto.getKeyword() != null ? readSolutionKeywordRequestDto.getKeyword() : null);
        configMap.put("solution_board_type", readSolutionKeywordRequestDto.getBoardType().equals("faq") ? 1 : 2);
        configMap.put("solution_type_code", readSolutionKeywordRequestDto.getSolutionType());
        configMap.put("sort_type", readSolutionKeywordRequestDto.getSortType());
        configMap.put("limit_date", createLocalDateTimeThreeMonthsAgo());

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
        configMap.put("sort_type", readSolutionKeywordRequestDto.getSortType());
        configMap.put("limit_date", createLocalDateTimeThreeMonthsAgo());

        return configMap;
    }

    private LocalDateTime createLocalDateTimeThreeMonthsAgo() {
        return LocalDateTime.of(LocalDateTime.now().getYear(), LocalDateTime.now().getMonthValue() - 3, LocalDateTime.now().getDayOfMonth(), LocalDateTime.now().getHour(), LocalDateTime.now().getMinute());
    }
}