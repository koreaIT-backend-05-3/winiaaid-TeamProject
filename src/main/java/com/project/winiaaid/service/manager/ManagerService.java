package com.project.winiaaid.service.manager;

import com.project.winiaaid.web.dto.manager.product.AddProductRequestDto;
import com.project.winiaaid.web.dto.manager.product.DeleteProductRequestDto;
import com.project.winiaaid.web.dto.manager.solution.InsertSolutionRequestDto;
import com.project.winiaaid.web.dto.manager.solution.ReadSolutionDetailResponseDto;
import com.project.winiaaid.web.dto.manager.solution.UpdateSolutionRequestDto;
import com.project.winiaaid.web.dto.manager.solution.UpdateSolutionTypeRequestDto;
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
    public ReadSolutionDetailResponseDto getSolutionDetailBySolutionCode(int solutionCode) throws Exception;
    public boolean modifySolutionDetailBySolutionCode(UpdateSolutionRequestDto updateSolutionRequestDto) throws Exception;

    public boolean insertSolutionType(String solutionTypeName) throws Exception;
    public boolean updateSolutionType(UpdateSolutionTypeRequestDto updateSolutionTypeRequestDto) throws Exception;
    public boolean deleteSolutionType(int solutionTypeCode) throws Exception;
}