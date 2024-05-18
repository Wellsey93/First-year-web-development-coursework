window.onload = () => {

    document.getElementById("Submit").addEventListener("click", (e) => {
        
        const CardNumber = document.getElementById("Card-Number").value;
        const ExpMonth = document.getElementById("Exp-Month").value;
        const ExpYear = document.getElementById("Exp-Year").value;
        const cvv = document.getElementById("CVV").value;
        // variables that get its value from the submitted forms

        CardNumberValidation(CardNumber);
        ExpDateMonth(ExpMonth);
        ExpDateYear(ExpYear);
        CvvCodeValidation(cvv);
        // these are called here to display a correct or an incorrect form

        if (CardNumberValidation(CardNumber) && ExpDateMonth(ExpMonth) && ExpDateYear(ExpYear) && CvvCodeValidation(cvv)) { // checks if all are true
            
            LoadJSON(OnlyInt(CardNumber), ExpYear, ExpMonth, cvv, LastFourDigits(OnlyInt(CardNumber))); // if so, load all of the values as params into the LoadJSON function

        }
      
        e.preventDefault();
    });

    const CardNumberValidation = (number) => { // A function for the validation of the given card number

        const regex = /^(5[1-5])\d{2}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/; // This regex validates the card number and also checks for any spaces or dashes in between
        
        if (regex.test(number)) {
            ReplaceClass("Card-Number", "Correct-Form");
            return true;
        }
        else {
            ReplaceClass("Card-Number", "Incorrect-Form");
            return false;
        }
        
    }

    const ExpDateMonth = (month) => { // A function for checking if the given month is valid

        const CurrentDate = new Date();

        if (parseInt(month) > CurrentDate.getMonth()) {
            ReplaceClass("Exp-Month", "Correct-Form");
            return true;
           
        } 
        else {
            ReplaceClass("Exp-Month", "Incorrect-Form");
            return false;
            
        }
        

    }

    const ExpDateYear = (year) => { // A function for checking if the given year is valid

        const CurrentDate = new Date();

        if (parseInt(year) >= CurrentDate.getFullYear()) {
            ReplaceClass("Exp-Year", "Correct-Form");
            return true;
            
        }
        else {
            ReplaceClass("Exp-Year", "Incorrect-Form");
            return false;
        }
    }

    const CvvCodeValidation = (cvv) => { // A function for checking the validity of the entered cvv code
        
        const regex = /^\d{3,4}$/; // this regex simply requires that it be a digit that has a length of three or four

        if(regex.test(cvv)) {
            ReplaceClass("CVV", "Correct-Form");
            return true;
        }
        else {
            ReplaceClass("CVV", "Incorrect-Form");
            return false;
        }
    }

    const LoadJSON = (CardNumber, ExpYear, ExpMonth, cvv, FourDigits) => { // A function for connecting to the server and getting a response, also loads a new webpage if successful

        const link = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";
        const data = {
            "master_card" : parseInt(CardNumber), 
            "exp_year" : parseInt(ExpYear),
            "exp_month" : parseInt(ExpMonth),
            "cvv_code" : cvv
        };

        console.log(data);

        fetch(link, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                throw "Bad data was sent to the server";
            } else {
                throw "Something went wrong";
            }
        })
        .then((resJson) => {
            alert(resJson.message);
            window.location.replace("success.html?FourDigits=" + FourDigits);
        })
        .catch((error) => {
            alert(error);
        });

    }

    const LastFourDigits = (CardNumber) => { // A function that returns the last four digits of the given card number
        
        let FourDigits = "";
        
        for (let i = CardNumber.length - 4; i < CardNumber.length; i++) {
            FourDigits += CardNumber[i];
        }

        return FourDigits;
    }

    const OnlyInt = (CardNumber) => { // A function that iterates through the given card number and returns only the digits with no dashes or white spaces
        
        let OnlyIntegers = "";
        
        for (let i = 0; i < CardNumber.length; i++) {
            if (CardNumber[i] === " " || CardNumber[i] === "-") {
            } 
            else {
                OnlyIntegers += CardNumber[i];
            }
        }
        return OnlyIntegers;
    }

    const ReplaceClass = (Id, NewClass) => { // A simple abbreviation to shorten getElementById
        document.getElementById(Id).className = NewClass;
    }

}