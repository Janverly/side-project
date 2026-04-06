package com.verly.pirate.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class PirateController {

	/*
	 * PirateController handles the Pirate Treasure Hunt game.
	 * 
	 * - Displays the game page with current coins and adventure logs.
	 * - Processes pirate actions via POST requests for locations (island, cave, tavern, seas, reef) or reset.
	 * - Supports a "Play Random!" action that chooses a random location automatically.
	 * - Tracks coins and logs in HttpSession and updates them accordingly.
	 * - Redirects to a marooned page if coins fall below a threshold (-50).
	 * - Generates timestamped log entries for each action.
	 * 
	 * Last Updated: 2026-03-19
	 * Author: Janverly Bacani
	 */
	
	/* Show game page */
    @GetMapping("/")
    public String index(HttpSession session, Model model) {

        if (session.getAttribute("coins") == null) {
            session.setAttribute("coins", 0);
            session.setAttribute("logs", new ArrayList<String>());
        }

        model.addAttribute("coins", session.getAttribute("coins"));
        model.addAttribute("logs", session.getAttribute("logs"));

        return "index";
    }

    @PostMapping("/play")
    public String play(
            @RequestParam("location") String location,
            HttpSession session
    ) {

        int coins = (int) session.getAttribute("coins");
        ArrayList<String> logs = (ArrayList<String>) session.getAttribute("logs");

        int earned = 0;

        switch (location) {
            case "island":
                earned = (int) (Math.random() * 11) + 10; // 10-20
                coins += earned;
                logs.add(log("Island", earned, true));
                break;

            case "cave":
                earned = (int) (Math.random() * 6) + 5; // 5-10
                coins += earned;
                logs.add(log("Cave", earned, true));
                break;

            case "tavern":
                earned = (int) (Math.random() * 4) + 2; // 2-5
                coins += earned;
                logs.add(log("Tavern", earned, true));
                break;

            case "seas":
                earned = (int) (Math.random() * 51); // 0-50
                if (Math.random() < 0.5) {
                    coins += earned;
                    logs.add(log("High Seas", earned, true));
                } else {
                    coins -= earned;
                    logs.add(log("High Seas", earned, false));
                }
                break;

            case "reef": 
                earned = (int) (Math.random() * 16) + 5; // 5-20
                coins -= earned;
                logs.add(log("Haunted Reef", earned, false));
                break;

            case "reset":
                session.setAttribute("coins", 0);
                session.setAttribute("logs", new ArrayList<String>());
                return "redirect:/";
        }

        session.setAttribute("coins", coins);
        session.setAttribute("logs", logs);

        if (coins < -10) {
            return "redirect:/marooned";
        }

        return "redirect:/";
    }

    @PostMapping("/play/random")
    public String playRandom(HttpSession session) {
        String[] locations = {"island", "cave", "tavern", "seas", "reef"};
        int randomIndex = (int) (Math.random() * locations.length);
        String randomLocation = locations[randomIndex];

        return play(randomLocation, session);
    }

	/* Marooned page*/
    @GetMapping("/marooned")
    public String marooned() {
        return "marooned";
    }

    /* Log activity*/
    private String log(String place, int amount, boolean gain) {
        String time = new SimpleDateFormat("MMM dd yyyy hh:mm a").format(new Date());
        if (gain) {
            return "Gained " + amount + " coins at " + place + " (" + time + ")";
        } else {
            return "Lost " + amount + " coins at " + place + " (" + time + ")";
        }
    }
}