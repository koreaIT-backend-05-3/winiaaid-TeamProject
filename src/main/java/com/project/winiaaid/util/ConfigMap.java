package com.project.winiaaid.util;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import com.project.winiaaid.web.dto.repair.ReadServiceRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;

import java.util.Map;

public interface ConfigMap {
    public Map<String, Object> setReadSolutionDetailConfigMap(int solutionBoardCode, String solutionBoardType) throws Exception;
    public Map<String, Object> setReadSolutionListByCompanyConfigMap(String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception;
    public Map<String, Object> setReadSolutionListByKeyCodeConfigMap(int keyCode, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception;
    public Map<String, Object> setReadSolutionListByGroupCodeConfigMap(int keyCode, String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception;
    public Map<String, Object> setReadBoardConfigMap(int userCode, ReadBoardRequestDto readBoardRequestDto) throws Exception;
    public Map<String, Object> setReadHistoryConfigMap(int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception;
    public Map<String, Object> setReadModelConfigMap(int keyCode, String requestType, String modelNumber) throws Exception;
    public Map<String, Object> setCreateModelConfigMap(ServiceInfo serviceInfo) throws Exception;
    public Map<String, Object> setReadServiceHistoryTitleConfigMap(String serviceType, int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception;
}