package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/solution")
public class SolutionPageController {

    @GetMapping("/faq/list")
    public String loadFaQSolutionPage() {
        return "solution/solution_list";
    }

    @GetMapping("faq/detail/{solutionBoardCode}")
    public String loadFaQSolutionDetailPage() {
        return "solution/solution_detail";
    }


    @GetMapping("/self-check/list")
    public String loadSelfSolutionPage() {
        return "solution/solution_list";
    }

    @GetMapping("self-check/detail/{solutionBoardCode}")
    public String loadSelfSolutionDetailPage() {
        return "solution/solution_detail";
    }
}
