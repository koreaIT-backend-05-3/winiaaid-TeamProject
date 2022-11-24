package com.project.winiaaid.service.manager;

import com.project.winiaaid.domain.board.Board;
import com.project.winiaaid.domain.board.BoardCode;
import com.project.winiaaid.domain.board.BoardRepository;
import com.project.winiaaid.domain.file.ProductImage;
import com.project.winiaaid.domain.manager.*;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.util.FileService;
import com.project.winiaaid.web.dto.manager.board.CreateBoardResponseRequestDto;
import com.project.winiaaid.web.dto.manager.board.UpdateBoardResponseRequestDto;
import com.project.winiaaid.web.dto.manager.board.UpdateBoardTypeRequestDto;
import com.project.winiaaid.web.dto.manager.product.AddProductRequestDto;
import com.project.winiaaid.web.dto.manager.product.DeleteProductRequestDto;
import com.project.winiaaid.web.dto.manager.service.ReadServiceHistoryTitleResponseManagerDto;
import com.project.winiaaid.web.dto.manager.solution.*;
import com.project.winiaaid.web.dto.manager.trouble.InsertTroubleSymptomOfProductRequestDto;
import com.project.winiaaid.web.dto.manager.product.UpdateProductRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManagerServiceImpl implements ManagerService {

    private final ManagerRepository managerRepository;
    private final BoardRepository boardRepository;
    private final FileService fileService;
    private final ConfigMap configMapper;

    @Override
    public boolean insertProduct(String registrationType, AddProductRequestDto addProductRequestDto) throws Exception {
        ManagerProduct productEntity = null;
        String tempFileName = null;
        boolean status = false;
        MultipartFile imageFile = addProductRequestDto.getProductImage();

        if(imageFile != null) {
            tempFileName = fileService.createFileByFileAndPath(imageFile, registrationType.equals("product-category") ? "winiaaid-images/winia-product/category-images/" : "winiaaid-images/winia-product/images/");
        }

        productEntity = changeToManagerProductEntity(addProductRequestDto, tempFileName.substring(tempFileName.lastIndexOf("/") + 1), registrationType);

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

//        checkIfTheImageHasChangedAndChangeIt(updateProductRequestDto, managerProduct);

        MultipartFile image = updateProductRequestDto.getProductImage();
        if(image != null) {
            boolean mainCategoryFlag = updateProductRequestDto.isMainCategoryFlag();
            tempFileName = fileService.createFileByFileAndPath(image, mainCategoryFlag ? "winiaaid-images/winia-product/category-images/" : "winiaaid-images/winia-product/images/");
            fileService.deleteFileByFileNameAndPath(updateProductRequestDto.getDeleteTempImageName(), mainCategoryFlag ? "winiaaid-images/winia-product/category-images/" : "winiaaid-images/winia-product/images/");
            managerProduct.setProduct_detail_image(tempFileName.substring(tempFileName.lastIndexOf("/") + 1));
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

        imageList.forEach(imageFile -> {
            String customPath = imageFile.getImage_flag() == 1 ? "winiaaid-images/winia-product/category-images/" : "winiaaid-images/winia-product/images/";

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









    @Override
    public boolean insertTroubleSymptomOfProduct(InsertTroubleSymptomOfProductRequestDto insertTroubleSymptomOfProductRequestDto) throws Exception {
        return managerRepository.insertTroubleSymptomOfProduct(insertTroubleSymptomOfProductRequestDto.toManagerProductEntity()) > 0;
    }

    @Override
    public boolean insertTroubleSymptom(String troubleSymptom) throws Exception {
        return managerRepository.insertTroubleSymptom(troubleSymptom) > 0;
    }

    @Override
    public boolean deleteTroubleSymptomOfProduct(List<Integer> troubleSymptomIdList) throws Exception {
        return managerRepository.deleteTroubleSymptomOfProduct(troubleSymptomIdList) > 0;
    }

    @Override
    public boolean deleteTroubleSymptomByTroubleSymptomCode(int troubleSymptomCode) throws Exception {
        return managerRepository.deleteTroubleSymptomByTroubleSymptomCode(troubleSymptomCode) > 0;
    }











    @Transactional
    @Override
    public boolean insertSolution(InsertSolutionRequestDto insertSolutionRequestDto) throws Exception {
        boolean status = false;
        ManagerSolution managerSolution = null;
        managerSolution = insertSolutionRequestDto.toManagerSolution();

        status = managerRepository.insertSolution(managerSolution) > 0;

        if(insertSolutionRequestDto.getFileList() != null) {
            if(!insertSolutionRequestDto.getFileList().isEmpty()) {
                status = insertSolutionFile(insertSolutionRequestDto.getTempFileNameList(), insertSolutionRequestDto.getFileList(), managerSolution);
            }
        }

        return status;
    }

    @Override
    public boolean insertProductSolution(InsertProductSolutionRequestDto insertProductSolutionRequestDto) throws Exception {
        return managerRepository.insertProductSolution(insertProductSolutionRequestDto.toManagerSolution()) > 0;
    }

    @Override
    public ReadSolutionDetailResponseDto getSolutionDetailBySolutionCode(int solutionCode) throws Exception {
        ManagerSolution solutionEntity = managerRepository.findSolutionDetailBySolutionCode(solutionCode);

        return solutionEntity == null ? null : solutionEntity.toReadSolutionDetailResponseDto();
    }

    @Transactional
    @Override
    public boolean modifySolutionDetailBySolutionCode(UpdateSolutionRequestDto updateSolutionRequestDto) throws Exception {
        boolean status = false;
        ManagerSolution managerSolution = null;
        managerSolution = updateSolutionRequestDto.toManagerSolution();

        status = managerRepository.updateSolution(managerSolution) > 0;

        if(updateSolutionRequestDto.getFileList() != null) {
            if(!updateSolutionRequestDto.getFileList().isEmpty()) {
                status = insertSolutionFile(updateSolutionRequestDto.getTempFileNameList(), updateSolutionRequestDto.getFileList(), managerSolution);
            }
        }

        if(updateSolutionRequestDto.getDeleteFileNameList() != null) {
            List<String> deletedFileNameList = updateSolutionRequestDto.getDeleteFileNameList();

            if(!deletedFileNameList.isEmpty()) {
                for (String fileName : deletedFileNameList) {
                    fileService.deleteFileByFileNameAndPath(fileName, "winiaaid-images/solution_files/");
                }

                status = managerRepository.deleteSolutionFile(updateSolutionRequestDto.getDeleteFileCodeList()) > 0;
            }
        }

        return status;
    }

    @Override
    public boolean deleteSolutionBySolutionCode(int solutionCode) throws Exception {
        List<String> fileNameList = null;

        fileNameList = managerRepository.findFileNameBySolutionCode(solutionCode);

        deleteFile(fileNameList);

        return managerRepository.deleteSolutionBySolutionCode(solutionCode) > 0;
    }

    @Override
    public boolean deleteSolutionBoardByCode(int solutionBoardCode) throws Exception {
        return managerRepository.deleteSolutionBoardByCode(solutionBoardCode) > 0;
    }









    @Override
    public boolean insertSolutionType(String solutionTypeName) throws Exception {
        return managerRepository.insertSolutionType(solutionTypeName) > 0;
    }

    @Override
    public boolean updateSolutionType(UpdateSolutionTypeRequestDto updateSolutionTypeRequestDto) throws Exception {
        return managerRepository.updateSolutionType(updateSolutionTypeRequestDto.toManagerSolution()) > 0;
    }

    @Override
    public boolean deleteSolutionType(int solutionTypeCode) throws Exception {
        boolean status = false;
        List<Integer> solutionBoardCodeList = null;
        if(managerRepository.deleteSolutionType(solutionTypeCode) > 0) {
            status = deleteSolutionBoard(solutionBoardCodeList, solutionTypeCode);
        }
        return status;
    }









    @Override
    public boolean insertBoardResponse(CreateBoardResponseRequestDto createBoardResponseRequestDto) throws Exception {
        return managerRepository.insertBoardResponse(createBoardResponseRequestDto.toManagerBoardEntity()) > 0;
    }

    @Override
    public boolean updateBoardResponse(UpdateBoardResponseRequestDto updateBoardResponseRequestDto) throws Exception {
        return managerRepository.updateBoardResponse(updateBoardResponseRequestDto.toManagerBoardEntity()) > 0;
    }

    @Override
    public String updateBoardType(UpdateBoardTypeRequestDto updateBoardType) throws Exception {
        ManagerBoard managerBoard = updateBoardType.toManagerBoardEntity();
        BoardCode boardCodeEntity = boardRepository.findBoardCode(buildBoardEntity(managerBoard));
        setManagerBoardEntity(managerBoard, boardCodeEntity);

        return managerRepository.updateBoardType(managerBoard) > 0 ? managerBoard.getNew_board_code() : null;
    }



    @Override
    public List<ReadServiceHistoryTitleResponseManagerDto> getServiceHistoryListByServiceTypeCode(String serviceType, String progressStatus, int page) throws Exception {
        Map<String, Object> configMap = configMapper.setReadServiceHistoryTitleListConfigMap(serviceType, progressStatus, page);
        return changeToReadServiceHistoryTitleResponseManagerDtoList(managerRepository.findServiceHistoryListByServiceTypeCode(configMap));
    }

    private boolean insertNewMainGroupCategory(ManagerProduct productEntity) throws Exception {
        boolean status = false;
        int productGroupCode = managerRepository.findMaxProductGroupCode();
        productEntity.setProduct_group_code(productGroupCode);
        status = managerRepository.insertProductGroup(productEntity) > 0 ? managerRepository.insertMainCategoryProduct(productEntity) > 0 : false;
        return status;
    }

    private boolean insertNewMainCategory(ManagerProduct productEntity) throws Exception {
        if(productEntity.isTop_category_flag()) {
            int productGroupCode = managerRepository.findMaxProductGroupCode();
            productEntity.setProduct_group_code(productGroupCode);

        }
        return managerRepository.insertProductGroup(productEntity) > 0 ? managerRepository.insertMainCategoryProduct(productEntity) > 0 : false;
    }

    private ManagerProduct changeToManagerProductEntity(AddProductRequestDto productDto, String tempFileName, String registrationType) throws Exception {
        return productDto.toManagerProductEntity(tempFileName, registrationType);
    }

    private boolean insertSolutionFile(List<String> tempFileNameList, List<MultipartFile> fileList, ManagerSolution managerSolution) throws Exception {
        try {
            fileService.createSolutionFileByFileAndPath(fileList, tempFileNameList, "winiaaid-images/solution_files/");
            managerSolution.setFile_name_list(tempFileNameList);
            fileService.deleteTempFolderByPath("winiaaid-images/temp_solution_files/");

            return managerRepository.insertSolutionFile(managerSolution) > 0;
        }catch (Exception e) {
            e.printStackTrace();
            deleteFileDueToInsertSolutionError(tempFileNameList);
            throw new Exception("Insert solution file failed");
        }
    }

    private void deleteFileDueToInsertSolutionError(List<String> fileNameList) throws IOException {
        for(String fileName : fileNameList) {
            fileService.deleteFileByFileNameAndPath(fileName, "winiaaid-images/solution_files/");
        }
    }

    private boolean deleteSolutionBoard(List<Integer> solutionBoardCodeList, int solutionTypeCode) throws Exception {
        solutionBoardCodeList = managerRepository.findAllSolutionBoardCodeInDeletedSolutionTypeCode(solutionTypeCode);
        managerRepository.disabledAllSolutionInDeletedSolutionTypeCode(solutionTypeCode);

        return solutionBoardCodeList.isEmpty() ? true : managerRepository.deleteSolutionBoardList(solutionBoardCodeList) > 0;
    }

    private void deleteFile(List<String> fileNameList) throws Exception {
        if(!fileNameList.isEmpty()) {
            for(String fileName : fileNameList) {
                fileService.deleteFileByFileNameAndPath(fileName, "winiaaid-images/solution_files/");
            }
        }
    }

    private Board buildBoardEntity(ManagerBoard managerBoard) throws Exception {
        return Board.builder()
                .temp_board_code(managerBoard.getTemp_board_code())
                .board_type_code(managerBoard.getBoard_type_code())
                .build();
    }

    private void setManagerBoardEntity(ManagerBoard managerBoardEntity, BoardCode boardCodeEntity) throws Exception {
        managerBoardEntity.setNew_board_code(boardCodeEntity.getBoard_code());
        managerBoardEntity.setId2(boardCodeEntity.getId2());
    }

    private List<ReadServiceHistoryTitleResponseManagerDto> changeToReadServiceHistoryTitleResponseManagerDtoList(List<ManagerServiceTitle> serviceTitleList) throws Exception {
        log.info("check: {}", serviceTitleList);
        return serviceTitleList.isEmpty() ? null :
                serviceTitleList.stream()
                        .map(ManagerServiceTitle::toReadSolutionDetailResponseDto)
                        .collect(Collectors.toList());
    }

//    private void checkIfTheImageHasChangedAndChangeIt(UpdateProductRequestDto updateProductRequestDto, ManagerProduct managerProduct) throws IOException {
//        String tempFileName = null;
//
//        MultipartFile image = updateProductRequestDto.getProductImage();
//        if(image != null) {
//            boolean mainCategoryFlag = updateProductRequestDto.isMainCategoryFlag();
//            tempFileName = fileService.createFileByFileAndPath(image, mainCategoryFlag ? "winia-product/category-images" : "winia-product/images");
//            fileService.deleteFileByFileNameAndPath(updateProductRequestDto.getDeleteTempImageName(), mainCategoryFlag ? "winia-product/category-images" : "winia-product/images");
//            managerProduct.setProduct_detail_image(tempFileName);
//        }
//    }
}