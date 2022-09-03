package com.project.winiaaid.web.dto.Product;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class ReadProductDetailResponseDto {
    private String categoryName;
    private boolean integratedFlag;
    private int productCode;
    private String productName;
    private boolean isGroup;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}