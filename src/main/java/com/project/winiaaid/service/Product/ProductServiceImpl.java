package com.project.winiaaid.service.Product;

import com.project.winiaaid.domain.product.Product;
import com.project.winiaaid.domain.product.ProductRepository;
import com.project.winiaaid.web.dto.Product.ProductObjectResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductDetailResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
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

    @Override
    public List<? extends Object> getProductDetailInfoList(String type, int productCode) throws Exception {
        List<Product> productList = null;
        List<ReadProductDetailResponseDto> productInfoList = null;
        List<ProductObjectResponseDto> productObjectList = null;

        Map<String, Object> infoMap = new HashMap<>();

        infoMap.put("type", type);
        infoMap.put("code", productCode);

        productList = productRepository.findListToProductDetailInfo(infoMap);

        if(productList != null) {
            if(type.equals("default")){
                productInfoList = productList.stream()
                        .map(product -> product.toReadProductDetailResponseDto())
                        .collect(Collectors.toList());
            }else {
                productObjectList = new ArrayList<>();
                Set<Integer> codeSet = new HashSet<>();

                productList.forEach(product -> codeSet.add(product.getProduct_category_code()));

                Iterator<Integer> iterator = codeSet.iterator();

                while(iterator.hasNext()) {
                    int categoryCode = iterator.next();

                    ProductObjectResponseDto productObjectResponseDto = ProductObjectResponseDto.builder()
                                    .readProductDetailResponseDtoList(
                                            productList
                                                .stream()
                                                .filter(product -> product.getProduct_category_code() == categoryCode)
                                                .map(product -> product.toReadProductDetailResponseDto())
                                                .collect(Collectors.toList()))
                                    .build();

                    productObjectList.add(productObjectResponseDto);
                }
            }
        }

        return type.equals("default") ? productInfoList : productObjectList;
    }
}