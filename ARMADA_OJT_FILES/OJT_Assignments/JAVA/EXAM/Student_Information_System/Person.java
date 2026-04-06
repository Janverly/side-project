class Person {
    private String name;
    private int age;

    /* constructor */
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    /* get and set for encap */
    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }
}