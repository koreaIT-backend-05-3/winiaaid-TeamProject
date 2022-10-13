package com.project.winiaaid.service.manager;

import com.project.winiaaid.web.dto.manager.AddProductRequestDto;

public interface ManagerService {
    public boolean insertProduct(String registrationType, AddProductRequestDto addProductRequestDto) throws Exception;
}