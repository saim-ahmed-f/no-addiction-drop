import LoadRazorPay from "./loadRazorpay"

 
import  toast  from "../spinnerComponents/noitificationComp"

export default async function displayRazorpay(mainAllValue){

    
    let collectingAllData = []

    const res = await LoadRazorPay('https://checkout.razorpay.com/v1/checkout.js')

    if(!res){
        toast({type : "error" , message : "Razorpay SDK failed to load !!!"})
    }

    
    const RezorPayres = await fetch(`https://alcoban-vbk7q.ondigitalocean.app/Orders/Razorpay_Order_creation/${mainAllValue.quantity}/${mainAllValue.product_detail.id}/`)
    
    const MainPaymentDetail = await RezorPayres.json()

    const genrateName = mainAllValue.postValue.first_name + " " + mainAllValue.postValue.last_name

    const options = {
        key: 'rzp_test_OmeeTYyShQf7Lg',
        currency: 'INR',
        amount: MainPaymentDetail.amount,
        order_id: MainPaymentDetail.id,
        name: 'SRPN',
        description: 'Thank you for nothing. Please give us some money',
        image: mainAllValue.brandLogo,
        handler: function (response) {
            collectingAllData.push(response.razorpay_payment_id)
            collectingAllData.push(response.razorpay_order_id)
            collectingAllData.push(response.razorpay_signature)
        },
        prefill: {
            name : genrateName ,
            email: mainAllValue.postValue.email_id,
            phone_number: mainAllValue.postValue.phone_no
        }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()

    


    
    return collectingAllData
}



