package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AddressController {

    @GetMapping("/address/main")
    public String loadSetAddressPage() {
        return "/popup/set_address_popup";
    }
}