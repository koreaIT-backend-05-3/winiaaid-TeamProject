package com.project.winiaaid.util;

import com.project.winiaaid.domain.recall.RecallProductInfoEntity;
import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import com.project.winiaaid.web.dto.history.ReadServiceRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class ConfigMapImpl implements ConfigMap{

    @Override
    public Map<String, Object> setReadSolutionDetailConfigMap(int solutionBoardCode, String solutionBoardType) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("solution_board_code", solutionBoardCode);
        configMap.put("solution_board_type", solutionBoardType.equals("faq") ? 1 : 2);

        return configMap;
    }

    @Override
    public Map<String, Object> setReadSolutionListByCompanyConfigMap(String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("company_code", company.equals("winia") ? 2 : 1);
        configMap.put("keyword", readSolutionKeywordRequestDto.getKeyword() != null ? readSolutionKeywordRequestDto.getKeyword() : null);
        configMap.put("solution_board_type", readSolutionKeywordRequestDto.getBoardType().equals("faq") ? 1 : 2);
        configMap.put("sort_type", readSolutionKeywordRequestDto.getSortType());
        configMap.put("limit_date", createLocalDateTimeThreeMonthsAgo());

        return configMap;
    }

    @Override
    public Map<String, Object> setReadSolutionListByKeyCodeConfigMap(int keyCode, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception {
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
    public Map<String, Object> setReadSolutionListByGroupCodeConfigMap(int keyCode, String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception{
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
    public Map<String, Object> setReadBoardConfigMap(ReadBoardRequestDto readBoardRequestDto) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("user_code", readBoardRequestDto.getUserCode());
        configMap.put("board_type_code", readBoardRequestDto.getBoardType().equals("complaint") ? 1 : readBoardRequestDto.getBoardType().equals("praise") ? 2 : 3);
        configMap.put("search_type", readBoardRequestDto.getSearchType());
        configMap.put("keyword", readBoardRequestDto.getKeyword());
        configMap.put("page", (readBoardRequestDto.getPage() - 1) * 2);

        return configMap;
    }

    @Override
    public Map<String, Object> setReadHistoryListConfigMap(int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception {
        Map<String, Object> configMap = new HashMap<>();
        
        configMap.put("page", (readServiceRequestDto.getPage() - 1) * 10);
        configMap.put("user_code", userCode);

        return configMap;
    }

    @Override
    public Map<String, Object> setReadModelConfigMap(int keyCode, String requestType, String modelNumber) throws Exception {
        Map<String, Object> modelMap = new HashMap<>();

        modelMap.put("key_code", keyCode);
        modelMap.put("request_type", requestType);
        modelMap.put("model_number", modelNumber);

        return modelMap;
    }

    @Override
    public Map<String, Object> setCreateModelConfigMap(ServiceInfo serviceInfo) throws Exception {
        RecallProductInfoEntity recallProductInfoEntity = (RecallProductInfoEntity) serviceInfo.getProductInfoEntity();
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("model_code", recallProductInfoEntity.getModel_code());
        configMap.put("temp_service_code", recallProductInfoEntity.getTemp_service_code());

        return configMap;
    }

    @Override
    public Map<String, Object> setReadRepairServiceHistoryDetailHistoryConfigMap(String serviceCode, int userCode) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("non_member_flag", userCode == 0);
        configMap.put("user_code", userCode);
        configMap.put("service_code", serviceCode);

        return configMap;
    }

    @Override
    public Map<String, Object> setReadRepairServiceHistoryDetailListAndPastAddressListConfigMap(int userCode, int page, String type) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("user_code", userCode);
        configMap.put("non_member_flag", userCode == 0);

        if(type.equals("address")) {
            configMap.put("page", (page - 1) * 5);

        }else {
            configMap.put("page", (page - 1) * 3);

        }
        return configMap;
    }

    @Override
    public Map<String, Object> setReadServiceHistoryListConfigMap(String serviceType, int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("user_code", userCode);
        configMap.put("service_type_code", serviceType.equals("all") ? 0 : serviceType.equals("counsel") ? 1 : serviceType.equals("repair") ? 2 : 3);
        configMap.put("progress_status", readServiceRequestDto.getProgressStatus());
        configMap.put("page", (readServiceRequestDto.getPage() - 1) * 10);

        return configMap;
    }

    @Override
    public Map<String, Object> setReadWritingServiceHistoryListConfigMap(String serviceType, int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        log.info("readServiceRequestDto: {}", readServiceRequestDto);

        configMap.put("user_code", userCode);
        configMap.put("board_type_code", serviceType.equals("all") ? 0 : serviceType.equals("complaint") ? 1 : serviceType.equals("praise") ? 2 : 3);
        configMap.put("menu_type", (readServiceRequestDto.getMenuType()));
        configMap.put("completed_response", readServiceRequestDto.isCompletedResponse());
        configMap.put("keyword", readServiceRequestDto.getKeyword());
        configMap.put("page", (readServiceRequestDto.getPage() - 1) * 10);

        log.info("configMap: {}", configMap);

        return configMap;
    }

    private LocalDateTime createLocalDateTimeThreeMonthsAgo() {
        return LocalDateTime.of(LocalDateTime.now().getYear(), LocalDateTime.now().getMonthValue() - 3, LocalDateTime.now().getDayOfMonth(), LocalDateTime.now().getHour(), LocalDateTime.now().getMinute());
    }
}