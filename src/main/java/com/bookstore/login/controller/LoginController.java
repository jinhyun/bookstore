package com.bookstore.login.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/login")
public class LoginController {
    @RequestMapping(value = "/loginForm", method = RequestMethod.GET)
    public String loginForm() {
        return "login/loginForm";
    }
}
