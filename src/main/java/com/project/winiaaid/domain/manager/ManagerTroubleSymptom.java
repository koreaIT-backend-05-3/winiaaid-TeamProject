package com.project.winiaaid.domain.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerTroubleSymptom {
    private int product_category_code;
    private List<Integer> trouble_symptom_code_list;
}