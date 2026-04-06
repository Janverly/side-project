import java.util.ArrayList;

public class Student {
    public String name;
    public int age;
    public ArrayList<Course> courses;
    public boolean enrolled;

    // Constructor
    public Student() {
        this.courses = new ArrayList<Course>();
        this.enrolled = false;
    }
}