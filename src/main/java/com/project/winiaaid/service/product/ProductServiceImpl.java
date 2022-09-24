package com.project.winiaaid.service.product;

import com.project.winiaaid.domain.product.*;
import com.project.winiaaid.web.dto.product.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ReadProductCategoryResponseDto> getProductMainCategoryList(String company) throws Exception {
        List<Product> productList = null;
        List<ReadProductCategoryResponseDto> productCategoryList = null;

        productList = productRepository.findListToProductMainCategory(setCompanyCode(company));

        if(productList != null && productList.size() != 0) {
            productCategoryList = changeToReadProductCategoryResponseDto(productList);
        }

        return productCategoryList;
    }

    @Override
    public List<? extends Object> getProductDetailInfoList(String company, String type, int productCode) throws Exception {
        List<Product> productList = null;
        List<ReadProductDetailResponseDto> productInfoList = null;
        List<ReadProductObjectResponseDto> productObjectList = null;

        Map<String, Object> infoMap = setInfoMap(company, type, productCode);

        productList = productRepository.findListToProductDetailInfo(infoMap);

        if(productList != null && productList.size() != 0) {
            if(type.equals("default")){
                productInfoList = changeToReadProductDetailResponseDto(productList);

                productInfoList = checkIntegratedProduct(productInfoList);

            }else {
                productObjectList = new ArrayList<>();

                Iterator<Integer> iterator = makeIteratorByCategoryCodeSet(productList);

                while(iterator.hasNext()) {
                    int categoryCode = iterator.next();

                    ReadProductObjectResponseDto productObjectResponseDto = buildProductObjectDtoByCategoryCode(categoryCode, productList);

                    productObjectResponseDto.setReadProductDetailResponseDtoList(
                            checkIntegratedProduct(productObjectResponseDto.getReadProductDetailResponseDtoList())
                    );


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

        if(productNumberInfoList != null && productNumberInfoList.size() != 0) {
            productNumberInfoObjectResponseDtoList = new ArrayList<>();
            readProductNumberInfoResponseDtoList = new ArrayList<>();

            Iterator<Integer> iterator = makeIteratorByModelCodeSet(productNumberInfoList);

            while(iterator.hasNext()) {
                int modelCode = iterator.next();

                ReadProductNumberInfoResponseDto productObjectResponseDto = buildProductNumberInfoDtoByModelCode(modelCode, productNumberInfoList);

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

        if(productTroubleEntityList != null && productTroubleEntityList.size() != 0) {
            productTroubleDtoList = changeToReadProductTroubleResponseDto(productTroubleEntityList);
        }

        return productTroubleDtoList;
    }

    @Override
    public List<ReadProductModelResponseDto> getProductModelInfoList(int productCode, String modelNumber) throws Exception {
        List<ProductModel> modelEntityList = null;
        List<ReadProductModelResponseDto> modelDtoList = null;
        Map<String, Object> modelMap = new HashMap<>();

        modelMap.put("product_code", productCode);
        modelMap.put("model_number", modelNumber);

        modelEntityList = productRepository.findModelNumberListByModelNumber(modelMap);

        if(modelEntityList != null && modelEntityList.size() != 0) {
            modelDtoList = changeToReadProductModelResponseDto(modelEntityList);
        }

        return modelDtoList;
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

    private List<ReadProductDetailResponseDto> changeToReadProductDetailResponseDto(List<Product> productList) {
        return productList.stream()
                .map(product -> product.toReadProductDetailResponseDto())
                .collect(Collectors.toList());
    }

    private Iterator<Integer> makeIteratorByCategoryCodeSet(List<Product> productList) {
        Set<Integer> codeSet = new HashSet<>();
        productList.forEach(product -> {
                codeSet.add(product.getProduct_category_code());
        });

        return codeSet.iterator();
    }

    private Iterator<Integer> makeIteratorByModelCodeSet(List<ProductNumberInfo> productList) {
        Set<Integer> modelCodeSet = new HashSet<>();

        productList.forEach(product -> modelCodeSet.add(product.getModel_category_code()));

        return modelCodeSet.iterator();
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

    private ReadProductNumberInfoResponseDto buildProductNumberInfoDtoByModelCode(int modelCode, List<ProductNumberInfo> productList) {
        return ReadProductNumberInfoResponseDto.builder()
                .productNumberInfoObjectDtoList(
                        productList
                                .stream()
                                .filter(productNumberInfo -> productNumberInfo.getModel_category_code() == modelCode)
                                .map(productNumberInfo -> productNumberInfo.toProductNumberInfoObjectDtoDto())
                                .collect(Collectors.toList()))
                .build();
    }

    private List<ReadProductModelResponseDto> changeToReadProductModelResponseDto(List<ProductModel> productModelList) {
        return productModelList.stream()
                .map(productModel -> productModel.toReadProductModelResponseDto())
                .collect(Collectors.toList());
    }

    private List<ReadProductDetailResponseDto> checkIntegratedProduct(List<ReadProductDetailResponseDto> productList) {
        if(productList.size() != 1) {
            productList = productList.stream()
                    .filter(product -> !product.getProductCategoryName().equals(product.getProductName()))
                    .collect(Collectors.toList());
        }
        return productList;
    }
}