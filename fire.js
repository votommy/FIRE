let year = new Date().getFullYear(); //Automatically update copyright year
document.getElementById("copyrightDate").innerHTML = "&copy;" + year + " Developed by Tommy Vo | All rights reserved";

let retirementMarker = 1;

function calculate() {
    const getSpending = document.getElementById("spending");
    const getInvestment = document.getElementById("investment");
    const getAnnualContribution = document.getElementById("annualContribution");
    const getReturnRate = document.getElementById("returnRate");
    const retirementGoal = (getSpending.value / (getReturnRate.value / 100)) * 12;
    const getAge = document.getElementById("age");
    document.getElementById("tommy").innerHTML = retirementGoal;
    
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
    const returnRate = (getReturnRate.value / 100) + 1;
    let age = getAge.value;
    if (age.length == 0) {
        age = 0;
    }
    
    let year = new Date().getFullYear();
    let count = 0;
    let xtraDigit = "0";
    retirementMarker = 1;
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
        let labelCol = "<tr><td>" + xtraDigit.concat(count) + "</td><td>Age " + age + "</td><td>" + year + "</td><td>" + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(investment) + "</td><td>" + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(gains) + "</td></tr>"
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
    highlightRetirement();
}

$(document).ready(function() { //jQuery
    $(function() { 
        function jsFunc(){ 
            $("tr:nth-child(" + retirementMarker + ")").css("color", "var(--tommagenta)");
            $("tr:nth-child(" + retirementMarker + ")").css("font-weight", "bold");
        }  
        highlightRetirement = jsFunc;
    })
}); //End jQuery