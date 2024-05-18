window.onload = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const FourDigits = urlParams.get('FourDigits');
    
    document.getElementById("Success-Message").innerHTML = "Success! Thank you for your payment at **** **** **** " + FourDigits;

}