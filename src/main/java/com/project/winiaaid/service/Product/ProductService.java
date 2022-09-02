package com.project.winiaaid.service.Product;

import com.project.winiaaid.web.dto.Product.ReadProductCategoryResponseDto;

import java.util.List;

public interface ProductService {
    public List<ReadProductCategoryResponseDto> getProductMainCategoryList () throws Exception;
}