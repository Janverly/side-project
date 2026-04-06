package com.verly.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import com.verly.demo.models.Student;

@Service
public class StudentService {
    private List<Student> students = new ArrayList<>();
    private Long idCounter = 1L;

    /* Create student */
    public Student createStudent(Student student) {
        student.setId(idCounter++);
        students.add(student);
        return student;
    }

    /* Get all students */
    public List<Student> getAllStudents() {
        return students;
    }

    /* Update student */
    public Student updateStudent(Long id, String name, String email, String course, Integer age) {
        for (Student s : students) {
            if (s.getId().equals(id)) {
                s.setName(name);
                s.setEmail(email);
                s.setCourse(course);
                s.setAge(age);
                return s;
            }
        }
        return null;
    }

    /* Delete student */
    public void deleteStudent(Long id) {
        students.removeIf(s -> s.getId().equals(id));
    }
}