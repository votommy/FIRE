function calculate() {
    const getSpending = document.getElementById("spending");
    const getInvestment = document.getElementById("investment");
    const getAnnualContribution = document.getElementById("annualContribution");
    const getReturnRate = document.getElementById("returnRate");
    const getInflationRate = document.getElementById("inflationRate");
    const getAge = document.getElementById("age");
    
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
        inflationRate = 2.52;
    }
    inflationRate /= 100;
    
    let returnRate = getReturnRate.value;
    let retirementReturnRate = returnRate;
    if (returnRate.length == 0) {
        returnRate = 0.0;
        retirementReturnRate = 0.0;
    }
    returnRate /= 100;
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
    let retireYet = 0;
    let endAge = 65;
    let previousInvestment = 0;
    let gains = 0;
    let failInvestment = 0;
    let failYear = 0;
    
    let retirementAge = 0;
    let retirementYear = 0;
    
    const outputTable = document.getElementById("outputTable");
    var text = "<table><tr><th>#</th><th>Age</th><th>Year</th><th>Wealth</th><th>Gains</th></tr>";

    while (age <= endAge) {
        previousInvestment = investment;
        if (count > 9) {
            xtraDigit = "";
        }
        if (age == 65) { //For when financial independence isn't achieved
            failInvestment = investment;
            failYear = year;
        }
        if (investment >= retirementGoal && retireYet == 0) {
            retirementMarker = count + 2; // +2 to compensate for header row and the fact that index starts with 1
            retirementAge = age;
            retirementYear = year;
            retireYet = 1;
            if (age > (endAge - 10)) { // Always show at LEAST 10 years after retirement
                endAge = age + 10;
            }
        }
        let labelCol = "<tr><td>" + xtraDigit.concat(count) + "</td><td>Age " + age + "</td><td>" + year + "</td><td>" + currency.format(investment) + "</td><td>" + currency.format(gains) + "</td></tr>"
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
    
    if (retireYet == 1) {
        document.querySelector("#outputParagraph").innerHTML = "<hr>Given the information you provided, you should be able to retire in <span style='font-weight: bold;'>" + retirementYear + "</span> at the age of <span style='font-weight: bold;'>" + retirementAge + "</span>.<br><br>Here\'s how it works:<br>During that year, your investments can generate enough money per year for you to live off of without having to work, theoretically.<br>Your retirement goal is to have at least <span style='font-weight: bold;'>" + currency.format(retirementGoal) + "</span> invested with a consistent return rate of <span style='font-weight: bold;'>" + retirementReturnRate + "%</span> (before inflation).<hr>";
        
        document.querySelector("tr:nth-child(" + retirementMarker + ")").style.color = "#808000";
        document.querySelector("tr:nth-child(" + retirementMarker + ")").style.backgroundColor = "#FFFF99";
        document.querySelector("tr:nth-child(" + retirementMarker + ")").style.fontWeight = "bold";
    }
    else {
        document.querySelector("#outputParagraph").innerHTML = "<hr>Given the information you provided, you cannot achieve financial independence before the age of 65.<br><br>In order to achieve financial independence, you must have at least <span style='font-weight: bold;'>" + currency.format(retirementGoal) + "</span> invested with a consistent return rate of <span style='font-weight: bold;'>" + retirementReturnRate + "%</span> (before inflation).<br>In " + failYear + ", when you are 65, you would have invested <span style='font-weight: bold;'>" + currency.format(failInvestment) + "</span>, which is less than what you'd need.<br><br>There's a combination of three things you can do to reach financial independence sooner:<br>1. Lower your monthly spending<br>2. Increase your annual contribution<br>3. Choose investments with a higher return rate<hr>";
    }
}

//Enter key activates Calculate button
document.getElementById("spending").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button").click();
    }
});
document.getElementById("investment").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button").click();
    }
});
document.getElementById("annualContribution").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button").click();
    }
});
document.getElementById("returnRate").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button").click();
    }
});
document.getElementById("inflationRate").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button").click();
    }
});
document.getElementById("age").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button").click();
    }
});

//Automatically update copyright year
const copyrightYear = new Date().getFullYear();
document.getElementById("copyrightDate").innerHTML = "&copy;" + copyrightYear + " Developed by Tommy Vo | All rights reserved";