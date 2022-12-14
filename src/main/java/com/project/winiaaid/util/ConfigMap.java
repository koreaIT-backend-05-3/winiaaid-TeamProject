package com.project.winiaaid.util;

import com.project.winiaaid.domain.repair.RepairProductInfoEntity;
import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.web.dto.auth.AuthenticationUserRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import com.project.winiaaid.web.dto.history.ReadServiceRequestDto;
import com.project.winiaaid.web.dto.manager.product.DeleteProductRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionRequestDto;

import java.util.List;
import java.util.Map;

public interface ConfigMap {
    public Map<String, Object> setReadSolutionListByCompanyConfigMap(String company, String boardType, ReadSolutionRequestDto readSolutionRequestDto) throws Exception;
    public Map<String, Object> setReadSolutionListByKeyCodeConfigMap(String boardType, ReadSolutionRequestDto readSolutionRequestDto) throws Exception;
    public Map<String, Object> setReadSolutionTitleListConfigMap(String boardType, String productCode, boolean notInclude) throws Exception;

    public Map<String, Object> setMemberReadBoardConfigMap(ReadBoardRequestDto readBoardRequestDto) throws Exception;
    public Map<String, Object> setNonMemberReadBoardConfigMap(ReadBoardRequestDto readBoardRequestDto) throws Exception;

    public Map<String, Object> setCreateModelConfigMap(ServiceInfo serviceInfo) throws Exception;
    public Map<String, Object> setReadModelConfigMap(int keyCode, String requestType, String modelNumber) throws Exception;

    public Map<String, Object> setCreateRepairServiceConfigMap(RepairProductInfoEntity repairProductInfoEntity) throws Exception;
    public Map<String, Object> setReadRepairServiceHistoryDetailListAndPastAddressListConfigMap(int userCode, int page, String type) throws Exception;
    public Map<String, Object> setReadServiceHistoryListConfigMap(String serviceType, int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception;
    public Map<String, Object> setReadNonMemberServiceDetailHistoryConfigMap(String serviceCode, String userName) throws Exception;

    public Map<String, Object> setReadBoardDetailHistoryConfigMap(String viewType, String boardCode, ReadBoardRequestDto readBoardRequestDto) throws Exception;

    public Map<String, Object> setReadWritingServiceHistoryListConfigMap(String serviceType, int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception;

    public Map<String, Object> setReadUserInfoConfigMap(String requestType, AuthenticationUserRequestDto authenticationUserRequestDto) throws Exception;

    public Map<String, Object> setDeleteProductInfoConfigMap(String productType, int keyCode, DeleteProductRequestDto deleteProductRequestDto, List<String> productCategoryCodeList) throws Exception;

    public Map<String, Object> setReadProductTroubleSymptomConfigMap(int categoryCode, String loadType) throws Exception;

    public Map<String, Object> setReadServiceHistoryTitleListConfigMap(String serviceType, String progressStatus, int page) throws Exception;
}