package com.project.winiaaid.domain.engineer;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface EngineerRepository {
    public List<Engineer> findEngineerList() throws Exception;
    public List<Engineer> findEngineerReservationInfo(String date) throws Exception;
}
