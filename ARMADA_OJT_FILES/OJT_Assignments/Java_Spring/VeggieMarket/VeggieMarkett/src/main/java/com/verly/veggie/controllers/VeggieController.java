package com.verly.veggie.controllers;

import java.util.ArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.verly.veggie.models.Items;


/*
 * DOCU: Handles requests to "/" and loads index.jsp.
 * Creates a list of veggie Items (name, price, availability) and adds it to the model.
 *
 * Last Updated: 2026-03-17
 * Author: Janverly
 */

	@Controller
	public class VeggieController {
		
		@GetMapping("/")
		public String index(Model model) {
			
			ArrayList<Items> veggies = new ArrayList<Items>();
			veggies.add(new Items("Carrot", 1.25, true));
			veggies.add(new Items("Broccoli", 2.50, false));
			veggies.add(new Items("Lettuce", 1.50, true));
			veggies.add(new Items("Cabbage", 2.20, false));
			veggies.add(new Items("Bell Pepper", 1.80, true));
			veggies.add(new Items("Tomato", 1.10, true));
			veggies.add(new Items("Zucchini", 2.00, false));
			veggies.add(new Items("Cucumber", 1.25, true));
			veggies.add(new Items("Radish", 0.95, false));
	        
	        model.addAttribute("veggies", veggies);
	        
	        return "index";
		}
	}

