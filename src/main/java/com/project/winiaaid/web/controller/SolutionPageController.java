package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/solution")
public class SolutionPageController {

    @GetMapping("/faq/list")
    public String loadFaQPage() {
        return "solution/solution_list";
    }
}
