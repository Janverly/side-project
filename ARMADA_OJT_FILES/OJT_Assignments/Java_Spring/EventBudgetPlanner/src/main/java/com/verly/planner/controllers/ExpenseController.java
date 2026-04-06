package com.verly.planner.controllers;

import com.verly.planner.models.Expense;
import com.verly.planner.services.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService service;
    /*
     * DOCU: Handles all HTTP requests related to managing expenses, including
     * displaying, creating, updating, deleting, and viewing individual expense records.
     *
     * @param ExpenseService service - Service layer used to perform business logic and database operations
     * @returns String - Returns the name of the view (JSP page) to be rendered
     * @throws Exception - May throw validation or data access exceptions during processing
     *
     * Last Updated: 2026-03-23
     * Author: Janverly
     */
   
    public ExpenseController(ExpenseService service) {
        this.service = service;
    }
    
    @GetMapping("")
    public String index(Model model, @ModelAttribute("expense") Expense expense) {
        model.addAttribute("expenses", service.allExpenses());
        return "index";
    }

    @PostMapping("/add")
    public String create(
            @Valid @ModelAttribute("expense") Expense expense,
            BindingResult result,
            Model model
    ) {
        if (result.hasErrors()) {
            model.addAttribute("expenses", service.allExpenses());
            return "index";
        }

        service.createExpense(expense);
        return "redirect:/expenses";
    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable Long id, Model model) {
        model.addAttribute("expense", service.findExpense(id));
        return "edit";
    }

    @PostMapping("/update/{id}")
    public String update(
            @PathVariable Long id,
            @Valid @ModelAttribute("expense") Expense expense,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            return "edit";
        }

        service.updateExpense(expense);
        return "redirect:/expenses";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteExpense(id);
        return "redirect:/expenses";
    }

    @GetMapping("/show/{id}")
    public String show(@PathVariable Long id, Model model) {
        model.addAttribute("expense", service.findExpense(id));
        return "show";
    }
}