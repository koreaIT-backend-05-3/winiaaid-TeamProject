package com.project.winiaaid.web.dto.product;

import com.project.winiaaid.web.dto.product.ModelNumberImageDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder
public class ReadModelNumberInfoResponseDto {
    private int modelCategoryCode;
    private String modelCategoryName;
    private String modelCategoryNumberInfo;
    private String modelCategoryNumberInfoDetail;
    private List<ModelNumberImageDto> modelNumberImageDtoList;
}