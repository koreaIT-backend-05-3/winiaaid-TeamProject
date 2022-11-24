package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/manager")
public class ManagerPageController {

    @GetMapping("/main")
    public String loadManagerMainPage() {
        return "manager/manager_main";
    }

    @GetMapping("/product/{type}")
    public String loadProductRegistrationPage() {
        return "manager/product/manager_product";
    }

    @GetMapping("/trouble-symptom")
    public String loadTroubleSymptomManagePage() {
        return "manager/trouble/manager_trouble_symptom";
    }

    @GetMapping({"/solution/registration", "/solution/modification/{solutionCode}"})
    public String loadSolutionRegistrationPage() {
        return "manager/solution/manager_solution_registration_and_modify";
    }

    @GetMapping("/solution/modification")
    public String loadSolutionTypeManagePage() {
        return "manager/solution/manager_solution_type_modify";
    }

    @GetMapping("/service")
    public String loadServiceManagePage() {
        return "manager/service/manager_service";
    }
}
