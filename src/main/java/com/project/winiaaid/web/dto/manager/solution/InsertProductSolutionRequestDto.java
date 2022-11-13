package com.project.winiaaid.web.dto.manager.solution;

import com.project.winiaaid.domain.manager.ManagerSolution;
import lombok.Data;
import org.apache.catalina.Manager;

import java.util.List;

@Data
public class InsertProductSolutionRequestDto {
    private int productCode;
    private List<Integer> solutionCodeList;

    public ManagerSolution toManagerSolution() {
        return ManagerSolution.builder()
                .product_code(productCode)
                .solution_code_list(solutionCodeList)
                .build();
    }
}