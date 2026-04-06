package com.verly.compliment.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/*
* DOCU: Generates a compliment message based on the user's trait and name.
* @param {String} trait_mo - The trait or quality used to describe the user.
* @param {String} name - The name of the person receiving the compliment.
* @param {Integer} times - Number of times the compliment will be repeated.
*
* Last Updated: 2026-03-12
* Author: Janverly
*/

@RestController
@RequestMapping("/compliment")
public class ComplimentController {

    @GetMapping("")
    public String compliment(
            @RequestParam(value = "names", defaultValue = "qwerty") String name,
            @RequestParam(value = "trait", required = false) String trait_mo,
            @RequestParam(value = "times", required = false) Integer times) {

        if (times == null) {
            times = 1;
        }

        String all = "";

        for (int i = 0; i < times; i++) {
            all = all + "You are awesome, " + name + "<br>";

            if (trait_mo != null) {
                all = all + "You are also very " + trait_mo + "<br>";
            }

            all = all + "<br>";
        }

        return all;
    }
}