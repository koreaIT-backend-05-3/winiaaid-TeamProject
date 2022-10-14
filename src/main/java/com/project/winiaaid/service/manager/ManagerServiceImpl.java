package com.project.winiaaid.service.manager;

import com.project.winiaaid.domain.manager.ManagerProduct;
import com.project.winiaaid.domain.manager.ManagerRepository;
import com.project.winiaaid.util.FileService;
import com.project.winiaaid.web.dto.manager.AddProductRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManagerServiceImpl implements ManagerService {

    private final ManagerRepository managerRepository;
    private final FileService fileService;

    @Override
    public boolean insertProduct(String registrationType, AddProductRequestDto addProductRequestDto) throws Exception {
        ManagerProduct productEntity = null;
        String tempFileName = null;
        boolean status = false;
        MultipartFile imageFile = addProductRequestDto.getProductImage();

        if(imageFile != null) {
            tempFileName = fileService.createFileByFileAndPath(imageFile, "winia-product/category-images");
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

            status = addProductRequestDto.isMainGroupFlag() ? insertNewMainGroupCategory(productEntity) : insertNewMainCategory(productEntity, imageFile);

        }

        return status;
    }

    private boolean insertNewMainGroupCategory(ManagerProduct productEntity) throws Exception {
        boolean status = false;
        int productGroupCode = managerRepository.findMaxProductGroupCode();
        productEntity.setProduct_group_code(productGroupCode);
        status = managerRepository.insertProductGroup(productEntity) > 0 ? managerRepository.insertMainCategoryProduct(productEntity) > 0 : false;
        return status;
    }

    private boolean insertNewMainCategory(ManagerProduct productEntity, MultipartFile imageFile) throws Exception {
        return managerRepository.insertProductGroup(productEntity) > 0 ? managerRepository.insertMainCategoryProduct(productEntity) > 0 : false;
    }

    private ManagerProduct changeToManagerProductEntity(AddProductRequestDto productDto, String tempFileName, String registrationType) {
        return productDto.toManagerProductEntity(tempFileName, registrationType);
    }
}