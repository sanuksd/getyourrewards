function redeemCoupon() {
    let couponCode = document.getElementById("coupon").value;
    let upiAddress = document.getElementById("upi").value;
    let transactionId = "TXN" + Math.floor(Math.random() * 1000000);

    db.collection("coupons").doc(couponCode).get().then(doc => {
        if (doc.exists && !doc.data().used) {
            db.collection("coupons").doc(couponCode).update({
                used: true,
                upi: upiAddress,
                status: "Pending",
                transactionId: transactionId
            });
            window.location.href = "success.html?txn=" + transactionId;
        } else {
            alert("Invalid or Used Coupon!");
        }
    });
}

function trackPayment() {
    let transactionId = document.getElementById("transactionId").value;
    db.collection("coupons").doc(transactionId).get().then(doc => {
        document.getElementById("statusMessage").innerText = doc.exists ? "Status: " + doc.data().status : "Transaction not found!";
    });
}