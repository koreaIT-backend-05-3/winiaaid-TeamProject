package com.project.winiaaid.service.product;

import com.project.winiaaid.domain.product.*;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductModelResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductTroubleResponseDto;
import com.project.winiaaid.web.dto.product.ReadModelNumberInfoResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ConfigMap configMapper;

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
        List<ReadProductResponseDto> readProductResponseDtoList = null;

        Map<String, Object> infoMap = setInfoMap(company, type, productCode);

        productList = productRepository.findListToProductDetailInfo(infoMap);

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

        productNumberInfoList = productRepository.findListToProductNumberInfo();

        if(productNumberInfoList != null && productNumberInfoList.size() != 0) {

            readModelNumberInfoResponseDtoList = productNumberInfoList.stream()
                    .map(ModelNumberInfo::toReadModelNumberInfoResponseDto)
                    .collect(Collectors.toList());
        }

        return readModelNumberInfoResponseDtoList;
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
    public List<ReadProductModelResponseDto> getProductModelInfoList(int keyCode, String modelNumber) throws Exception {
        List<ProductModel> modelEntityList = null;
        List<ReadProductModelResponseDto> modelDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setModelMap(keyCode, modelNumber);

        modelEntityList = productRepository.findModelNumberListByModelNumber(configMap);

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

    private Map<String, Object> setInfoMap(String company, String type, int productCode) throws Exception {
        Map<String, Object> infoMap = new HashMap<>();

        infoMap.put("company_code", setCompanyCode(company));
        infoMap.put("type", type);
        infoMap.put("code", productCode);

        return infoMap;
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



    private List<ReadProductModelResponseDto> changeToReadProductModelResponseDto(List<ProductModel> productModelList) {
        return productModelList.stream()
                .map(productModel -> productModel.toReadProductModelResponseDto())
                .collect(Collectors.toList());
    }

}