package com.project.winiaaid.service.company;

import com.project.winiaaid.domain.company.Company;
import com.project.winiaaid.domain.company.CompanyRepository;
import com.project.winiaaid.web.dto.company.ReadCompanyResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    @Override
    public List<ReadCompanyResponseDto> getCompanyList() throws Exception {
        List<Company> companyEntityList = null;
        List<ReadCompanyResponseDto> companyResponseDtoList = null;

        companyEntityList = companyRepository.findCompanyList();

        if(companyEntityList.size() != 0) {
            companyResponseDtoList = changeToReadCompanyResponseDto(companyEntityList);
        }

        return companyResponseDtoList;
    }

    private List<ReadCompanyResponseDto> changeToReadCompanyResponseDto(List<Company> companyList) {
        return companyList.stream()
                .map(Company::toReadCompanyResponseDto)
                .collect(Collectors.toList());
    }
}