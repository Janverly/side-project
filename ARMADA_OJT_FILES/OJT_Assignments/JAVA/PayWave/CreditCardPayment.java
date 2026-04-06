public class CreditCardPayment implements PaymentMethod, Refundable {

    private String cardNumber;
    private double creditLimit;
    private double availableCredit;

    public CreditCardPayment(String cardNumber, double creditLimit) {
        this.cardNumber = cardNumber;
        this.creditLimit = creditLimit;
        this.availableCredit = creditLimit;
    }

    public boolean processPayment(double amount) {
        if (amount <= 0 || amount > availableCredit) {
            return false;
        }

        availableCredit = availableCredit - amount;
        return true;
    }

    public boolean processRefund(double amount) {
        availableCredit = availableCredit + amount;
        return true;
    }

    public String getPaymentDetails() {
        return "\nCreditCard [cardNumber = " + cardNumber + ", availableCredit = " + availableCredit + "]";
    }
}