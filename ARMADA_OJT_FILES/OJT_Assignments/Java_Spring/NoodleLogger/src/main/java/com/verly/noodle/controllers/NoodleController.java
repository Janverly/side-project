package com.verly.noodle.controllers;

import com.verly.noodle.models.NoodleModel;
import com.verly.noodle.services.NoodleService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/noodles")
public class NoodleController {

    private final NoodleService noodleService;

    public NoodleController(NoodleService noodleService) {
        this.noodleService = noodleService;
    }

    /* form to add new noodle */
    @GetMapping({"", "/add"})
    public String showForm(Model model) {
        model.addAttribute("noodle", new NoodleModel());
        return "index";
    }

	/*
	 *  gawa new noodle
	 */ 
    @PostMapping("/add")
    public String createNoodle(@Valid @ModelAttribute("noodle") NoodleModel noodle,
                               BindingResult result) {
        if (result.hasErrors()) return "index";
        noodleService.createNoodle(noodle);
        return "redirect:/noodles/show";
    }

    /* show all noodles */
    @GetMapping("/show")
    public String showAll(Model model) {
        model.addAttribute("noodles", noodleService.allNoodles());
        return "show";
    }

    /* show form to edit noodle */
    @GetMapping("/edit/{id}")
    public String editForm(@PathVariable("id") Long id, Model model) {
        NoodleModel noodle = noodleService.findNoodle(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid noodle Id:" + id));
        model.addAttribute("noodle", noodle);
        return "edit";
    }

    /* update noodle */
    @PostMapping("/update/{id}")
    public String updateNoodle(@PathVariable("id") Long id,
                               @Valid @ModelAttribute("noodle") NoodleModel noodle,
                               BindingResult result) {
        if (result.hasErrors()) return "edit";
        noodleService.updateNoodle(noodle);
        return "redirect:/noodles/show";
    }

    /* delete noodle by id  */
    @GetMapping("/delete/{id}")
    public String deleteNoodle(@PathVariable("id") Long id) {
        noodleService.deleteNoodle(id);
        return "redirect:/noodles/show";
    }

    /* Delete all noodles */
    @GetMapping("/deleteAll")
    public String deleteAll() {
        noodleService.deleteAllNoodles();
        return "redirect:/noodles/show";
    }
}