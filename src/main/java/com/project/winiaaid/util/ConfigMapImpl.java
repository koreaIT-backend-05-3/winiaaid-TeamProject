package com.project.winiaaid.util;

import java.util.HashMap;
import java.util.Map;

public class ConfigMapImpl implements ConfigMap{

    @Override
    public Map<String, Object> setConfigMap(Object company, String boardType) {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("company_code", company.equals("winia") ? 2 : 1);
        configMap.put("solution_board_type", boardType.equals("faq") ? 1 : 2);

        return configMap;
    }

    @Override
    public Map<String, Object> setConfigMap(int keyCode, String boardType, int solutionType) {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("keyCode", keyCode);
        configMap.put("solution_board_type", boardType.equals("faq") ? 1 : 2);
        configMap.put("solution_type_code", solutionType);

        return configMap;
    }
}