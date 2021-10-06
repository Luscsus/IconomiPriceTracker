const FirstPrice = 161.46639041
const FirstRealPrice = 43.92

const url = "https://api.iconomi.com/v1/strategies/CAR/price"

var NewPrice

function CheckPrice()
{
    fetch(url)
    .then(response => response.json())
    .then(data => {
        NewPrice = data.price
        CalculatPrice()
    })
    .then(error => {
        console.log(error)
    })
}

function CalculatPrice() 
{
    var Change = 0
    var ChangeInPrice = 0

    if (NewPrice >= FirstPrice)
    {
        Change = ((NewPrice - FirstPrice) / FirstPrice) * 100 
        ChangeInPrice = (Change * FirstRealPrice) / 100
        TotalPrice = ChangeInPrice + FirstRealPrice
    }
    else 
    {
        Change = ((FirstPrice - NewPrice) / FirstPrice) * 100 
        ChangeInPrice = (Change * FirstRealPrice) / 100
        TotalPrice = FirstRealPrice - ChangeInPrice
    }

    document.getElementById("ProfitText").innerHTML = "Profit: " + Change.toFixed(2) + "%";
    document.getElementById("TextTotalInvested").innerHTML = "Total invested: " + TotalPrice.toFixed(2) + "€";
}
