package com.project.winiaaid.service.company;

import com.project.winiaaid.web.dto.company.ReadCompanyResponseDto;

import java.io.IOException;
import java.util.List;

public interface CompanyService {
    public List<ReadCompanyResponseDto> getCompanyList() throws Exception;
}