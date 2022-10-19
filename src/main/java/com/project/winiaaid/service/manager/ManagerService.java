package com.project.winiaaid.service.manager;

import com.project.winiaaid.web.dto.manager.AddProductRequestDto;
import com.project.winiaaid.web.dto.manager.UpdateProductRequestDto;

public interface ManagerService {
    public boolean insertProduct(String registrationType, AddProductRequestDto addProductRequestDto) throws Exception;
    public boolean updateProduct(int keyCode, UpdateProductRequestDto updateProductRequestDto) throws Exception;
}