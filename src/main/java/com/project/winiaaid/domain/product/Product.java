package com.project.winiaaid.domain.product;

import com.project.winiaaid.web.dto.Product.ReadProductCategoryResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
	private int product_category_code;
	private String product_category_name;
	private int integrated_flag;

	private int product_code;
	private String product_dtl_name;

	private LocalDateTime create_date;
	private LocalDateTime update_date;

	public ReadProductCategoryResponseDto toReadProductCategoryResponseDto() {
		return ReadProductCategoryResponseDto.builder()
				.categoryCode(product_category_code)
				.categoryName(product_category_name)
				.build();
	}
}