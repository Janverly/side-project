package com.verly.veggie.models;

public class Items {
    private String name;
    private double price;
    private boolean organic;

    /**
     * DOCU: Represents a vegetable item with a name, price, and organic status.
     * Name cannot be empty; price cannot be negative.
     * Provides getters and setters for all fields.
     *
     *Date: 2028-03-16
     * Author: Janverly 
     * Last Updated: 2026-03-17
     */
    public Items(String name, double price, boolean organic) {
        setName(name);
        setPrice(price);
        this.organic = organic;
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty.");
        }
        this.name = name;
    }

    public void setPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative.");
        }
        this.price = price;
    }

    public void setOrganic(boolean organic) {
        this.organic = organic;
    }

    public String getName() {
        return this.name;
    }

    public double getPrice() {
        return this.price;
    }

    public boolean isOrganic() {
        return this.organic;
    }


}