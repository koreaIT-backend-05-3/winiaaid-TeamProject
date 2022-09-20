package com.project.winiaaid.util;

import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;

import java.util.Map;

public interface ConfigMap {
    public Map<String, Object> setConfigMap(String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto);
    public Map<String, Object> setConfigMap(int keyCode, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto);
    public Map<String, Object> setConfigMap(int keyCode, String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto);
}