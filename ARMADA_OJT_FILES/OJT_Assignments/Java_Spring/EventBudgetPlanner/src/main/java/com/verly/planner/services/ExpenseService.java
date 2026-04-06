package com.verly.planner.services;

import com.verly.planner.models.Expense;
import com.verly.planner.repositories.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo) {
        this.repo = repo;
    }

    public List<Expense> allExpenses() {
        return repo.findAll();
    }

    public Expense createExpense(Expense e) {
        return repo.save(e);
    }

    public Expense findExpense(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Expense updateExpense(Expense e) {
        return repo.save(e);
    }

    public void deleteExpense(Long id) {
        repo.deleteById(id);
    }
}