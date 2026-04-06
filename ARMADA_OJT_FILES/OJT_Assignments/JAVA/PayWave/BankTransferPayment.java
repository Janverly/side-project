public class BankTransferPayment implements PaymentMethod, Refundable {

    private String accountNumber;
    private double balance;

    public BankTransferPayment(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public boolean processPayment(double amount) {

        if (amount > 0 && amount <= balance) {
            balance = balance - amount;
            return true;
        }

        return false;
    }

    public boolean processRefund(double amount) {
        balance = balance + amount;
        return true;
    }

    public String getPaymentDetails() {
        return "\nBankTransfer [accountNumber = " + accountNumber + ", balance = " + balance + "]";
    }
}