public class PizzaPalace {
    public static void main(String[] args) {
        // Messages
        String welcomeMessage = "Welcome, ";
        String pendingMessage = "Your order is pending";
        String readyMessage = "Your order is ready";

        // Pizza prices
        double pepperoniPrice = 19.99;
        double veggiePrice = 9.49;
        double cheesePrice = 10.99;

        // Customer names
        String customer1 = "Anna";
        String customer2 = "Mark";
        String customer3 = "Lisa";
        String customer4 = "Kevin";

        // Order status (true = ready, false = pending)
        boolean isOrderReadyAnna = false;
        boolean isOrderReadyMark = true;
        boolean isOrderReadyLisa = false;

        // --- 1. Greet Anna ---
        System.out.println(welcomeMessage + customer1 + "!");
        if (isOrderReadyAnna) {
            System.out.println(customer1 + ", " + readyMessage + " (Pepperoni Pizza)");
        } else {
            System.out.println(customer1 + ", " + pendingMessage + " (Pepperoni Pizza)");
        }

        // --- 2. Mark's Total ---
        int markPizzaCount = 2;
        double markTotal = markPizzaCount * cheesePrice;
        System.out.println("\n" + customer2 + "'s total is $" + markTotal);

        if (isOrderReadyMark) {
            System.out.println(customer2 + ", " + readyMessage + "!");
        } else {
            System.out.println(customer2 + ", " + pendingMessage + "!");
        }

        // --- 3. Lisa's Order ---
        double lisaTotal = veggiePrice;
        if (isOrderReadyLisa) {
            System.out.println("\n" + customer3 + ", " + readyMessage + "! Total: $" + lisaTotal);
        } else {
            System.out.println("\n" + customer3 + ", " + pendingMessage + " (Veggie Pizza)");
        }

        // --- 4. Kevin's Correction ---
        double kevinCharged = cheesePrice;
        double kevinOrdered = veggiePrice;
        double kevinDifference = kevinOrdered - kevinCharged;

        System.out.println("\n" + customer4 + "'s payment correction:");
        if (kevinDifference > 0) {
            System.out.println("Kevin needs to pay an additional $" + kevinDifference);
        } else if (kevinDifference < 0) {
            System.out.println("Kevin was overcharged! Refund: $" + (-kevinDifference));
        } else {
            System.out.println("Kevin's payment is correct.");
        }
    }
}