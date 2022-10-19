package com.project.winiaaid.domain.manager;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ManagerRepository {
    public int insertProductDetail(ManagerProduct product) throws Exception;
    public int insertProductGroup(ManagerProduct product) throws Exception;
    public int insertMainCategoryProduct(ManagerProduct product) throws Exception;
    public int findMaxProductGroupCode()throws Exception;
    public int updateDefaultProductToGroupProduct(ManagerProduct product) throws Exception;
    public int updateProductInfo(ManagerProduct product) throws Exception;
}