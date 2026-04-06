public class JarvisTest {

    public static void main(String[] args) {

        JarvisAssistant jarvis = new JarvisAssistant();

        // Test greetings
        System.out.println(jarvis.basicGreeting());
        System.out.println(jarvis.guestGreeting("Pepper Potts")); // will automatically say morning/afternoon/evening

        // Date announcement
        System.out.println(jarvis.dateAnnouncement());

        // Keyword responses (must type exact words)
        System.out.println(jarvis.respondBeforeFriday("Jarvis"));
        System.out.println(jarvis.respondBeforeFriday("Friday"));
        System.out.println(jarvis.respondBeforeFriday("Hello"));

        // Mood tests
        System.out.println(jarvis.jarvisMood("angry"));
        System.out.println(jarvis.jarvisMood("cheerful"));
        System.out.println(jarvis.jarvisMood("tired"));
        System.out.println(jarvis.jarvisMood("neutral"));
    }
}