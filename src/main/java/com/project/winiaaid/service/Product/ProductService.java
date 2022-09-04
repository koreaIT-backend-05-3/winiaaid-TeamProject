package com.project.winiaaid.service.Product;

import com.project.winiaaid.web.dto.Product.ProductNumberInfoObjectResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductDetailResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductNumberInfoResponseDto;

import java.util.List;

public interface ProductService {
    public List<ReadProductCategoryResponseDto> getProductMainCategoryList() throws Exception;
    public List<? extends Object> getProductDetailInfoList(String type, int productCode) throws Exception;
    public List<ProductNumberInfoObjectResponseDto> getProductNumberInfoList() throws Exception;
}