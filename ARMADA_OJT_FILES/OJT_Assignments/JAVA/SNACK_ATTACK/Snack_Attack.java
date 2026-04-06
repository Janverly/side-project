import java.util.ArrayList;

public class Snack_Attack {
    public static void main(String[] args) {

        ArrayList<String> snacks = new ArrayList<String>();
        snacks.add("Apples");
        snacks.add("Almonds");
        snacks.add("Pretzels");
        snacks.add("Yogurt");
        snacks.add("avocado");

        System.out.println("\nOriginal List: " + snacks + "\n");

        // Loop from the end to the start to safely remove items
        for (int i = snacks.size() - 1; i >= 0; i--) { //size (ilang elements and nasa snack), also -1 kasi 5 yun elements but index 4 (0,1,2,3,4) yung last elemet
            String snack = snacks.get(i);
            System.out.println("Checking index " + i + ": " + snack);

            char firstLetter = Character.toLowerCase(snack.charAt(0));
           
            if (firstLetter == 'a' || firstLetter == 'p') {
                System.out.println("Removing " + snack);
                snacks.remove(i); // Remove if it starts with 'a' or 'p' after if
            }
        }

        System.out.println("\nFinal List: " + snacks);
    }
}