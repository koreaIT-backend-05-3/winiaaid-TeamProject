package com.project.winiaaid.domain.product;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductRepository {
    public List<Product> findListToProductMainCategory(int company_code) throws Exception;
    public List<Product> findListToProductDetailInfo(Map<String, Object> infoMap) throws Exception;
    public List<ModelNumberInfo> findListToProductNumberInfo() throws Exception;
    public List<ProductTrouble> findTroubleSymptomByProductCode(int category_code) throws Exception;
    public List<ProductModel> findModelNumberListByModelNumber(Map<String, Object> modelMap) throws Exception;
}