package com.project.winiaaid.web.dto.manager.product;

import com.project.winiaaid.domain.manager.ManagerProduct;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdateProductRequestDto {
    private int productKeyCode;

    private String productDetailName;
    private String originalProductName;

    private boolean productGroupModifyFlag;

    private boolean mainCategoryFlag;
    private boolean productDetailUpdateFlag;

    private MultipartFile productImage;
    private int deleteImageCode;
    private String deleteTempImageName;

    public ManagerProduct toManagerProductEntity() {
        return ManagerProduct.builder()
                .product_key_code(productKeyCode)
                .product_detail_name(productDetailName)
                .original_product_name(originalProductName)
                .product_group_modify_flag(productGroupModifyFlag)
                .main_category_flag(mainCategoryFlag)
                .product_detail_update_flag(productDetailUpdateFlag)
                .build();
    }
}