package com.verly.SecretMessage.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/secret")
public class SecretController {

	
	/*  
	 * DOCU: Handles secret messages with optional code protection.  
	 *       Users can save, view, and unlock messages stored in session.  
	 *
	 * Routes:
	 *   GET  /secret          - show form
	 *   POST /secret/submit   - save message
	 *   GET  /secret/show     - display message
	 *   POST /secret/unlock   - unlock message with code
	 *
	 *   recipient {String}, message {String}, code {String}, unlocked {Boolean}
	 *
	 * Last Updated: 2026-03-18  
	 * Author: Janverly  
	 */
	
    @GetMapping("")
    public String showForm() {
        return "secret";
    }

    @PostMapping("/submit")
    public String submitSecret(
            @RequestParam("recipient") String recipient,
            @RequestParam("message") String message,
            @RequestParam(value = "code", required = false) String code,
            HttpSession session,
            RedirectAttributes redirectAttributes) {

        session.setAttribute("recipient", recipient);
        session.setAttribute("message", message);

        if (code != null && !code.trim().isEmpty()) {
            session.setAttribute("code", code);
            session.setAttribute("unlocked", false);
        } else {
            session.removeAttribute("code");
            session.setAttribute("unlocked", true); 
        }

        redirectAttributes.addFlashAttribute("success", "Secret message saved!");
        return "redirect:/secret"; 
    }

   
    @GetMapping("/show")
    public String showSecret(HttpSession session) {
        if (session.getAttribute("message") == null) {
            return "redirect:/secret"; 
        }
        return "show"; 
    }

    @PostMapping("/unlock")
    public String unlockSecret(
            @RequestParam("inputCode") String inputCode,
            HttpSession session,
            RedirectAttributes redirectAttributes) {

        String savedCode = (String) session.getAttribute("code");

        if (savedCode != null && savedCode.equals(inputCode)) {
            session.setAttribute("unlocked", true); 
        } else {
            redirectAttributes.addFlashAttribute("error", "Wrong code!");
        }

        return "redirect:/secret/show";
    }
}