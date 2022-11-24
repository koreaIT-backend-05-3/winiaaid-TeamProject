package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.manager.ManagerService;
import com.project.winiaaid.util.FileService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.manager.board.CreateBoardResponseRequestDto;
import com.project.winiaaid.web.dto.manager.board.UpdateBoardResponseRequestDto;
import com.project.winiaaid.web.dto.manager.board.UpdateBoardTypeRequestDto;
import com.project.winiaaid.web.dto.manager.product.AddProductRequestDto;
import com.project.winiaaid.web.dto.manager.product.DeleteProductRequestDto;
import com.project.winiaaid.web.dto.manager.product.UpdateProductRequestDto;
import com.project.winiaaid.web.dto.manager.service.ReadServiceHistoryTitleResponseManagerDto;
import com.project.winiaaid.web.dto.manager.solution.*;
import com.project.winiaaid.web.dto.manager.trouble.InsertTroubleSymptomOfProductRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionTitleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/manager")
@RequiredArgsConstructor
public class ManagerRestController {

    private final ManagerService managerService;
    private final FileService fileService;

    @Value("${file.path}")
    private String filePath;

    @Log
    @PostMapping("/{registrationType}")
    public ResponseEntity<?> addProductDetail(@PathVariable String registrationType, AddProductRequestDto addProductRequestDto) {
        boolean status = false;

        try {
            status = managerService.insertProduct(registrationType, addProductRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to register new product", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "New Product Registration Successful", status));
    }

    @Log
    @PutMapping("/product/{keyCode}")
    public ResponseEntity<?> modifyProductInformation(@PathVariable int keyCode, UpdateProductRequestDto updateProductRequestDto) {
        boolean status = false;

        try {
            status = managerService.updateProduct(keyCode, updateProductRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Product update failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Product update successful", status));

    }

    @Log
    @DeleteMapping("/product/{productType}/{keyCode}")
    public ResponseEntity<?> deleteProductInformation(@PathVariable String productType, @PathVariable int keyCode, @RequestBody DeleteProductRequestDto deleteProductRequestDto) {
        boolean status = false;

        try {
            status = managerService.deleteProduct(productType, keyCode, deleteProductRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Product update failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Product update successful", status));

    }






    @Log
    @CacheEvict(value = "trouble", allEntries = true)
    @PostMapping("/trouble-symptom")
    public ResponseEntity<?> addTroubleSymptom(@RequestBody Map<Object, String> troubleSymptomMap) {
        boolean status = false;

        try {
            status = managerService.insertTroubleSymptom(troubleSymptomMap.get("troubleSymptom"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to add trouble symptom", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Add trouble symptom successfully", status));
    }

    @Log
    @CacheEvict(value = "trouble", allEntries = true)
    @PostMapping("/product-category/trouble-symptom")
    public ResponseEntity<?> insertTroubleSymptomOfProduct(@RequestBody InsertTroubleSymptomOfProductRequestDto insertTroubleSymptomOfProductRequestDto) {
        boolean status = false;

        try {
            status = managerService.insertTroubleSymptomOfProduct(insertTroubleSymptomOfProductRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to add trouble symptom for the product", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful addition of trouble symptom for the product", status));

    }

    @Log
    @CacheEvict(value = "trouble", allEntries = true)
    @DeleteMapping("/product-category/trouble-symptom")
    public ResponseEntity<?> deleteTroubleSymptomOfProduct(@RequestBody Map<Object, List<Integer>> troubleSymptomIdMap) {
        boolean status = false;

        try {
            status = managerService.deleteTroubleSymptomOfProduct(troubleSymptomIdMap.get("troubleSymptomIdList"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to clear trouble symptom of product", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful deletion of product trouble symptom", status));
    }

    @Log
    @CacheEvict(value = "trouble", allEntries = true)
    @DeleteMapping("/trouble-symptom/{troubleSymptomCode}")
    public ResponseEntity<?> deleteTroubleSymptomByTroubleSymptomCode(@PathVariable int troubleSymptomCode) {
        boolean status = false;

        try {
            status = managerService.deleteTroubleSymptomByTroubleSymptomCode(troubleSymptomCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failure to clear trouble symptom", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Trouble Symptom Deletion Successful", status));
    }







    @Log
    @PostMapping("/temp/solution/file")
    public ResponseEntity<?> uploadTempSolutionFile(MultipartFile file) {
        String fileUrl = null;

        try {
            fileUrl = uploadSolutionFileAndReturnFileUrl(file);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failure to clear trouble symptom", fileUrl));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Trouble Symptom Deletion Successful", fileUrl));
    }

    @Log
    @CacheEvict(value = "solutionTitleList", allEntries = true)
    @PostMapping("/solution/product/{productCode}")
    public ResponseEntity<?> insertProductSolution(@RequestBody InsertProductSolutionRequestDto insertProductSolutionRequestDto) {
        boolean status = false;

        try {
            status = managerService.insertProductSolution(insertProductSolutionRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CustomResponseDto<>(-1, "Failed to create product solution", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Product solution creation successful", status));
    }

    @Log
    @CacheEvict(value = "solutionTitleList", allEntries = true)
    @PostMapping("/solution")
    public ResponseEntity<?> insertSolutionBoard(InsertSolutionRequestDto insertSolutionRequestDto) {
        boolean status = false;

        try {
            status = managerService.insertSolution(insertSolutionRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to create solution", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Solution creation successful", status));
    }

    @Log
    @Cacheable(value = "solutionTitleList", key = "#productCode")
    @GetMapping("/solution/list/{productCode}")
    public ResponseEntity<?> getAllProductSolutionListByProductCode(@PathVariable int productCode) {
        List<ReadSolutionTitleResponseDto> readSolutionTitleResponseDtoList = null;



        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load solution list successful", readSolutionTitleResponseDtoList));
    }

    @Log
    @Cacheable(value = "solutionDetail", key = "#solutionCode")
    @GetMapping("/solution/{solutionCode}")
    public ResponseEntity<?> getSolutionDetailBySolutionCode(@PathVariable int solutionCode) {
        ReadSolutionDetailResponseDto readSolutionDetailResponseDto = null;

        try {
            readSolutionDetailResponseDto = managerService.getSolutionDetailBySolutionCode(solutionCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution detail", readSolutionDetailResponseDto));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load solution detail successful", readSolutionDetailResponseDto));
    }

    @Log
    @CacheEvict(value = "solutionDetail" , allEntries = true)
    @PutMapping("/solution/{solutionCode}")
    public ResponseEntity<?> updateSolutionDetailBySolutionCode(UpdateSolutionRequestDto updateSolutionRequestDto) {
        boolean status = false;

        try {
            status = managerService.modifySolutionDetailBySolutionCode(updateSolutionRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Modification solution detail failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Solution detail modification successful", status));
    }

    @Log
    @CacheEvict(value = "solutionTitleList", allEntries = true)
    @DeleteMapping("/solution/{solutionCode}")
    public ResponseEntity<?> deleteSolutionBySolutionCode(@PathVariable int solutionCode) {
        boolean status = false;

        try {
            status = managerService.deleteSolutionBySolutionCode(solutionCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CustomResponseDto<>(1, "Failed to delete solution", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Delete solution successful", status));
    }

    @Log
    @CacheEvict(value = "solutionTitleList", allEntries = true)
    @DeleteMapping("/solution-board/{solutionBoardCode}")
    public ResponseEntity<?> deleteSolutionBoardByCode(@PathVariable int solutionBoardCode) {
        boolean status = false;

        try {
            status = managerService.deleteSolutionBoardByCode(solutionBoardCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CustomResponseDto<>(1, "Failed to delete solution board", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Delete solution board successful", status));
    }








    @Log
    @CacheEvict(value = "solutionTypeList", allEntries = true)
    @PostMapping("/solution-type")
    public ResponseEntity<?> insertSolutionType(@RequestBody Map<String, String> insertSolutionTypeRequestMap) {
        boolean status = false;

        try {
            status = managerService.insertSolutionType(insertSolutionTypeRequestMap.get("solutionTypeName"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Solution type creation failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Solution type creation succeeded", status));
    }

    @Log
    @CacheEvict(value = "solutionTypeList", allEntries = true)
    @PutMapping("/solution-type")
    public ResponseEntity<?> updateSolutionType(@RequestBody UpdateSolutionTypeRequestDto updateSolutionTypeRequestDto) {
        boolean status = false;

        try {
            status = managerService.updateSolutionType(updateSolutionTypeRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Solution type modification failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Solution type modification succeeded", status));
    }

    @Log
    @CacheEvict(value = "solutionTypeList", allEntries = true)
    @DeleteMapping("/solution-type")
    public ResponseEntity<?> deleteSolutionType(@RequestBody Map<String, Integer> deleteSolutionTypeRequestMap) {
        boolean status = false;

        try {
            status = managerService.deleteSolutionType(deleteSolutionTypeRequestMap.get("solutionTypeCode"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Solution type deletion failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Delete solution type succeeded", status));
    }



    @Log
    @PostMapping("/board-response/{boardCode}")
    public ResponseEntity<?> insertBoardResponse(@RequestBody CreateBoardResponseRequestDto createBoardResponseRequestDto) {
        boolean status = false;

        try {
            status = managerService.insertBoardResponse(createBoardResponseRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to write board response", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Board response creation successful", status));
    }

    @Log
    @PutMapping("/board-response/{boardCode}")
    public ResponseEntity<?> updateBoardResponse(@RequestBody UpdateBoardResponseRequestDto updateBoardResponseRequestDto) {
        boolean status = false;

        try {
            status = managerService.updateBoardResponse(updateBoardResponseRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Board response modification failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Board response modification successful", status));
    }

    @Log
    @PutMapping("/board-type/{boardCode}")
    public ResponseEntity<?> updateBoardType(@RequestBody UpdateBoardTypeRequestDto updateBoardType) {
        String boardCode = null;

        try {
            boardCode = managerService.updateBoardType(updateBoardType);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to modify board type", boardCode));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Board type modification successful", boardCode));
    }


    @Log
    @GetMapping("/{serviceType}/service/title/list")
    public ResponseEntity<?> getServiceHistoryListByServiceTypeCode(@PathVariable String serviceType, @RequestParam String progressStatus, @RequestParam int page) {
        List<ReadServiceHistoryTitleResponseManagerDto> serviceHistoryList = null;

        try {
            serviceHistoryList = managerService.getServiceHistoryListByServiceTypeCode(serviceType, progressStatus, page);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load list of service history", serviceHistoryList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful load of the service history list", serviceHistoryList));
    }


    private String uploadSolutionFileAndReturnFileUrl(MultipartFile file) throws IOException {
        String customPath = "winiaaid-images/temp_solution_files/";

        return "/image/" + fileService.createFileByFileAndPath(file, customPath);
    }
}