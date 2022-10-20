package com.project.winiaaid.service.manager;

import com.project.winiaaid.domain.file.ProductImage;
import com.project.winiaaid.domain.manager.ManagerProduct;
import com.project.winiaaid.domain.manager.ManagerRepository;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.util.FileService;
import com.project.winiaaid.web.dto.manager.AddProductRequestDto;
import com.project.winiaaid.web.dto.manager.DeleteProductRequestDto;
import com.project.winiaaid.web.dto.manager.UpdateProductRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManagerServiceImpl implements ManagerService {

    private final ManagerRepository managerRepository;
    private final FileService fileService;
    private final ConfigMap configMapper;

    @Override
    public boolean insertProduct(String registrationType, AddProductRequestDto addProductRequestDto) throws Exception {
        ManagerProduct productEntity = null;
        String tempFileName = null;
        boolean status = false;
        MultipartFile imageFile = addProductRequestDto.getProductImage();

        if(imageFile != null) {
            tempFileName = fileService.createFileByFileAndPath(imageFile, registrationType.equals("product-category") ? "winia-product/category-images" : "winia-product/images");
        }

        productEntity = changeToManagerProductEntity(addProductRequestDto, tempFileName, registrationType);

        if(registrationType.equals("product-detail")) {
            status = managerRepository.insertProductDetail(productEntity) > 0;

        }else if(registrationType.equals("product-group")) {
            if(addProductRequestDto.getProductGroupCode() != 0) {   // 기존 그룹에 추가로 그룹 생성
                status = managerRepository.insertProductGroup(productEntity) > 0;

            }else { // 새로운 그룹 코드 생성 후 기존 디테일 제품을 새로 만든 그룹으로 수정하고 새로운 그룹 생성
                int productGroupCode = managerRepository.findMaxProductGroupCode();
                productEntity.setProduct_group_code(productGroupCode);
                status = managerRepository.insertProductGroup(productEntity) > 0;
                status = managerRepository.updateDefaultProductToGroupProduct(productEntity) > 0;
            }

        }else {     // 카테고리 생성
            status = addProductRequestDto.isMainGroupFlag() ? insertNewMainGroupCategory(productEntity) : insertNewMainCategory(productEntity);

        }

        return status;
    }

    @Override
    public boolean updateProduct(int keyCode, UpdateProductRequestDto updateProductRequestDto) throws Exception {
        boolean status = false;
        ManagerProduct managerProduct = null;
        String tempFileName = null;

        managerProduct = updateProductRequestDto.toManagerProductEntity();
        managerProduct.setKey_code(keyCode);


        MultipartFile image = updateProductRequestDto.getProductImage();
        if(image != null) {
            boolean mainCategoryFlag = updateProductRequestDto.isMainCategoryFlag();
            tempFileName = fileService.createFileByFileAndPath(image, mainCategoryFlag ? "winia-product/category-images" : "winia-product/images");
            fileService.deleteFileByFileNameAndPath(updateProductRequestDto.getDeleteTempImageName(), mainCategoryFlag ? "winia-product/category-images" : "winia-product/images");
            managerProduct.setProduct_detail_image(tempFileName);
        }

        status = managerRepository.updateProductInfo(managerProduct) > 0;

        return status;
    }

    @Override
    public boolean deleteProduct(String productType, int keyCode, DeleteProductRequestDto deleteProductRequestDto) throws Exception {
        Map<String, Object> configMap = null;
        List<ProductImage> imageList = null;
        List<String> productCategoryCodeList = null;

        if(deleteProductRequestDto.isMainGroupFlag()) {
            productCategoryCodeList = managerRepository.findAllCategoryCodeToDelete(deleteProductRequestDto.getProductGroupCode());
        }

        configMap = configMapper.setDeleteProductInfoConfigMap(productType, keyCode, deleteProductRequestDto, productCategoryCodeList);
        imageList = managerRepository.findFileImageListToDelete(configMap);

        log.info(">>>>>>>>>>> configMap: {}", configMap);

        imageList.forEach(imageFile -> {
            String customPath = imageFile.getImage_flag() == 1 ? "winia-product/category-images" : "winia-product/images";

            if(imageFile.getProduct_image() != null) {
                try {
                    fileService.deleteFileByFileNameAndPath(imageFile.getProduct_image(), customPath);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        });

        return  managerRepository.deleteProductInfo(configMap) > 0;
    }

    private boolean insertNewMainGroupCategory(ManagerProduct productEntity) throws Exception {
        boolean status = false;
        int productGroupCode = managerRepository.findMaxProductGroupCode();
        productEntity.setProduct_group_code(productGroupCode);
        status = managerRepository.insertProductGroup(productEntity) > 0 ? managerRepository.insertMainCategoryProduct(productEntity) > 0 : false;
        return status;
    }

    private boolean insertNewMainCategory(ManagerProduct productEntity) throws Exception {
        if(!productEntity.isTop_category_flag()) {
            int productGroupCode = managerRepository.findMaxProductGroupCode();
            productEntity.setProduct_group_code(productGroupCode);

        }
        return managerRepository.insertProductGroup(productEntity) > 0 ? managerRepository.insertMainCategoryProduct(productEntity) > 0 : false;
    }

    private ManagerProduct changeToManagerProductEntity(AddProductRequestDto productDto, String tempFileName, String registrationType) throws Exception {
        return productDto.toManagerProductEntity(tempFileName, registrationType);
    }
}