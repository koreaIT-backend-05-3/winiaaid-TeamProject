package com.project.winiaaid.service.manager;

import com.project.winiaaid.web.dto.auth.ReadUserResponseDto;
import com.project.winiaaid.web.dto.manager.board.CreateBoardResponseRequestDto;
import com.project.winiaaid.web.dto.manager.board.UpdateBoardResponseRequestDto;
import com.project.winiaaid.web.dto.manager.board.UpdateBoardTypeRequestDto;
import com.project.winiaaid.web.dto.manager.product.AddProductRequestDto;
import com.project.winiaaid.web.dto.manager.product.DeleteProductRequestDto;
import com.project.winiaaid.web.dto.manager.service.ReadServiceHistoryTitleResponseManagerDto;
import com.project.winiaaid.web.dto.manager.solution.*;
import com.project.winiaaid.web.dto.manager.trouble.InsertTroubleSymptomOfProductRequestDto;
import com.project.winiaaid.web.dto.manager.product.UpdateProductRequestDto;

import java.util.List;

public interface ManagerService {
    public boolean insertProduct(String registrationType, AddProductRequestDto addProductRequestDto) throws Exception;
    public boolean updateProduct(int keyCode, UpdateProductRequestDto updateProductRequestDto) throws Exception;
    public boolean deleteProduct(String productType, int keyCode, DeleteProductRequestDto deleteProductRequestDto) throws Exception;

    public boolean insertTroubleSymptomOfProduct(InsertTroubleSymptomOfProductRequestDto insertTroubleSymptomOfProductRequestDto) throws Exception;
    public boolean insertTroubleSymptom(String troubleSymptom) throws Exception;
    public boolean deleteTroubleSymptomOfProduct(List<Integer> troubleSymptomIdList) throws Exception;
    public boolean deleteTroubleSymptomByTroubleSymptomCode(int troubleSymptomCode) throws Exception;

    public boolean insertSolution(InsertSolutionRequestDto insertSolutionRequestDto) throws Exception;
    public boolean insertProductSolution(InsertProductSolutionRequestDto insertProductSolutionRequestDto) throws Exception;
    public ReadSolutionDetailResponseDto getSolutionDetailBySolutionCode(int solutionCode) throws Exception;
    public boolean modifySolutionDetailBySolutionCode(UpdateSolutionRequestDto updateSolutionRequestDto) throws Exception;
    public boolean deleteSolutionBySolutionCode(int solutionCode) throws Exception;
    public boolean deleteSolutionBoardByCode(int solutionBoardCode) throws Exception;

    public boolean insertSolutionType(String solutionTypeName) throws Exception;
    public boolean updateSolutionType(UpdateSolutionTypeRequestDto updateSolutionTypeRequestDto) throws Exception;
    public boolean deleteSolutionType(int solutionTypeCode) throws Exception;

    public boolean insertBoardResponse(CreateBoardResponseRequestDto createBoardResponseRequestDto) throws Exception;
    public boolean updateBoardResponse(UpdateBoardResponseRequestDto updateBoardResponseRequestDto) throws Exception;
    public String updateBoardType(UpdateBoardTypeRequestDto updateBoardType) throws Exception;

    public List<ReadServiceHistoryTitleResponseManagerDto> getServiceHistoryListByServiceTypeCode(String serviceType, String statusType, int page) throws Exception;
    public boolean completeRepairServiceByRepairServiceCode(String serviceType, String serviceCode) throws Exception;

    public List<ReadUserResponseDto> getAllUserList() throws Exception;
}