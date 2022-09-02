package com.project.winiaaid.domain.product;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductRepository {
    public List<Product> findListToProductMainCategory() throws Exception;
}