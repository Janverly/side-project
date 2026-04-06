package factory.types;

import factory.base.Robot;

public class SecurityBot extends Robot {

    public SecurityBot() {
        energy = 200;
    }

    public void patrol() {
        energy -= 20;
        System.out.println("SecurityBot is patrolling the area.");
    }

    public void soundAlarm() {
        energy -= 30;
        System.out.println("Alarm has been triggered!");
    }

    public void recharge() {
        energy += 40;
        System.out.println("SecurityBot has recharged its power cells.");
    }
}