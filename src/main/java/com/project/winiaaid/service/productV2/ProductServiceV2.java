package com.project.winiaaid.service.productV2;

import com.project.winiaaid.web.dto.productV2.ReadModelNumberInfoResponseDto;
import com.project.winiaaid.web.dto.productV2.ReadProductResponseDto;

import java.util.List;

public interface ProductServiceV2 {
    public List<? extends Object> getProductDetailInfoList(String company, String type, int productCode) throws Exception;
    public List<ReadModelNumberInfoResponseDto> getProductNumberInfoList() throws Exception;
}