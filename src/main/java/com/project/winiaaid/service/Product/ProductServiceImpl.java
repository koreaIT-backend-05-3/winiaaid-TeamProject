package com.project.winiaaid.service.Product;

import com.project.winiaaid.domain.product.Product;
import com.project.winiaaid.domain.product.ProductNumberInfo;
import com.project.winiaaid.domain.product.ProductRepository;
import com.project.winiaaid.domain.product.ProductTrouble;
import com.project.winiaaid.web.dto.Product.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ReadProductCategoryResponseDto> getProductMainCategoryList(String company) throws Exception {
        List<Product> productList = null;
        List<ReadProductCategoryResponseDto> productCategoryList = null;

        productList = productRepository.findListToProductMainCategory(setCompanyCode(company));

        if(productList != null) {
            productCategoryList = changeToReadProductCategoryResponseDto(productList);
        }

        return productCategoryList;
    }

    @Override
    public List<? extends Object> getProductDetailInfoList(String company, String type, int productCode) throws Exception {
        List<Product> productList = null;
        List<ReadProductDetailResponseDto> productInfoList = null;
        List<ReadProductObjectResponseDto> productObjectList = null;
        ReadProductObjectResponseDto readProductObjectResponseDto = null;

        Map<String, Object> infoMap = setInfoMap(company, type, productCode);

        productList = productRepository.findListToProductDetailInfo(infoMap);

        if(productList != null) {
            if(type.equals("default") && productList.get(0).getProduct_code() != 0){
                productInfoList = changeToReadProductDetailResponseDto(productList);

            }else {
                productObjectList = new ArrayList<>();

                Iterator<Integer> iterator = makeIteratorBycodeSet(productList);

                while(iterator.hasNext()) {
                    int categoryCode = iterator.next();

                    ReadProductObjectResponseDto productObjectResponseDto = buildProductObjectDtoByCategoryCode(categoryCode, productList);

                    productObjectList.add(productObjectResponseDto);
                }
            }
        }

        return type.equals("default") ? productInfoList : productObjectList;
    }

    @Override
    public List<ReadProductNumberInfoResponseDto> getProductNumberInfoList() throws Exception {
        List<ProductNumberInfo> productNumberInfoList = null;
        List<ProductNumberInfoObjectDto> productNumberInfoObjectResponseDtoList = null;
        List<ReadProductNumberInfoResponseDto> readProductNumberInfoResponseDtoList = null;

        productNumberInfoList = productRepository.findListToProductNumberInfo();

        if(productNumberInfoList != null) {
            productNumberInfoObjectResponseDtoList = new ArrayList<>();
            readProductNumberInfoResponseDtoList = new ArrayList<>();

            Set<Integer> modelCodeSet = new HashSet<>();

            productNumberInfoList.forEach(product -> modelCodeSet.add(product.getModel_code()));

            Iterator<Integer> iterator = modelCodeSet.iterator();

            while(iterator.hasNext()) {
                int modelCode = iterator.next();

                ReadProductNumberInfoResponseDto productObjectResponseDto = ReadProductNumberInfoResponseDto.builder()
                        .productNumberInfoObjectDtoList(
                            productNumberInfoList
                                    .stream()
                                    .filter(productNumberInfo -> productNumberInfo.getModel_code() == modelCode)
                                    .map(productNumberInfo -> productNumberInfo.toProductNumberInfoObjectDtoDto())
                                    .collect(Collectors.toList()))
                        .build();

                readProductNumberInfoResponseDtoList.add(productObjectResponseDto);
            }

        }

        return readProductNumberInfoResponseDtoList;
    }

    @Override
    public List<ReadProductTroubleResponseDto> getProductTroubleInfoList(int categoryCode) throws Exception {
        List<ReadProductTroubleResponseDto> productTroubleDtoList = null;
        List<ProductTrouble> productTroubleEntityList = null;

        productTroubleEntityList = productRepository.findTroubleSymptomByProductCode(categoryCode);

        if(productTroubleEntityList != null) {
            productTroubleDtoList = changeToReadProductTroubleResponseDto(productTroubleEntityList);
        }

        return productTroubleDtoList;
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

    private List<ReadProductTroubleResponseDto> changeToReadProductTroubleResponseDto(List<ProductTrouble> productList) {
       return productList.stream()
               .map(product -> product.toReadProductTroubleResponseDto())
               .collect(Collectors.toList());
    }

    private List<ReadProductCategoryResponseDto> changeToReadProductCategoryResponseDto(List<Product> productList) {
        return productList.stream()
                .map(product -> product.toReadProductCategoryResponseDto())
                .collect(Collectors.toList());
    }

    private Map<String, Object> setInfoMap(String company, String type, int productCode) {
        Map<String, Object> infoMap = new HashMap<>();

        infoMap.put("company_code", setCompanyCode(company));
        infoMap.put("type", type);
        infoMap.put("code", productCode);

        return infoMap;
    }

    private List<ReadProductDetailResponseDto> changeToReadProductDetailResponseDto(List<Product> productList) {
        return productList.stream()
                .map(product -> product.toReadProductDetailResponseDto())
                .collect(Collectors.toList());
    }

    private Iterator<Integer> makeIteratorBycodeSet(List<Product> productList) {
        Set<Integer> codeSet = new HashSet<>();
        productList.forEach(product -> {
            if(product.getProduct_code() != 0 || (product.getIntegrated_flag() != 0 && product.getProduct_code() == 0)) {
                codeSet.add(product.getProduct_category_code());
            }
        });

        return codeSet.iterator();
    }

    private ReadProductObjectResponseDto buildProductObjectDtoByCategoryCode(int categoryCode, List<Product> productList) {
        return ReadProductObjectResponseDto.builder()
                .readProductDetailResponseDtoList(
                        productList
                                .stream()
                                .filter(product -> product.getProduct_category_code() == categoryCode)
                                .map(product -> product.toReadProductDetailResponseDto())
                                .collect(Collectors.toList()))
                .build();
    }
}