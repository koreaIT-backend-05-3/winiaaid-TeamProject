package com.project.winiaaid.domain.manager;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ManagerRepository {
    public int insertProductDetail(ManagerProduct product) throws Exception;
    public int insertProductGroup(ManagerProduct product) throws Exception;
}