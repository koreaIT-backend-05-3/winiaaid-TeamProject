package com.project.winiaaid.web.dto.product;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ReadProductObjectResponseDto {
    private List<ReadProductDetailResponseDto> readProductDetailResponseDtoList;
}