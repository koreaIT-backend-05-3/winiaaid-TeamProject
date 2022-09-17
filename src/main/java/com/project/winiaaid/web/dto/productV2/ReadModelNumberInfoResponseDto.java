package com.project.winiaaid.web.dto.productV2;

import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder
public class ReadModelNumberInfoResponseDto {
    private int modelCategoryCode;
    private String modelCategoryName;
    private String modelNumberCategoryInfo;
    private String modelCategoryNumberInfoDetail;
    private List<ModelNumberImageDto> modelNumberImageDtoList;
}