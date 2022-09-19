package com.project.winiaaid.util;

import java.util.Map;

public interface ConfigMap {
    public Map<String, Object> setConfigMap(Object key, String boardType);
    public Map<String, Object> setConfigMap(Object key, String boardType, int solutionType);
}