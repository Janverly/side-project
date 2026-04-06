public class LibraryTest {
    public static void main(String[] args) {
        /* library accounts */
        LibraryAccount user1 = new LibraryAccount("Qwerty");
        LibraryAccount user2 = new LibraryAccount("Horheee");
        LibraryAccount user3 = new LibraryAccount("Kysicx");

        /* Set borrowed books for each user */
        user1.borrowBook(8); //try ko destroy, invalid, magiging 0
        user2.borrowBook(5);
        user3.borrowBook(4);

        /* borrowing summaries */
        System.out.println(user1.getAccountHolder() + " borrowed " + user1.getBorrowedBooks() + " books.");
        System.out.println(user2.getAccountHolder() + " borrowed " + user2.getBorrowedBooks() + " books.");
        System.out.println(user3.getAccountHolder() + " borrowed " + user3.getBorrowedBooks() + " books.");
        System.out.println();

        /* Return Test */
        user1.returnBook(2);
        user2.returnBook(3);
        user3.returnBook(1);
        System.out.println();

        /* display ulit but updated*/
        user1.displayAccount();
        user2.displayAccount();
        user3.displayAccount();
        System.out.println();

        /* Static Test */
        System.out.println("Total Accounts: " + LibraryAccount.getTotalAccounts());
        System.out.println("Total Borrowed Books: " + LibraryAccount.getTotalBorrowedBooks());
    }
}
