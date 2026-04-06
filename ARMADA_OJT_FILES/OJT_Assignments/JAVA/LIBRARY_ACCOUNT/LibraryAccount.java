import java.util.Random;

public class LibraryAccount {
    /* MEMBER VARIABLES */
    private String accountHolder;
    private int borrowedBooks;
    private int accountNumber;
    private static int totalAccounts = 0;
    private static int totalBorrowedBooks = 0;
    private static final int BORROW_LIMIT = 7;

    /* Constructor */
    public LibraryAccount(String accountHolder) {
        this.accountHolder = accountHolder;
        this.borrowedBooks = 0;
        this.accountNumber = generateAccountNumber();
        totalAccounts++;
    }

    /* generate random 6-digit account number */
    private int generateAccountNumber() {
        Random rand = new Random();
        return 100000 + rand.nextInt(900000); // Generates 100000 to 999999 did search this T^Ts
    }

    /* Getters */
    public String getAccountHolder() {
        return accountHolder;
    }

    public int getBorrowedBooks() {
        return borrowedBooks;
    }

    public int getAccountNumber() {
        return accountNumber;
    }

    public static int getTotalAccounts() {
        return totalAccounts;
    }

    public static int getTotalBorrowedBooks() {
        return totalBorrowedBooks;
    }

    /* Setter for borrowedBooks */
    public void setBorrowedBooks(int borrowedBooks) {
        if (borrowedBooks >= 0 && borrowedBooks <= BORROW_LIMIT) {
            int difference = borrowedBooks - this.borrowedBooks;
            this.borrowedBooks = borrowedBooks;
            totalBorrowedBooks += difference;
        } else {
            System.out.println("Invalid number of borrowed books. Must be between 0 and " + BORROW_LIMIT + ".");
        }
    }

    /* display borrowed book*/
    public void borrowBook(int numBooks) {
        if (numBooks >= 0 && numBooks <= BORROW_LIMIT) {
            int difference = numBooks - this.borrowedBooks;
            this.borrowedBooks = numBooks;
            totalBorrowedBooks += difference;
        } else {
            System.out.println("Invalid number of borrowed books. Must be between 0 and " + BORROW_LIMIT + ".");
        }
    }

    /* Return the specific number of books */
    public void returnBook(int numBooksToReturn) {
        if (numBooksToReturn > borrowedBooks) {
            System.out.println(accountHolder + " cannot return " + numBooksToReturn + " books. Only has " + borrowedBooks + ".");
            return;
        }
        if (numBooksToReturn >= 0) {
            borrowedBooks -= numBooksToReturn;
            totalBorrowedBooks -= numBooksToReturn;
            System.out.println(accountHolder + " returned " + numBooksToReturn + " books. Now has " + borrowedBooks + ".");
        } else {
            System.out.println("Cannot return negative number of books.");
        }
    }

    public void displayAccount() {
        System.out.println(accountHolder + " has " + borrowedBooks + " borrowed books.");
    }
}
