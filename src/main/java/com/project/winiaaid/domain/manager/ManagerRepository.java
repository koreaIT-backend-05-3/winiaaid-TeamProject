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

    public int insertTroubleSymptomOfProduct(ManagerTroubleSymptom managerTroubleSymptom) throws Exception;
    public int insertTroubleSymptom(String trouble_sypmtom) throws Exception;
    public int deleteTroubleSymptomOfProduct(List<Integer> trouble_symptom_id_list) throws Exception;
    public int deleteTroubleSymptomByTroubleSymptomCode(int trouble_symptom_code) throws Exception;

    public int insertSolution(ManagerSolution manager_solution) throws Exception;
    public int insertSolutionFile(ManagerSolution manager_solution) throws Exception;

    public int insertSolutionType(String solution_type_name) throws Exception;
    public int updateSolutionType(ManagerSolution manager_solution) throws Exception;
    public int deleteSolutionType(int solution_type_code) throws Exception;

    public List<Integer> findAllSolutionBoardCodeInDeletedSolutionTypeCode(int solution_type_code) throws Exception;
    public int disabledAllSolutionInDeletedSolutionTypeCode(int solution_type_code) throws Exception;
    public int deleteSolutionBoardList(List<Integer> delete_board_code_list) throws Exception;
}