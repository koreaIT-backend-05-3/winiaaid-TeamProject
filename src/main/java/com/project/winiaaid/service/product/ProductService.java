package com.project.winiaaid.service.product;

import com.project.winiaaid.web.dto.product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductModelResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductNumberInfoResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductTroubleResponseDto;

import java.util.List;

public interface ProductService {
    public List<ReadProductCategoryResponseDto> getProductMainCategoryList(String company) throws Exception;
    public List<? extends Object> getProductDetailInfoList(String company, String type, int productCode) throws Exception;
    public List<ReadProductNumberInfoResponseDto> getProductNumberInfoList() throws Exception;
    public List<ReadProductTroubleResponseDto> getProductTroubleInfoList(int categoryCode) throws Exception;
    public List<ReadProductModelResponseDto> getProductModelInfoList(int productCode, String modelNumber) throws Exception;
}