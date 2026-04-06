public class TestOrders {
    public static void main(String[] args) {
        /* Create 2 orders for unspecified guests */
        order order1 = new order();
        order order2 = new order();

        /* Create 3 orders with specific names */
        order order3 = new order("Qwerty");
        order order4 = new order("Horheee");
        order order5 = new order("Kysicx");

        /* Create items */
        Item latte = new Item("latte", 2.99);
        Item muffin = new Item("muffin", 2.49);
        Item coffee = new Item("coffee", 1.99);
        Item bagel = new Item("bagel", 2.59);
        Item sandwich = new Item("sandwich", 3.99);
        Item juice = new Item("juice", 2.50);

        /* Add at least 2 items to each order */
        order1.addItem(latte);
        order1.addItem(muffin);

        order2.addItem(coffee);
        order2.addItem(bagel);

        order3.addItem(latte);
        order3.addItem(sandwich);

        order4.addItem(muffin);
        order4.addItem(juice);

        order5.addItem(coffee);
        order5.addItem(bagel);
        order5.addItem(sandwich);

        /* Test getStatusMessage by setting some orders to ready */
        order1.setReady(true);
        order3.setReady(true);
        order5.setReady(true);

        System.out.println("Order 1 Status: " + order1.getStatusMessage());
        System.out.println("Order 2 Status: " + order2.getStatusMessage());
        System.out.println("Order 3 Status: " + order3.getStatusMessage());
        System.out.println("Order 4 Status: " + order4.getStatusMessage());
        System.out.println("Order 5 Status: " + order5.getStatusMessage());

        /* total price */
        System.out.println("Order 1 Total: $" + order1.getOrderTotal());
        System.out.println("Order 2 Total: $" + order2.getOrderTotal());
        System.out.println("Order 3 Total: $" + order3.getOrderTotal());
        System.out.println("Order 4 Total: $" + order4.getOrderTotal());
        System.out.println("Order 5 Total: $" + order5.getOrderTotal());

        /* Call display() */
        System.out.println("\n~~~ Order 1 ~~~");
        order1.display();

        System.out.println("\n~~~ Order 2 ~~~");
        order2.display();

        System.out.println("\n~~~ Order 3 ~~~");
        order3.display();

        System.out.println("\n~~~ Order 4 ~~~");
        order4.display();

        System.out.println("\n~~~ Order 5 ~~~");
        order5.display();
    }
}
