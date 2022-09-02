package com.project.winiaaid.service.Product;

import com.project.winiaaid.domain.product.Product;
import com.project.winiaaid.domain.product.ProductRepository;
import com.project.winiaaid.web.dto.Product.ReadProductCategoryResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ReadProductCategoryResponseDto> getProductMainCategoryList() throws Exception {
        List<Product> productList = null;
        List<ReadProductCategoryResponseDto> productCategoryList = null;

        productList = productRepository.findListToProductMainCategory();

        if(productList != null) {
            productCategoryList = productList.stream()
                    .map(product -> product.toReadProductCategoryResponseDto())
                    .collect(Collectors.toList());
        }

        return productCategoryList;
    }
}