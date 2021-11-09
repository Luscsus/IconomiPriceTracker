let Prices = [161.46639041, 189.6]
let RealPrices = [43.92, 83.42]
var OriginalDate = new Date("10/06/2021") // format m/d/y

const url = "https://api.iconomi.com/v1/strategies/CAR/price"

var NewPrice
var Expense = 0

function CheckPrice()
{
    fetch(url)
    .then(response => response.json())
    .then(data => {
        NewPrice = data.price
        CalculateExpenses()
        CalculatePrice()
    })
    .then(error => {
        console.log(error)
    })
}

function CalculateExpenses()
{
    var NewDate = new Date();
    NewDate.setHours(0, 0, 0, 0);
    
    var DiffTime = NewDate.getTime() - OriginalDate.getTime()
    var DiffDays = DiffTime / (1000 * 3600 * 24)
    Expense = DiffDays * 0,00547
}

function CalculatePrice() 
{
    var Change = 0
    var ChangeInPrice = 0
    var TotalPrice = 0;
    var TotalInvestment = 0;
    for (var a = 0; a < Prices.length; a++)
    { 
        if (NewPrice >= Prices[a])
        {
            Change = ((NewPrice - Prices[a]) / Prices[a]) * 100 
            ChangeInPrice = ((Change * RealPrices[a]) / 100)
            TotalPrice = TotalPrice + (ChangeInPrice + RealPrices[a])
        }
        else 
        {
            Change = ((Prices[a] - NewPrice) / Prices[a]) * 100 
            ChangeInPrice = ((Change * RealPrices[a]) / 100)
            TotalPrice = TotalPrice + (RealPrices[a] - ChangeInPrice)
        }
        TotalInvestment = TotalInvestment + RealPrices[a]
    }
    TotalPrice = TotalPrice - Expense
    if (ChangeInPrice > 0)
    {
        ChangeInPrice = TotalPrice - TotalInvestment
        Change = (ChangeInPrice / TotalInvestment) * 100
        document.getElementById("ProfitText").innerHTML = "Profit: " + Change.toFixed(2) + "%  / " + ChangeInPrice.toFixed(2) + "€";
    }
    else
    {
        ChangeInPrice = TotalInvestment - TotalPrice
        Change = (ChangeInPrice / totalInvestment) * 100
        document.getElementById("ProfitText").innerHTML = "Profit: -" + Change.toFixed(2) + "%  / -" + ChangeInPrice.toFixed(2) + "€";
    }
    document.getElementById("TextTotalInvested").innerHTML = "Total invested: " + TotalPrice.toFixed(2) + "€";
}
