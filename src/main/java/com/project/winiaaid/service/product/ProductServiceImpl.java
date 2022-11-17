package com.project.winiaaid.service.product;

import com.project.winiaaid.domain.product.*;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.util.FileService;
import com.project.winiaaid.web.dto.product.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
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
    private final FileService fileService;

    @Override
    public List<ReadProductCategoryResponseDto> getProductMainCategoryList(String company) throws Exception {
        List<Product> productList = null;
        List<ReadProductCategoryResponseDto> productCategoryList = null;

        log.info(">>>>>>>>>>>>>>>>>>>>> getProductMainCategoryList <<<<<<<<<<<<<<<<<<<<<<");

        productList = productRepository.findListToProductMainCategory(setCompanyCode(company));

        if(productList != null && productList.size() != 0) {
            productCategoryList = changeToReadProductCategoryResponseDto(productList);
            setAWSS3Url(productCategoryList);

        }

        return productCategoryList;
    }

    private void setAWSS3Url(List<? extends Object> productList) throws Exception {
            if(productList.get(0).getClass() == ReadProductCategoryResponseDto.class) {
                for(Object productCategoryDto : productList) {
                    String awsS3FileUrl = fileService.getFilePathByAWS("winia-product/category-images/", ((ReadProductCategoryResponseDto) productCategoryDto).getProductMainCategoryImage());
                    ((ReadProductCategoryResponseDto) productCategoryDto).setProductMainCategoryImage(awsS3FileUrl);
                }

            }else if(productList.get(0).getClass() == ReadProductResponseDto.class) {
                    for(Object productEntity : productList) {
                        ReadProductResponseDto productDto = (ReadProductResponseDto) productEntity;

                        productDto.setProductMainImage(fileService.getFilePathByAWS("winia-product/images/", productDto.getProductMainImage()));

                        List<ProductDetailDto> productDetailDtoList = productDto.getProductDetailList();

                        for(ProductDetailDto productDetailDto : productDetailDtoList) {
                            productDetailDto.setProductDetailImage(fileService.getFilePathByAWS("winia-product/images/", productDetailDto.getProductDetailImage()));
                        }
                    }
            }else if(productList.get(0).getClass() == ReadModelNumberInfoResponseDto.class) {
                for(Object productEntity : productList) {

                    List<ModelNumberImageDto> modelNumberImageDtoList = ((ReadModelNumberInfoResponseDto) productEntity).getModelNumberImageDtoList();

                    for(ModelNumberImageDto modelNumberImageDto : modelNumberImageDtoList) {
                        modelNumberImageDto.setModelCategoryImageName(fileService.getFilePathByAWS("model-number-images/", modelNumberImageDto.getModelCategoryImageName()));
                    }
                }
            }
    }
    @Override
    public List<? extends Object> getProductDetailInfoList(String company, String type, int productCode) throws Exception {
        List<Product> productList = null;
        List<ReadProductResponseDto> readProductResponseDtoList = null;

        Map<String, Object> infoMap = setInfoMap(company, type, productCode);
        log.info(">>>>>>>>>>>>>>>>>>>>> getProductDetailInfoList <<<<<<<<<<<<<<<<<<<<<<");

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

            setAWSS3Url(readProductResponseDtoList);
        }

        return readProductResponseDtoList;
    }

    @Override
    public List<ReadModelNumberInfoResponseDto> getProductNumberInfoList() throws Exception {
        List<ModelNumberInfo> productNumberInfoList = null;
        List<ReadModelNumberInfoResponseDto> readModelNumberInfoResponseDtoList = null;

        productNumberInfoList = productRepository.findListToProductNumberInfo();
        log.info(">>>>>>>>>>>>>>>>>>>>> getProductNumberInfoList <<<<<<<<<<<<<<<<<<<<<<");

        if(productNumberInfoList != null && productNumberInfoList.size() != 0) {

            readModelNumberInfoResponseDtoList = productNumberInfoList.stream()
                    .map(ModelNumberInfo::toReadModelNumberInfoResponseDto)
                    .collect(Collectors.toList());

            setAWSS3Url(readModelNumberInfoResponseDtoList);
        }

        return readModelNumberInfoResponseDtoList;
    }


    @Override
    public List<ReadProductTroubleResponseDto> getProductTroubleInfoList(int categoryCode, String loadType) throws Exception {
        List<ReadProductTroubleResponseDto> productTroubleDtoList = null;
        List<ProductTrouble> productTroubleEntityList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadProductTroubleSymptomConfigMap(categoryCode, loadType);

        productTroubleEntityList = productRepository.findTroubleSymptomByProductCode(configMap);
        log.info(">>>>>>>>>>>>>>>>>>>>> getProductTroubleInfoList <<<<<<<<<<<<<<<<<<<<<<");

        if(productTroubleEntityList != null && productTroubleEntityList.size() != 0) {
            productTroubleDtoList = changeToReadProductTroubleResponseDto(productTroubleEntityList);
        }

        return productTroubleDtoList;
    }

    @Override
    public List<ReadProductModelResponseDto> getProductModelInfoList(int keyCode, String requestType, String modelNumber) throws Exception {
        List<ProductModel> modelEntityList = null;
        List<ReadProductModelResponseDto> modelDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadModelConfigMap(keyCode, requestType, modelNumber);
        log.info(">>>>>>>>>>>>>>>>>>>>> getProductModelInfoList <<<<<<<<<<<<<<<<<<<<<<");

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
               .map(ProductTrouble::toReadProductTroubleResponseDto)
               .collect(Collectors.toList());
    }

    private List<ReadProductCategoryResponseDto> changeToReadProductCategoryResponseDto(List<Product> productList)  {
        return productList.stream()
                .map(Product::toReadProductCategoryResponseDto)
                .collect(Collectors.toList());
    }



    private List<ReadProductModelResponseDto> changeToReadProductModelResponseDto(List<ProductModel> productModelList) {
        return productModelList.stream()
                .map(ProductModel::toReadProductModelResponseDto)
                .collect(Collectors.toList());
    }

}