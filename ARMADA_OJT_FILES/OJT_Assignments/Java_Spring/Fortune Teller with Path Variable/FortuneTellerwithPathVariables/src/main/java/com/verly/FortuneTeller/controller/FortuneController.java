package com.verly.FortuneTeller.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FortuneController {

    @GetMapping("/fortune/travel/{city}")
    public String travelFortune(@PathVariable("city") String city) {
        return "Congratulations! You will soon travel to " + city + "!";
        // to use...  http://localhost:8080/fortune/travel/{city}
    }

    @GetMapping("/fortune/lotto/{number}")
    public String lottoFortune(@PathVariable("number") Integer number) {
        if (number % 2 == 0) {
            return "You will take a grand journey in the near future, but be weary of tempting offers.";
        } else {
            return "You have enjoyed the fruits of your labor but now is a great time to spend time with family and friends.";
        }
        // to use.. http://localhost:8080/fortune/lotto/{number}
        
    }
}