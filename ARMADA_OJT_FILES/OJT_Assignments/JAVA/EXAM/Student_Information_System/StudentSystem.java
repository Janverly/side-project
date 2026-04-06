import java.util.ArrayList;
import java.util.Scanner;

public class StudentSystem {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);
        ArrayList<Student> students = new ArrayList<>();

        System.out.println("STUDENT INFORMATION SYSTEM");

        /* old record */
        students.add(new Student("Janverly Bacani", 22, "221-0149-2", "BS in Information Technology"));
        students.add(new Student("Jorge Benitez", 21, "221-0111-2", "BS in Information Technology"));
        students.add(new Student("Neil Abenojar", 22, "221-0222-2", "BS in Information Technology"));

        /* Display old record */
        System.out.println("\n ~ ~ ~ ~ Students Information ~ ~ ~ ~");
        for (Student student : students) {
            student.displayInfo();
        }

        /* Extra mile: add more students dynamically */
        int count = students.size() + 1; /* track stud number */
        while(true) {
            System.out.print("\nDo you want to add another student? (yes/no): ");
            String answer = input.nextLine();
            if(answer.equalsIgnoreCase("no")) {
                break;
            }

            System.out.println("\nEnter details for Student " + count + ":");
            count++;

            System.out.print("Enter Student Name: ");
            String name = input.nextLine();

            System.out.print("Enter Age: ");
            int age = input.nextInt();
            input.nextLine();

            System.out.print("Enter Student ID: ");
            String id = input.nextLine();

            System.out.print("Enter Course: ");
            String course = input.nextLine();

            /* Create stud object */
            Student student = new Student(name, age, id, course);
            students.add(student);
            System.out.println("Student added successfully!");
        }

        /* Display all */
        System.out.println("\n ~ ~ ~ ~ Students Information ~ ~ ~ ~");
        for (Student student : students) {
            student.displayInfo();
        }

        input.close();
    }
}