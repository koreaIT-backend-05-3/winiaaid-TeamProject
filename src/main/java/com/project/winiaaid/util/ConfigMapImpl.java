package com.project.winiaaid.util;

import com.project.winiaaid.domain.recall.RecallProductInfoEntity;
import com.project.winiaaid.domain.repair.RepairProductInfoEntity;
import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.web.dto.auth.AuthenticationUserRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import com.project.winiaaid.web.dto.history.ReadServiceRequestDto;
import com.project.winiaaid.web.dto.manager.product.DeleteProductRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class ConfigMapImpl implements ConfigMap{

    @Override
    public Map<String, Object> setCreateRepairServiceConfigMap(RepairProductInfoEntity repairProductInfoEntity) throws Exception {
        Map<String, Object> configMap = new HashMap<>();
        configMap.put("temp_service_code", repairProductInfoEntity.getTemp_service_code());
        configMap.put("product_code", repairProductInfoEntity.getProduct_code());

        return configMap;
    }



    @Override
    public Map<String, Object> setReadSolutionListByCompanyConfigMap(String company, String boardType, ReadSolutionRequestDto readSolutionRequestDto) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("company_code", company.equals("winia") ? 2 : 1);
        configMap.put("keyword", readSolutionRequestDto.getKeyword() != null ? readSolutionRequestDto.getKeyword() : null);
        configMap.put("solution_board_type", boardType.equals("faq") ? 1 : 2);
        configMap.put("sort_type", readSolutionRequestDto.getSortType());
        configMap.put("limit_date", createLocalDateTimeThreeMonthsAgo());
        configMap.put("page", (readSolutionRequestDto.getPage() - 1) * 3);

        return configMap;
    }

    @Override
    public Map<String, Object> setReadSolutionListByKeyCodeConfigMap(String boardType, ReadSolutionRequestDto readSolutionRequestDto) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("key_code", readSolutionRequestDto.getKeyCode());
        configMap.put("company_code", readSolutionRequestDto.getCompany().equals("winia") ? 2 : 1);
        configMap.put("keyword", readSolutionRequestDto.getKeyword() != null ? readSolutionRequestDto.getKeyword() : null);
        configMap.put("solution_board_type", boardType.equals("faq") ? 1 : 2);
        configMap.put("code_type", readSolutionRequestDto.getCodeType());
        configMap.put("solution_type_code", readSolutionRequestDto.getSolutionType());
        configMap.put("sort_type", readSolutionRequestDto.getSortType());
        configMap.put("limit_date", createLocalDateTimeThreeMonthsAgo());
        configMap.put("page", (readSolutionRequestDto.getPage() - 1) * 3);

        return configMap;
    }

    @Override
    public Map<String, Object> setReadSolutionTitleListConfigMap(String boardType, String productCode, boolean notInclude) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("solution_board_type", boardType.equals("all") ? "all" : boardType.equals("faq") ? "1" : "2");
        configMap.put("product_code", productCode);
        configMap.put("not_include", notInclude);

        return configMap;
    }

    @Override
    public Map<String, Object> setMemberReadBoardConfigMap(ReadBoardRequestDto readBoardRequestDto) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("user_code", readBoardRequestDto.getUserCode());
        configMap.put("board_type_code", readBoardRequestDto.getBoardType().equals("complaint") ? 1 : readBoardRequestDto.getBoardType().equals("praise") ? 2 : 3);
        configMap.put("search_type", readBoardRequestDto.getSearchType());
        configMap.put("keyword", readBoardRequestDto.getKeyword());
        configMap.put("page", (readBoardRequestDto.getPage() - 1) * 5);
        configMap.put("admin_flag", readBoardRequestDto.isAdminFlag());

        return configMap;
    }

    @Override
    public Map<String, Object> setNonMemberReadBoardConfigMap(ReadBoardRequestDto readBoardRequestDto) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("authentication_number", readBoardRequestDto.getAuthenticationNumber());
        configMap.put("user_name", readBoardRequestDto.getUserName());
        configMap.put("main_phone_number", readBoardRequestDto.getMainPhoneNumber());
        configMap.put("search_type", readBoardRequestDto.getSearchType());
        configMap.put("keyword", readBoardRequestDto.getKeyword());
        configMap.put("page", (readBoardRequestDto.getPage() - 1) * 5);

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
    public Map<String, Object> setReadServiceDetailHistoryConfigMap(String serviceCode, int userCode, String userName) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("non_member_flag", userCode == 0);
        configMap.put("user_code", userCode);
        configMap.put("service_code", serviceCode);
        configMap.put("user_name", userName);

        return configMap;
    }

    @Override
    public Map<String, Object> setReadNonMemberServiceDetailHistoryConfigMap(String serviceCode, String userName) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("service_code", serviceCode);
        configMap.put("user_name", userName);

        return configMap;
    }

    @Override
    public Map<String, Object> setReadBoardDetailHistoryConfigMap(String viewType, String boardCode, ReadBoardRequestDto readBoardRequestDto) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("modify_flag", viewType.equals("modification"));
        configMap.put("non_member_flag", readBoardRequestDto.getUserCode() == 0);

        configMap.put("authentication_number", readBoardRequestDto.getAuthenticationNumber());
        configMap.put("main_phone_number", readBoardRequestDto.getMainPhoneNumber());
        configMap.put("user_name", readBoardRequestDto.getUserName());

        configMap.put("user_code", readBoardRequestDto.getUserCode());

        configMap.put("board_code", boardCode);
        configMap.put("board_type_code", readBoardRequestDto.getBoardType().equals("complaint") ? 1 : readBoardRequestDto.getBoardType().equals("praise") ? 2 : 3);

        configMap.put("admin_flag", readBoardRequestDto.isAdminFlag());

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

    @Override
    public Map<String, Object> setReadUserInfoConfigMap(String requestType, AuthenticationUserRequestDto authenticationUserRequestDto) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("request_type", requestType);
        configMap.put("user_id",authenticationUserRequestDto.getUserId());
        configMap.put("main_phone_number", authenticationUserRequestDto.getMainPhoneNumber());

        return configMap;
    }

    @Override
    public Map<String, Object> setDeleteProductInfoConfigMap(String productType, int keyCode, DeleteProductRequestDto deleteProductRequestDto, List<String> productCategoryCodeList) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("product_type", productType);
        configMap.put("key_code", keyCode);
        configMap.put("main_group_flag", deleteProductRequestDto.isMainGroupFlag());
        configMap.put("product_group_code", deleteProductRequestDto.getProductGroupCode());
        configMap.put("product_category_code_list", productCategoryCodeList);

        return configMap;
    }

    @Override
    public Map<String, Object> setReadProductTroubleSymptomConfigMap(int categoryCode, String loadType) throws Exception {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("load_type", loadType);
        configMap.put("category_code",categoryCode);

        return configMap;
    }

    private LocalDateTime createLocalDateTimeThreeMonthsAgo() {
        return LocalDateTime.of(LocalDateTime.now().getYear(), LocalDateTime.now().getMonthValue() - 3, LocalDateTime.now().getDayOfMonth(), LocalDateTime.now().getHour(), LocalDateTime.now().getMinute());
    }
}