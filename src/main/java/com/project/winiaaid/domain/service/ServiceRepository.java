package com.project.winiaaid.domain.service;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ServiceRepository {
    public int findNonMemberUserCode(String type) throws Exception;
}