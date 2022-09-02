package com.project.winiaaid.web.dto.Product;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ProductObjectResponseDto {
    private List<ReadProductDetailResponseDto> readProductDetailResponseDtoList;
}