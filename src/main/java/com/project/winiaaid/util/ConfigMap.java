package com.project.winiaaid.util;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import com.project.winiaaid.web.dto.repair.ReadServiceRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;

import java.util.Map;

public interface ConfigMap {
    public Map<String, Object> setConfigMap(int solutionBoardCode, String solutionBoardType);
    public Map<String, Object> setConfigMap(String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto);
    public Map<String, Object> setConfigMap(int keyCode, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto);
    public Map<String, Object> setConfigMap(int keyCode, String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto);
    public Map<String, Object> setConfigMap(ReadBoardRequestDto readBoardRequestDto);
    public Map<String, Object> setConfigMap(int userCode, ReadServiceRequestDto readServiceRequestDto);
    public Map<String, Object> setModelMap(int keyCode, String modelNumber);
    public Map<String, Object> setConfigMap(ServiceInfo serviceInfo);
}