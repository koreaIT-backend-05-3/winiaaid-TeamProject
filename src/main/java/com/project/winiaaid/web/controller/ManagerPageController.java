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
        return "manager/manager_product";
    }

    @GetMapping("/trouble-symptom")
    public String loadTroubleSymptomManagePage() {
        return "manager/manager_trouble_symptom";
    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }
}
