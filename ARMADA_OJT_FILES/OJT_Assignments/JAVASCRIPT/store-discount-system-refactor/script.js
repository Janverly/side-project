function getDiscount(customer_type, purchase_amount) {

    let discount = 0;

    if (purchase_amount < 0) {
        console.log("Invalid! Purchase amount cannot be 0 or negative.");
        return null;
    }

    //neither of the choices
    if (customer_type !== "member" && customer_type !== "non-member") {
        customer_type = "non-member"; //para magproceed pa rin kahit scammer 
    }

    if (customer_type === "member") {
        if (purchase_amount >= 1000) {
            discount = 0.2;
        } else if (purchase_amount >= 500) {
            discount = 0.1;
        } else {
            discount = 0.05;
        }
    } 
    else { // non-member
        if (purchase_amount >= 1000) {
            discount = 0.1;
        } else if (purchase_amount >= 500) {
            discount = 0.05;
        }
    }

    return discount;
}

function calculateFinalPrice (purchase_amount, discountRate){
    return purchase_amount - (purchase_amount * discountRate);
}

const customers = [
    {name: "ALice", customer_type: "member", purchase_amount: 100},
    {name: "Brian", customer_type: "member", purchase_amount: 800},
    {name: "Chloe", customer_type: "non-member", purchase_amount: 1200},
    //test
    {name: "Duds", customer_type: "scammer", purchase_amount: 501}
];

for (let i = 0; i < customers.length; i++){
    let customer = customers[i];
    let discount = getDiscount(customer.customer_type, customer.purchase_amount);

    if (discount === null) continue;

    let finalPrice = calculateFinalPrice(customer.purchase_amount, discount);

    console.log("==================================");
    console.log("Customer Name:", customer.name);
    console.log("Customer Type:", customer.customer_type);
    console.log("Purchase Amount: $" + customer.purchase_amount);
    console.log("Discount Applied:", discount * 100 + "%");
    console.log("Final Price: $" + finalPrice);
    console.log("==================================");
}


       
