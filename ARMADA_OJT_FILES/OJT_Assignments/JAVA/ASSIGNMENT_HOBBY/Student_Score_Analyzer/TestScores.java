import java.util.Scanner;

public class TestScores {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        ScoreUtil util = new ScoreUtil();

        int stud_score;

        System.out.print("Enter number of student scores (at least 8): ");
        stud_score = scanner.nextInt();

        for (; stud_score < 8; ) {
            System.out.println("You must enter at least 8 scores. Try again.");
            System.out.print("Enter number of student scores (at least 8): ");
            stud_score = scanner.nextInt();
        }

        // Create array
        int[] scores = new int[stud_score];

        // Input scores
        System.out.println("Enter the scores:");
        for (int i = 0; i < stud_score; i++) {
            System.out.print("Score " + (i + 1) + ": ");
            scores[i] = scanner.nextInt();
        }

        // Sort scores
        util.sortScores(scores);

        //sorted scores
        System.out.println("\nSorted Scores (Lowest to Highest):");
        for (int i = 0; i < stud_score; i++) {
            System.out.print(scores[i] + " ");
        }
        System.out.println();

        // Stats
        System.out.println("\nAverage Score: " + util.getAverageScore(scores));
        System.out.println("Highest Score: " + util.getHighestScore(scores));
        System.out.println("Lowest Score: " + util.getLowestScore(scores));
        System.out.println("Second Highest Score: " + util.getSecondHighestScore(scores));

        // display passed and failed
        System.out.println();
        util.printPassingScores(scores);
        System.out.println();
        util.printFailingScores(scores);

        scanner.close();
    }
}