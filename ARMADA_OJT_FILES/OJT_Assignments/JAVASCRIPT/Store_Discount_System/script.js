let customer_type = "member";

let purchase_amount = 1200;
let discount = 0;

if(purchase_amount < 0){
    console.log("Invalid! Purcahse amount cannot be 0 or negative.");
}
else if (customer_type !== "member" && customer_type !== "non-member") {
    console.log("Invalid customer type. Must be 'member' or 'non-member'.");
}
else {
    if (customer_type === "member" && (purchase_amount >= 1000)){
        discount = 0.2;
    }
    else if (customer_type === "member" && (purchase_amount>= 500 && purchase_amount <=1000)){
        discount = 0.1;
    }
    else if (customer_type === "member" && (purchase_amount <= 500)){
        discount = 0.05;
    }
    else if (customer_type === "non-member" && (purchase_amount >= 1000)){
        discount = 0.1;
    }
    else if (customer_type === "non-member" && (purchase_amount >= 500 && purchase_amount <=1000)){
        discount = 0.05;
    }
    else if (customer_type === ""){
        discount = 0;
    }
    else{
        console.log ("No discount available.");
    }
    console.log("==================================")
    console.log("Customer Type: " + customer_type);
    console.log("Purchase Amount: $"+ purchase_amount);
    console.log("Discount Applied: "+ (discount * 100) +"%"); 
    console.log("Final Price: $"+ (purchase_amount -(purchase_amount * discount)));
    console.log("==================================")
}
