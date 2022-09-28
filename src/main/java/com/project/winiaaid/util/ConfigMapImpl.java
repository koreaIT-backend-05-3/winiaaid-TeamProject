package com.project.winiaaid.util;

import com.project.winiaaid.domain.recall.RecallProductInfoEntity;
import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import com.project.winiaaid.web.dto.repair.ReadServiceRequestDto;
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

    @Override
    public Map<String, Object> setConfigMap(ReadBoardRequestDto readBoardRequestDto) {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("user_code", readBoardRequestDto.getUserCode());
        configMap.put("board_type_code", readBoardRequestDto.getBoardType().equals("complaint") ? 1 : readBoardRequestDto.getBoardType().equals("praise") ? 2 : 3);
        configMap.put("page", (readBoardRequestDto.getPage() - 1) * 10);

        return configMap;
    }

    @Override
    public Map<String, Object> setConfigMap(int userCode, ReadServiceRequestDto readServiceRequestDto) {
        Map<String, Object> configMap = new HashMap<>();
        String serviceType = readServiceRequestDto.getServiceType();

        configMap.put("limit", readServiceRequestDto.getRequestType().equals("pastRequest") ? 3 : 10);
        configMap.put("service_type_code", serviceType.equals("all") ? 0 : serviceType.equals("counsel") ? 1 : serviceType.equals("repair") ? 2 : 3);
        configMap.put("page", (readServiceRequestDto.getPage() - 1) * (Integer) configMap.get("limit"));
        configMap.put("user_code", userCode);

        return configMap;
    }

    @Override
    public Map<String, Object> setModelMap(int keyCode, String modelNumber) {
        Map<String, Object> modelMap = new HashMap<>();

        modelMap.put("key_code", keyCode);
        modelMap.put("model_number", modelNumber);

        return modelMap;
    }

    @Override
    public Map<String, Object> setConfigMap(ServiceInfo serviceInfo) {
        RecallProductInfoEntity recallProductInfoEntity = (RecallProductInfoEntity) serviceInfo.getProductInfoEntity();
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("model_code", recallProductInfoEntity.getModel_code());
        configMap.put("temp_service_code", recallProductInfoEntity.getTemp_service_code());

        return configMap;
    }

    private LocalDateTime createLocalDateTimeThreeMonthsAgo() {
        return LocalDateTime.of(LocalDateTime.now().getYear(), LocalDateTime.now().getMonthValue() - 3, LocalDateTime.now().getDayOfMonth(), LocalDateTime.now().getHour(), LocalDateTime.now().getMinute());
    }
}