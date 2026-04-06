package com.verly.demo.runners;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.verly.demo.models.Student;
import com.verly.demo.services.StudentService;

@Component
public class TestRunner implements CommandLineRunner {

    private final StudentService studentService;

    public TestRunner(StudentService studentService) {
        this.studentService = studentService;
    }

    @Override
    public void run(String... args) throws Exception {
        /* Create first student */
        Student s1 = studentService.createStudent(new Student("Juan Dela Cruz", "juan@email.com", "BSCS", 20));
        System.out.println("Created Student: " + s1.getName());

        // Create second student
        Student s2 = studentService.createStudent(new Student("Maria Santos", "maria@email.com", "BSIT", 19));
        System.out.println("Created Student: " + s2.getName());

        /* Display all students before deletion*/
        System.out.println("\nAll Students Before Deletion:");
        for (Student student : studentService.getAllStudents()) {
            System.out.println("\nID: " + student.getId() 
                + "\nName: " + student.getName() 
                + "\nEmail: " + student.getEmail() 
                + "\nCourse: " + student.getCourse() 
                + "\nAge: " + student.getAge());
        }

        /* Delete first student (Juan)*/
        studentService.deleteStudent(s1.getId());
        System.out.println("\nDeleted Student with ID: " + s1.getId());

       /*Display remaining students after deletion*/
        System.out.println("\nAll Students After Deletion:");
        System.out.println("- - - - - - - - - - - - -");
        for (Student student : studentService.getAllStudents()) {
            System.out.println("\nID: " + student.getId() 
                + "\nName: " + student.getName() 
                + "\nEmail: " + student.getEmail() 
                + "\nCourse: " + student.getCourse() 
                + "\nAge: " + student.getAge());
        }
        System.out.println("- - - - - - - - - - - - -");
    }
}