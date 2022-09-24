package com.project.winiaaid.domain.product;

import com.project.winiaaid.web.dto.product.ProductDetailDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetail {
    private int product_code;
    private String product_detail_name;
    private String product_detail_image;

    private LocalDateTime create_date;
    private LocalDateTime update_date;

    public ProductDetailDto toProductDetailDto() {
        return ProductDetailDto.builder()
                .productCode(product_code)
                .productDetailName(product_detail_name)
                .productDetailImage(product_detail_image)
                .build();
    }
}