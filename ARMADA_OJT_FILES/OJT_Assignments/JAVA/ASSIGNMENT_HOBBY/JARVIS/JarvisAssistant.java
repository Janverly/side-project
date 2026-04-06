import java.util.Date;

public class JarvisAssistant {

    // 1. Basic Greeting
    public String basicGreeting() {
        return "Greetings, Sir. How may I assist you today?";
    }

    // 2. Personalized Greeting (automatic time-based)
    public String guestGreeting(String name) {
        Date now = new Date();
        int hour = now.getHours(); // 0-23
        String period;

        if (hour < 12) {
            period = "morning";
        } else if (hour < 18) {
            period = "afternoon";
        } else {
            period = "evening";
        }

        return "Good " + period + ", " + name + ". How may I assist you?";
    }

    // 3. Date Announcement
    public String dateAnnouncement() {
        Date currentDate = new Date();
        return "Hello, it is currently " + currentDate;
    }

    // 4. Respond intelligently to exact keywords (no contains)
    public String respondBeforeFriday(String conversation) {
        if (conversation.equalsIgnoreCase("friday")) {
            return "Right away, Sir. Although she's still learning.";
        } else if (conversation.equalsIgnoreCase("jarvis")) {
            return "At your service, Sir.";
        } else {
            return "Very well. Carrying on.";
        }
    }

    // 5. Mood changer, still base ont he input, but there's no use rinput T^T, it'll print everything
    public String jarvisMood(String mood) {
        if (mood.equalsIgnoreCase("angry")) {
            return "SIR, I AM PRETTY BAD MOOD RIGHT NOW!!";
        } else if (mood.equalsIgnoreCase("cheerful")) {
            return "Wonderful choice, Sir! Everything is running smoothly!";
        } else if (mood.equalsIgnoreCase("tired")) {
            return "Processing... Sir, perhaps we both need rest.";
        } else {
            return "My emotional parameters are stable, Sir.";
        }
    }
}