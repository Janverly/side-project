import java.util.ArrayList;

public class TestSchool {
    public static void main(String[] args) {

        /* 1: Create 4 Course objects */
        Course course1 = new Course();
        course1.courseName = "Introduction to Java";
        course1.courseCode = "CS101";
        course1.units = 3;

        Course course2 = new Course();
        course2.courseName = "Database Systems";
        course2.courseCode = "CS202";
        course2.units = 4;

        Course course3 = new Course();
        course3.courseName = "Web Development";
        course3.courseCode = "CS303";
        course3.units = 3;

        Course course4 = new Course();
        course4.courseName = "Mobile App Development";
        course4.courseCode = "CS404";
        course4.units = 4;

        /* 2: Create 3 Student objects */
        Student student1 = new Student();
        student1.name = "Alice";
        student1.age = 19;

        Student student2 = new Student();
        student2.name = "Bob";
        student2.age = 20;

        Student student3 = new Student();
        student3.name = "Charlie";
        student3.age = 18;

        /* 3: Enroll students in courses */
        System.out.println("=== Student Enrollments ===");

        /* Alice adds Java + Web Development */
        student1.courses.add(course1);
        student1.courses.add(course3);

        /* Bob adds Database Systems + Mobile App Development */
        student2.courses.add(course2);
        student2.courses.add(course4);

        /* Charlie adds all 4 courses */
        student3.courses.add(course1);
        student3.courses.add(course2);
        student3.courses.add(course3);
        student3.courses.add(course4);

        /* Display initial student enrollments */
        printStudentCourses(student1);
        printStudentCourses(student2);
        printStudentCourses(student3);

        /* Set Alice's enrollment status to true */
        student1.enrolled = true;
        System.out.println("\n" + student1.name + " is now officially enrolled: " + student1.enrolled);

        /* Add Database Systems to Alice's courses */
        student1.courses.add(course2);
        System.out.println("\n" + student1.name + " added \"Database Systems\" to her courses.");
        printStudentCourses(student1);

        /* Set Bob's enrollment status to true */
        student2.enrolled = true;
        System.out.println("\n" + student2.name + " is now officially enrolled: " + student2.enrolled);
        printStudentCourses(student2);

        /* Charlie drops Web Development */
        student3.courses.remove(course3);
        System.out.println("\n" + student3.name + " dropped \"Web Development\" from his courses.");
        printStudentCourses(student3);
    }

    /* print a student's courses  */
    public static void printStudentCourses(Student student) {
        /* Print basic student info */
        System.out.println("\n" + student.name + " (Age: " + student.age + 
                           ") - Enrolled: " + student.enrolled + 
                           " | Total courses: " + student.courses.size());

        /* Check if student has any courses */
        if (student.courses.isEmpty()) {
            System.out.println("   * No courses enrolled.");
        } else {
            /* Print each course with basic details */
            for (Course course : student.courses) {
                System.out.println("   * " + course.courseName + " [" + 
                                   course.courseCode + ", " + course.units + " units]");
            }
        }
    }
}