package factory.types;

import factory.base.Robot;

public class WorkerBot extends Robot {

    public void liftCrate() {
        energy -= 15;
        System.out.println("WorkerBot lifted a heavy crate.");
    }

    public void chargeBattery() {
        energy += 20;
        System.out.println("WorkerBot is recharging.");
    }

    public void assemblePart() {
        energy -= 10;
        System.out.println("WorkerBot assembled a part.");
    }
}