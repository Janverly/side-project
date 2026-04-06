package com.verly.FormSubmission.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/login")
    public String login(@RequestParam("email") String email,
                        @RequestParam("password") String password,
                        Model model) {

        // Updated credentials
        if (email.equals("qwerty@test.com") && password.equals("qwerty123")) {
            model.addAttribute("message", "Login Successful!");
        } else {
            model.addAttribute("message", "Invalid Email or Password");
        }

        return "results";
    }
}