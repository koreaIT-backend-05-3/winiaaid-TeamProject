package com.project.winiaaid.domain.manager;

import com.project.winiaaid.domain.file.ProductImage;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ManagerRepository {
    public int insertProductDetail(ManagerProduct product) throws Exception;
    public int insertProductGroup(ManagerProduct product) throws Exception;
    public int insertMainCategoryProduct(ManagerProduct product) throws Exception;
    public int findMaxProductGroupCode()throws Exception;
    public List<String> findAllCategoryCodeToDelete(int product_group_code)throws Exception;
    public List<ProductImage> findFileImageListToDelete(Map<String, Object> config_map) throws Exception;
    public int updateDefaultProductToGroupProduct(ManagerProduct product) throws Exception;
    public int updateProductInfo(ManagerProduct product) throws Exception;
    public int deleteProductInfo(Map<String, Object> config_map) throws Exception;
}