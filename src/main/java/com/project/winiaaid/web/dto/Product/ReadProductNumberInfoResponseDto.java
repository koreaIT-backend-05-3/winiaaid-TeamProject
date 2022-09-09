package com.project.winiaaid.web.dto.product;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ReadProductNumberInfoResponseDto {
    private List<ProductNumberInfoObjectDto> productNumberInfoObjectDtoList;
}