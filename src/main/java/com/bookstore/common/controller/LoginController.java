package com.bookstore.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/login")
public class LoginController {
    @RequestMapping(value = "/loginForm")
    public String loginForm() {
        return "common/loginForm";
    }
}
