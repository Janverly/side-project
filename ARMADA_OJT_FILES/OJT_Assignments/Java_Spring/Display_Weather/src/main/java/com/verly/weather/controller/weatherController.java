package com.verly.weather.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Random;

@Controller
public class weatherController {

    @GetMapping("/weather/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    // URL: /weather/temperature/SanFernando
    @GetMapping("/weather/temperature/{city}")
    public String temperature(@PathVariable("city") String city, Model model) {
        Random rand = new Random();
        int tempValue;

        // Different temperature ranges for some cities
        if (city.equalsIgnoreCase("SanFernando")) {
            tempValue = rand.nextInt(10) + 25; // 25-34°C
        } else if (city.equalsIgnoreCase("Manila")) {
            tempValue = rand.nextInt(10) + 28; // 28-37°C
        } else if (city.equalsIgnoreCase("Baguio")) {
            tempValue = rand.nextInt(10) + 15; // 15-24°C
        } else {
            tempValue = rand.nextInt(15) + 20; // default 20-34°C
        }

        String temp;
        if (tempValue >= 30) {
            temp = tempValue + "°C (Hot)";
        } else if (tempValue >= 25) {
            temp = tempValue + "°C (Warm)";
        } else {
            temp = tempValue + "°C (Cool)";
        }

        model.addAttribute("temperature", temp);
        model.addAttribute("city", city);
        return "temperature";
    }

    // URL: /weather/condition/SanFernando
    @GetMapping("/weather/condition/{city}")
    public String condition(@PathVariable("city") String city, Model model) {
        Random rand = new Random();
        int choice = rand.nextInt(4);
        String condition;

        if (choice == 0) {
            condition = "Sunny";
        } else if (choice == 1) {
            condition = "Cloudy";
        } else if (choice == 2) {
            condition = "Rainy";
        } else {
            condition = "Foggy";
        }

        model.addAttribute("condition", condition);
        model.addAttribute("city", city);
        return "condition";
    }
}