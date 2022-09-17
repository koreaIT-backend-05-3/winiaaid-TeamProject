package com.project.winiaaid.domain.productV2;

import com.project.winiaaid.domain.product.ProductNumberInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductRepositoryV2 {
    public List<Product> findListToProductDetailInfo(Map<String, Object> infoMap) throws Exception;
    public List<ModelNumberInfo> findListToProductNumberInfo() throws Exception;
}