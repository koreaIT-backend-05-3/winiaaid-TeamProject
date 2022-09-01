package com.project.winiaaid.domain.engineer;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface EngineerRepository {
    public List<Engineer> getEngineerReservationInfo() throws Exception;
}
