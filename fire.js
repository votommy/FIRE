function calculate() {
    const getSpending = document.querySelector("#spending");
    const getInvestment = document.querySelector("#investment");
    const getAnnualContribution = document.querySelector("#annualContribution");
    const getReturnRate = document.querySelector("#returnRate");
    const getInflationRate = document.querySelector("#inflationRate");
    const getAge = document.querySelector("#age");
    
    //If input is blank, use placeholder
    let spending = getSpending.value;
    if (spending.length == 0) {
        spending = 0.0;
    }
    
    let investment = getInvestment.value;
    if (investment.length == 0) {
        investment = 0.0;
    }
    
    let annualContribution = getAnnualContribution.value;
    if (annualContribution.length == 0) {
        annualContribution = 0.0;
    }
    
    let inflationRate = getInflationRate.value;
    if (inflationRate.length == 0) {
        inflationRate = 3.10;
    }
    inflationRate /= 100;
    
    let returnRate = getReturnRate.value;
    let retirementReturnRate = returnRate;
    if (returnRate.length == 0) {
        returnRate = 0.0;
        retirementReturnRate = 0.0;
    }
    returnRate /= 100;
    let adjustedReturnRate = (returnRate - inflationRate) * 100

    //Retire Status: 0 = false, 1 = true, 2-3 = insufficient return rate
    let retireStatus = 0;
    if(returnRate < inflationRate) {
        retireStatus = 2;
    }
    else if(returnRate == inflationRate) {
        retireStatus = 3;
    }
    returnRate = (returnRate - inflationRate) + 1;
    
    let age = getAge.value;
    if (age.length == 0) {
        age = 0;
    }
    
    let year = new Date().getFullYear();
    const currency = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
    let count = 0;
    let xtraDigit = "0";
    const retirementGoal = (spending / (returnRate - 1)) * 12;
    let retirementMarker = 2;
    let endAge = 65;
    let previousInvestment = 0;
    let gains = 0;
    let failInvestment = 0;
    let failYear = 0;
    
    let retirementAge = 0;
    let retirementYear = 0;
    
    const outputTable = document.querySelector("#outputTable");
    let text = "<table><tr><th>#</th><th>Age</th><th>Year</th><th>Wealth</th><th>Gains</th></tr>";

    while (age <= endAge) {
        previousInvestment = investment;
        if (count > 9) {
            xtraDigit = "";
        }
        if (age == 65) { //For when financial independence isn't achieved
            failInvestment = investment;
            failYear = year;
        }
        if (investment >= retirementGoal && retireStatus == 0) {
            retirementMarker = count + 2; // +2 to compensate for header row and the fact that index starts with 1
            retirementAge = age;
            retirementYear = year;
            retireStatus = 1;
            if (age > (endAge - 10)) { // Always show at LEAST 10 years after retirement
                endAge = age + 10;
            }
        }
        let labelCol = "<tr><td>" + xtraDigit.concat(count) + "</td><td>Age " + age + "</td><td>" + year + "</td><td>" + currency.format(investment) + "</td><td>" + (gains >= 0 ? '+' : '') + currency.format(gains) + "</td></tr>"
        text += labelCol;                    
        investment *= returnRate;
        investment = parseFloat(investment) + parseFloat(annualContribution);
        gains = investment - previousInvestment;
        age++;
        year++;
        count++;
    }
    text += "</table><hr><span style='font-weight: bold;'>Disclaimer: </span><span style='font-style: italic;'>This program is only for theoretical application only, and should not be used for financial advice; consult a professional for real retirement advice & guidance.</span>";
    outputTable.innerHTML = text;
    
    //Display different results depending if financial independence is achieved.
    if (retireStatus == 1) {
        document.querySelector("#outputParagraph").innerHTML = "<hr>Given the information you provided, you should be able to retire in <span style='font-weight: bold;'>" + retirementYear + "</span> at the age of <span style='font-weight: bold;'>" + retirementAge + "</span>.<br><br>Here\'s how it works:<br>During that year, your investments can generate enough money per year for you to live off of without having to work, theoretically.<br>Your retirement goal is to have at least <span style='font-weight: bold;'>" + currency.format(retirementGoal) + "</span> invested with a consistent return rate of " + retirementReturnRate + "% (<span style='font-weight: bold;'>" + adjustedReturnRate.toFixed(2) + "%</span> after inflation).<hr>";
        
        document.querySelector("tr:nth-child(" + retirementMarker + ")").style.color = "#474B3A";
        document.querySelector("tr:nth-child(" + retirementMarker + ")").style.backgroundColor = "#00550055";
        document.querySelector("tr:nth-child(" + retirementMarker + ")").style.fontWeight = "bold";
    }
    else if (retireStatus == 0) {
        document.querySelector("#outputParagraph").innerHTML = "<hr>Given the information you provided, you cannot achieve financial independence before the age of 65.<br><br>In order to achieve financial independence, you must have at least <span style='font-weight: bold;'>" + currency.format(retirementGoal) + "</span> invested with a consistent return rate of " + retirementReturnRate + "% (<span style='font-weight: bold;'>" + adjustedReturnRate.toFixed(2) + "</span> after inflation).<br>In " + failYear + ", when you are 65, you would have invested <span style='font-weight: bold;'>" + currency.format(failInvestment) + "</span>, which is less than what you'd need.<br><br>There's a combination of three things you can do to reach financial independence sooner:<br>1. Lower your monthly spending<br>2. Increase your annual contribution<br>3. Choose investments with a higher return rate<hr>";
    }
    else if (retireStatus == 2) {
        document.querySelector("#outputParagraph").innerHTML = "<hr>Given the information you provided, you cannot achieve financial independence before the age of 65.<br><br>It seems your investments' return rate is lower the rate of inflation, which means your money is losing value each year.<br><br>In order to reach financial independence, the return rate of your investments must generate enough money per year for you to live off of without having to work, theoretically.<hr>";
    }
    else if (retireStatus == 3) {
        document.querySelector("#outputParagraph").innerHTML = "<hr>Given the information you provided, you cannot achieve financial independence before the age of 65.<br><br>It seems your investments' return rate is equal to the rate of inflation, which means your money is not increasing in value each year.<br><br>In order to reach financial independence, the return rate of your investments must generate enough money per year for you to live off of without having to work, theoretically.<hr>";
    }
}

