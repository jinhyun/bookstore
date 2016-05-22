package com.bookstore;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class BookStoreController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String bookStore() {
        return "redirect:login/loginForm";
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String home() {
        return "home";
    }
}
