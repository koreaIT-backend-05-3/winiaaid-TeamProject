package com.project.winiaaid.domain.company;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CompanyRepository {
    public List<Company> findCompanyList() throws Exception;
}