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
    if (returnRate.length == 0) {
        returnRate = 0.0;
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
    
    const outputTable = document.getElementById("outputTable");
    var text = "<table><tr><th>#</th><th>Age</th><th>Year</th><th>Wealth</th><th>Gains</th></tr>";

    while (age <= endAge) {
        previousInvestment = investment;
        if (count > 9) {
            xtraDigit = "";
        }
        if (investment >= retirementGoal && retireYet == 0) {
            retirementMarker = count + 2; // +2 to compensate for header row and the fact that index starts with 1
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
    text += "</table>";
    outputTable.innerHTML = text;
    
    if (investment >= retirementGoal) {
        document.querySelector("tr:nth-child(" + retirementMarker + ")").style.color = "var(--tommagenta)";
        document.querySelector("tr:nth-child(" + retirementMarker + ")").style.fontWeight = "bold";
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