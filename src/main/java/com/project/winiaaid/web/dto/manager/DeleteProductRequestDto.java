package com.project.winiaaid.web.dto.manager;

import lombok.Data;

@Data
public class DeleteProductRequestDto {
    private boolean mainGroupFlag;
    private int productGroupCode;
}