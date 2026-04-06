package factory.base;

public class Robot {

    protected int energy = 100;

    public int displayEnergy() {
        System.out.println("Current Energy: " + energy);
        return energy;
    }
}