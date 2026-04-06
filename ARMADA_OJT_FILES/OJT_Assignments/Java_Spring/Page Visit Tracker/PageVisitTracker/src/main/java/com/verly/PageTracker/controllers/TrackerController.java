package com.verly.PageTracker.controllers;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TrackerController {
	/*
	 * DOCU: Page Visit Tracker Controller
	 * controller manages page visits using the user's HTTP session.
	 *  - /visit      : Increases the visit count by 1
	 *  - /visit-fast : Increases the visit count by 3
	 *  - /summary    : Shows the current visit count
	 *  - /reset      : Resets the visit count to 0
	 * 
	 * The visit count is stored in the session as "visitCount".
	 * If the session attribute does not exist, it is initialized to 0.
	 * 
	 * Date:  2026-03-16
	 * Last Updated: 2026-03-17
	 * Author: Janverly
	 */
	
    @GetMapping("/visit")
    public String visit(HttpSession session) {
        Integer count = (Integer) session.getAttribute("visitCount");
        if (count == null) count = 0;
        count++;
        session.setAttribute("visitCount", count);
        return "visit";
    }

    @GetMapping("/visit-fast")
    public String visitFast(HttpSession session) {
        Integer count = (Integer) session.getAttribute("visitCount");
        if (count == null) count = 0;
        count += 3;
        session.setAttribute("visitCount", count);
        return "visit";
    }

    @GetMapping("/summary")
    public String summary(HttpSession session) {
        Integer count = (Integer) session.getAttribute("visitCount");
        if (count == null) count = 0;
        session.setAttribute("visitCount", count);
        return "summary"; 
    }

    @GetMapping("/reset")
    public String reset(HttpSession session) {
        session.setAttribute("visitCount", 0);
        return "reset"; 
    }
}