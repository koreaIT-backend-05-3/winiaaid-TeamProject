package com.project.winiaaid.service.Product;

import com.project.winiaaid.web.dto.Product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductNumberInfoResponseDto;

import java.util.List;

public interface ProductService {
    public List<ReadProductCategoryResponseDto> getProductMainCategoryList(String company) throws Exception;
    public List<? extends Object> getProductDetailInfoList(String company, String type, int productCode) throws Exception;
    public List<ReadProductNumberInfoResponseDto> getProductNumberInfoList() throws Exception;
}