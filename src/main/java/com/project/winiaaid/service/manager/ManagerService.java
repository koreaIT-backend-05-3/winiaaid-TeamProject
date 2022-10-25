package com.project.winiaaid.service.manager;

import com.project.winiaaid.web.dto.manager.AddProductRequestDto;
import com.project.winiaaid.web.dto.manager.DeleteProductRequestDto;
import com.project.winiaaid.web.dto.manager.InsertTroubleSymptomOfProductRequestDto;
import com.project.winiaaid.web.dto.manager.UpdateProductRequestDto;

import java.util.List;

public interface ManagerService {
    public boolean insertProduct(String registrationType, AddProductRequestDto addProductRequestDto) throws Exception;
    public boolean updateProduct(int keyCode, UpdateProductRequestDto updateProductRequestDto) throws Exception;
    public boolean deleteProduct(String productType, int keyCode, DeleteProductRequestDto deleteProductRequestDto) throws Exception;

    public boolean insertTroubleSymptomOfProduct(InsertTroubleSymptomOfProductRequestDto insertTroubleSymptomOfProductRequestDto) throws Exception;
    public boolean insertTroubleSymptom(String troubleSymptom) throws Exception;
    public boolean deleteTroubleSymptomOfProduct(List<Integer> troubleSymptomIdList) throws Exception;
    public boolean deleteTroubleSymptomByTroubleSymptomCode(int troubleSymptomCode) throws Exception;

}