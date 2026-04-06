package factory;

import factory.types.WorkerBot;
import factory.types.SecurityBot;

public class TestFactory {

    public static void main(String[] args) {

        /* WorkerBot Test */
        WorkerBot worker = new WorkerBot();

        worker.liftCrate();
        worker.liftCrate();

        worker.assemblePart();
        worker.assemblePart();
        worker.assemblePart();

        worker.chargeBattery();

        worker.displayEnergy();

        System.out.println();

       /*  SecurityBot Test */
        SecurityBot guard = new SecurityBot();

        guard.patrol();
        guard.patrol();

        guard.soundAlarm();

        guard.recharge();

        guard.displayEnergy();
    }
}