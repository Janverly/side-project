package com.verly.ticket.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/ticket")
public class TicketController {

    @GetMapping("")
    public String index(Model model) {

    	String passenger = "Alexandra Reyes";
    	String departure = "Tokyo";
    	String destination = "Kyoto";
    	double fare = 45.50;
    	String train = "Shinkansen Sakura 101";
    	String provider = "Global Railways Co.";

        model.addAttribute("passenger", passenger);
        model.addAttribute("departure", departure);
        model.addAttribute("destination", destination);
        model.addAttribute("fare", fare);
        model.addAttribute("train", train);
        model.addAttribute("provider", provider);

        return "index.jsp";
    }
}