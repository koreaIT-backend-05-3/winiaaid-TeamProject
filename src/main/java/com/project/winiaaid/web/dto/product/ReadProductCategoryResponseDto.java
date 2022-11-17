package com.project.winiaaid.web.dto.product;

import com.project.winiaaid.util.FileService;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@Builder
public class ReadProductCategoryResponseDto {
    private int productCategoryCode;
    private String productCategoryName;
    private boolean groupFlag;
    private int productGroupCode;
    private String productMainCategoryImage;
}