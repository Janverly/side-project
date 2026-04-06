public class ScoreUtil {

    // Average
    public double getAverageScore(int[] scores) {
        int sum = 0;
        for (int i = 0; i < scores.length; i++) {
            sum += scores[i];
        }
        return (double) sum / scores.length;
    }

    // Highest
    public int getHighestScore(int[] scores) {
        int highest = scores[0];
        for (int i = 1; i < scores.length; i++) {
            if (scores[i] > highest) {
                highest = scores[i];
            }
        }
        return highest;
    }

    // Lowest
    public int getLowestScore(int[] scores) {
        int lowest = scores[0];
        for (int i = 1; i < scores.length; i++) {
            if (scores[i] < lowest) {
                lowest = scores[i];
            }
        }
        return lowest;
    }

    // Print Passing Scores (>=75)
    public void printPassingScores(int[] scores) {
        int count = 0;
        System.out.println("Passing Scores (>=75):");
        for (int i = 0; i < scores.length; i++) {
            if (scores[i] >= 75) {
                System.out.print(scores[i] + " ");
                count++;
            }
        }
    }

    // Print Failing Scores (<75)
    public void printFailingScores(int[] scores) {
        int count = 0;
        System.out.println("Failing Scores (<75):");
        for (int i = 0; i < scores.length; i++) {
            if (scores[i] < 75) {
                System.out.print(scores[i]+ " ");
                count++;
            }
        }
    }

    // Sort(Ascending)
    public void sortScores(int[] scores) {
        // Bubble sort
        for (int i = 0; i < scores.length - 1; i++) {
            for (int j = 0; j < scores.length - 1 - i; j++) {
                if (scores[j] > scores[j + 1]) {
                    int temp = scores[j];
                    scores[j] = scores[j + 1];
                    scores[j + 1] = temp;
                }
            }
        }
    }

    // Second Highest (without sorting)
    public int getSecondHighestScore(int[] scores) {
        int highest = scores[0];
        int second = scores[0];
        for (int i = 1; i < scores.length; i++) {
            if (scores[i] > highest) {
                second = highest;
                highest = scores[i];
            } else if (scores[i] > second && scores[i] != highest) {
                second = scores[i];
            }
        }
        return second;
    }
}