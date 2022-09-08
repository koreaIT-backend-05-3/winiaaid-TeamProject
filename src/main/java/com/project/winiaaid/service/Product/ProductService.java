package com.project.winiaaid.service.Product;

import com.project.winiaaid.web.dto.Product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductModelResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductNumberInfoResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductTroubleResponseDto;

import java.util.List;
import java.util.Map;

public interface ProductService {
    public List<ReadProductCategoryResponseDto> getProductMainCategoryList(String company) throws Exception;
    public List<? extends Object> getProductDetailInfoList(String company, String type, int productCode) throws Exception;
    public List<ReadProductNumberInfoResponseDto> getProductNumberInfoList() throws Exception;
    public List<ReadProductTroubleResponseDto> getProductTroubleInfoList(int categoryCode) throws Exception;
    public List<ReadProductModelResponseDto> getProductModelInfoList(int productCode, String modelNumber) throws Exception;
}