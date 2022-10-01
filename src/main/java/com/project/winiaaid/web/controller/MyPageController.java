package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MyPageController {

    @GetMapping({"/service/history/ing", "/service/history/end", "/writing/counsel", "/writing/customer"})
    public String loadServiceHistoryListPage() {
        return "mypage/service_history_list";
    }

    @GetMapping({"/service/history/end/detail/{serviceCode}", "/service/history/ing/detail/{serviceCode}"})
    public String loadServiceHistoryDetailPage() {
        return "service/inquiry_detail";
    }
}