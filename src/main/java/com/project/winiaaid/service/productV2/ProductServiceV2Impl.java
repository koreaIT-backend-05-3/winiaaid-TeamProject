package com.project.winiaaid.service.productV2;

import com.project.winiaaid.domain.productV2.ModelNumberInfo;
import com.project.winiaaid.domain.productV2.Product;
import com.project.winiaaid.domain.productV2.ProductDetail;
import com.project.winiaaid.domain.productV2.ProductRepositoryV2;
import com.project.winiaaid.web.dto.productV2.ProductDetailDto;
import com.project.winiaaid.web.dto.productV2.ReadModelNumberInfoResponseDto;
import com.project.winiaaid.web.dto.productV2.ReadProductResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceV2Impl implements ProductServiceV2 {

    private final ProductRepositoryV2 productRepositoryV2;

    @Override
    public List<? extends Object> getProductDetailInfoList(String company, String type, int productCode) throws Exception {
        List<Product> productList = null;
        List<ReadProductResponseDto> readProductResponseDtoList = null;

        Map<String, Object> infoMap = setInfoMap(company, type, productCode);

        productList = productRepositoryV2.findListToProductDetailInfo(infoMap);

        if(productList != null && productList.size() != 0) {
            readProductResponseDtoList = productList.stream()
                    .map(Product::toReadProductResponseDto)
                    .collect(Collectors.toList());

            readProductResponseDtoList.stream()
                    .forEach(product -> {
                        if(product.getProductDetailList().size() != 1) {
                            product.getProductDetailList().removeIf(productDetail -> productDetail.getProductDetailName().equals(product.getProductCategoryName()));
                            };
                    });

        }

        return readProductResponseDtoList;
    }

    @Override
    public List<ReadModelNumberInfoResponseDto> getProductNumberInfoList() throws Exception {
        List<ModelNumberInfo> productNumberInfoList = null;
        List<ReadModelNumberInfoResponseDto> readModelNumberInfoResponseDtoList = null;

        productNumberInfoList = productRepositoryV2.findListToProductNumberInfo();

        if(productNumberInfoList != null && productNumberInfoList.size() != 0) {

            readModelNumberInfoResponseDtoList = productNumberInfoList.stream()
                        .map(ModelNumberInfo::toReadModelNumberInfoResponseDto)
                        .collect(Collectors.toList());
        }

        return readModelNumberInfoResponseDtoList;
    }

    private int setCompanyCode(String company) {
        int companyCode = 0;
        if(company.equals("daewoo")) {
            companyCode = 1;
        }else if(company.equals("winia")) {
            companyCode = 2;
        }
        return companyCode;
    }

    private Map<String, Object> setInfoMap(String company, String type, int productCode) throws Exception {
        if(type.equals("default") || type.equals("group")) {
            Map<String, Object> infoMap = new HashMap<>();

            infoMap.put("company_code", setCompanyCode(company));
            infoMap.put("type", type);
            infoMap.put("code", productCode);

            return infoMap;
        }else {
            throw new Exception("URI ADDRESS ERROR");
        }
    }

//    private List<ReadProductDetailResponseDto> changeToReadProductDetailResponseDto(List<Product> productList) {
//        return productList.stream()
//                .map(product -> product.toReadProductDetailResponseDto())
//                .collect(Collectors.toList());
//    }
//
//    private Iterator<Integer> makeIteratorByCategoryCodeSet(List<Product> productList) {
//        Set<Integer> codeSet = new HashSet<>();
//        productList.forEach(product -> {
//                codeSet.add(product.getProduct_category_code());
//        });
//
//        return codeSet.iterator();
//    }
//
//    private Iterator<Integer> makeIteratorByModelCodeSet(List<ProductNumberInfo> productList) {
//        Set<Integer> modelCodeSet = new HashSet<>();
//
//        productList.forEach(product -> modelCodeSet.add(product.getModel_category_code()));
//
//        return modelCodeSet.iterator();
//    }
//
//    private ReadProductObjectResponseDto buildProductObjectDtoByCategoryCode(int categoryCode, List<Product> productList) {
//        return ReadProductObjectResponseDto.builder()
//                .readProductDetailResponseDtoList(
//                        productList
//                                .stream()
//                                .filter(product -> product.getProduct_category_code() == categoryCode)
//                                .map(product -> product.toReadProductDetailResponseDto())
//                                .collect(Collectors.toList()))
//                .build();
//    }
//
//    private ReadProductNumberInfoResponseDto buildProductNumberInfoDtoByModelCode(int modelCode, List<ProductNumberInfo> productList) {
//        return ReadProductNumberInfoResponseDto.builder()
//                .productNumberInfoObjectDtoList(
//                        productList
//                                .stream()
//                                .filter(productNumberInfo -> productNumberInfo.getModel_category_code() == modelCode)
//                                .map(productNumberInfo -> productNumberInfo.toProductNumberInfoObjectDtoDto())
//                                .collect(Collectors.toList()))
//                .build();
//    }
//
//    private List<ReadProductDetailResponseDto> checkIntegratedProduct(List<ReadProductDetailResponseDto> productList) {
//        if(productList.size() != 1) {
//            productList = productList.stream()
//                    .filter(product -> !product.getProductCategoryName().equals(product.getProductName()))
//                    .collect(Collectors.toList());
//        }
//        return productList;
//    }
}