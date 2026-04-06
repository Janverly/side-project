package com.verly.luckypath.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Random;

@RestController
@RequestMapping("/lucky")
public class LuckyController {
	
	@RequestMapping("")
	public String lucky() {
		return "Welcome to Lucky Paths!";
	}

	@RequestMapping("/motivation")
	public String motivation() {
		return "Keep pushing forward, success is jsut around the corner!";
	}
	
	@RequestMapping("/surprise")
	public String surprise() {
		return "A pleasant surprise awaits you today!";
	}
	
	private String[] fortunes = {
	        "Today is your day to shine!",
	        "An unexpected opportunity will knock soon!",
	        "Keep your smile—it brings good luck!",
	        "You will achieve something great today!"
	    	};

	@RequestMapping("/fortune")
	public String fortune() {
		Random random = new Random();
		int index = random.nextInt(fortunes.length);
		return fortunes[index];
	}

}
