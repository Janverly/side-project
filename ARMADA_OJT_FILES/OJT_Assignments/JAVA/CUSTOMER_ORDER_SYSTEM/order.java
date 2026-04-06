import java.util.ArrayList;

public class order {
    private String name;
    private boolean ready;
    private ArrayList<Item> items;

    /* Default constructor */
    public order() {
        this.name = "Guest";
        this.ready = false;
        this.items = new ArrayList<Item>();
    }

    /* Overloaded constructor */
    public order(String name) {
        this.name = name;
        this.ready = false;
        this.items = new ArrayList<Item>();
    }

    /* Getters and setters */
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }

    public ArrayList<Item> getItems() {
        return items;
    }

    public void setItems(ArrayList<Item> items) {
        this.items = items;
    }

    /* Add an Item to the order */
    public void addItem(Item item) {
        this.items.add(item);
    }

    /* Get status message if ready or not */
    public String getStatusMessage() {
        if (this.ready) {
            return "Your order is ready.";
        } else {
            return "Thank you for waiting. Your order will be ready soon.";
        }
    }

    /* Calculate and return the total price*/
    public double getOrderTotal() {
        double total = 0;

        for (Item item : items) {
            total += item.getPrice();
        }

        return total;
    }

    /* Display the order details */
    public void display() {
        System.out.println("Customer Name: " + this.name);
        for (Item item : this.items) {
            System.out.printf("%-10s - $%.2f%n", item.getName(), item.getPrice());
        }
        System.out.printf("Total: $%.2f%n", this.getOrderTotal());
    }
}