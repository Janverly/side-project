public class EWalletPayment implements PaymentMethod {

    private String walletID;
    private double balance;

    public EWalletPayment(String walletID, double balance) {
        this.walletID = walletID;
        this.balance = balance;
    }

    public boolean processPayment(double amount) {

        if (amount <= balance) {
            balance = balance - amount;
            return true;
        }

        return false;
    }

    public String getPaymentDetails() {
        return "\nEWallet [walletID = " + walletID + ", balance = " + balance + "]";
    }
}