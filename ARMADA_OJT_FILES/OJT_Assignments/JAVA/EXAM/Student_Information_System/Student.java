class Student extends Person implements DisplayInfo {

    private String studentID;
    private String course;

    /* constructor  this*/
    public Student(String name, int age, String studentID, String course) {
        super(name, age);
        this.studentID = studentID;
        this.course = course;
    }

    /* getter */
    public String getStudentID() {
        return studentID;
    }

    public String getCourse() {
        return course;
    }

    /* override sa stud */
    @Override
    public void displayInfo() {

        System.out.println("\nName: " + getName());
        System.out.println("Age: " + getAge());
        System.out.println("Student ID: " + studentID);
        System.out.println("Course: " + course);
    }
}