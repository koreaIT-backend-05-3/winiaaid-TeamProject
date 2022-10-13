package com.project.winiaaid.service.manager;

import com.project.winiaaid.domain.manager.ManagerProduct;
import com.project.winiaaid.domain.manager.ManagerRepository;
import com.project.winiaaid.util.FileService;
import com.project.winiaaid.web.dto.manager.AddProductRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
            tempFileName = fileService.createFileByFileAndPath(imageFile, "winia-product/images");
        }

        productEntity = changeToManagerProductEntity(addProductRequestDto, tempFileName, registrationType);

        if(registrationType.equals("product-detail")) {
            status = managerRepository.insertProductDetail(productEntity) > 0;

        }else if(registrationType.equals("product-group")) {
            if(addProductRequestDto.getProductGroupCode() != 0) {
                status = managerRepository.insertProductGroup(productEntity) > 0;

            }else {


            }

        }else {


        }

        return status;
    }

    private ManagerProduct changeToManagerProductEntity(AddProductRequestDto productDto, String tempFileName, String registrationType) {
        return productDto.toManagerProductEntity(tempFileName, registrationType);
    }
}