import java.util.ArrayList;

public class Test {

    public static void main(String[] args) {

        ArrayList<PaymentMethod> payments = new ArrayList<>();

        payments.add(new CreditCardPayment("CC123", 5000));
        payments.add(new EWalletPayment("CashG123", 1200));
        payments.add(new BankTransferPayment("QWE321", 8000));

        for (PaymentMethod method : payments) {

            method.processPayment(1000);

            System.out.println(method.getPaymentDetails());
        }
    }
}