import java.util.ArrayList;

public class Casting_Chaos {

    public static void main(String[] args) {

        // 1. Create ArrayList with mixed data
        ArrayList<Object> myList = new ArrayList<Object>(); //Object is to store mixed data (numbers and strings)
        myList.add("13");
        myList.add("hello world");
        myList.add(48);
        myList.add("Goodbye world");

        // 2. Loop and attempt casting
        for (int i = 0; i < myList.size(); i++) {

            try {
                Integer castedValue = (Integer) myList.get(i);
                System.out.println("Value at index " + i + " is: " + castedValue);
            } 
            catch (ClassCastException error) {
                System.out.println("Error: " + error);
                System.out.println("At index: " + i);
                System.out.println("Offending value: " + myList.get(i));
                System.out.println();
            }

        }
    }
}