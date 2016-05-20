package com.bookstore;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BookStoreController {
    @RequestMapping(value = "/")
    public String bookStoreController() {
        return "redirect:login/loginForm";
    }
}
