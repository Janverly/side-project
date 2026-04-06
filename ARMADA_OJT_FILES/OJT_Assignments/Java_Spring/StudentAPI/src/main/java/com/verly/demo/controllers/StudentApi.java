package com.verly.demo.controllers;

import com.verly.demo.models.Student;
import com.verly.demo.services.StudentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentApi {

    private final StudentService studentService;

    public StudentApi(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public Student create(@RequestParam String name,
                          @RequestParam String email,
                          @RequestParam String course,
                          @RequestParam Integer age) {
        return studentService.createStudent(new Student(name, email, course, age));
    }

    @GetMapping
    public List<Student> getAll() {
        return studentService.getAllStudents();
    }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id,
                          @RequestParam String name,
                          @RequestParam String email,
                          @RequestParam String course,
                          @RequestParam Integer age) {
        return studentService.updateStudent(id, name, email, course, age);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}