//Enter key activates Calculate button
function handleEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector("#button").click();
    }
}
// Write inputs to URL
function writeToURL(event, id) {
    let params = new URLSearchParams(window.location.search);
    params.set(id, event.target.value);
    window.history.pushState({}, '', window.location.pathname + '?' + params.toString());
}

document.querySelector("#spending").addEventListener("keyup", function(event) {
    handleEnter(event);
    writeToURL(event, "spending");
});
document.querySelector("#investment").addEventListener("keyup", function(event) {
    handleEnter(event);
    writeToURL(event, "investment");
});
document.querySelector("#annualContribution").addEventListener("keyup", function(event) {
    handleEnter(event);
    writeToURL(event, "annualContribution");
});
document.querySelector("#returnRate").addEventListener("keyup", function(event) {
    handleEnter(event);
    writeToURL(event, "returnRate");
});
document.querySelector("#inflationRate").addEventListener("keyup", function(event) {
    handleEnter(event);
    writeToURL(event, "inflationRate");
});
document.querySelector("#age").addEventListener("keyup", function(event) {
    handleEnter(event);
    writeToURL(event, "age");
});

// Load inputs from URL
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const inputs = ["spending", "investment", "annualContribution", "returnRate", "inflationRate", "age"]

    for (input of inputs) {
        const inputValue = params.get(input);
        if (input) {
          document.querySelector(`#${input}`).value = inputValue;
        }
    }
};

// Automatically update copyright year
const copyrightYear = new Date().getFullYear();
document.querySelector("#copyrightDate").innerHTML = "&copy;" + copyrightYear + " Developed by Tommy Vo | All rights reserved";