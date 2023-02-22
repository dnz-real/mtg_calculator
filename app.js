const calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener("click", calculateMortgage);

function toggleText() {
  var x = document.getElementById("myText");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function calculateMortgage() {
  const monthlyWage = Number(document.getElementById("monthlyWage").value);
  const interestRate = Number(document.getElementById("interestRate").value);
  const monthlyInsurance = Number(document.getElementById("monthlyInsurance").value);
  const propertyPrice = Number(document.getElementById("propertyPrice").value);
  const propertyTaxRate = Number(document.getElementById("propertyTaxRate").value);
  const hoa = Number(document.getElementById("hoa").value);
  const monthlyDebt = Number(document.getElementById("monthlyDebt").value);
  const term = Number(document.getElementById("term").value);
  const otherMonthlyHousingExpense = Number(document.getElementById("otherMonthlyHousing").value);
  const monthlyHOA = Number(document.getElementById("hoa").value);

  if (isNaN(monthlyWage) || isNaN(interestRate) || isNaN(monthlyInsurance) || isNaN(propertyPrice) || isNaN(propertyTaxRate) || isNaN(hoa) || isNaN(monthlyDebt) || isNaN(term)) {
    document.getElementById("result").innerHTML = "Please enter valid numbers for all fields.";
    return;
  }

  const monthlyPropertyTax = (propertyPrice * (propertyTaxRate / 100)) / 12;
  const r = (interestRate / 100) / 12;
  const n = term * 12;
  const w = (monthlyWage * 0.49) - otherMonthlyHousingExpense - hoa - monthlyDebt - monthlyInsurance - monthlyPropertyTax;
  const tio = monthlyPropertyTax + monthlyInsurance + otherMonthlyHousingExpense + monthlyHOA;

  const totalLoanAmountReceivable = w * ((1 - Math.pow(1 + r, -n)) / r);
  const estimatedMonthlyPayment = -w;



  function PMT(rate, nper, pv) {
    return rate * pv / (1 - Math.pow(1 + rate, -nper));
  }

  const comma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const resultMessage = `
  Estimated Max. Loan Amount $${comma(totalLoanAmountReceivable.toFixed(2))}.
  <br>(예상 최대 융자 금액은 $${comma(totalLoanAmountReceivable.toFixed(2))} 입니다.)
    `;

  const disclaimer = `
    이자율의 변동에 따라 최대 융자 금액은 다소 달라질 수 있습니다.
    <br>
    <br>
    $${comma(propertyPrice.toFixed(2))} 주택을 이자율 ${interestRate.toFixed(2)}% 로 융자를 받으실 경우,
    <br>
    <br>**다운페이를 20% ($${comma((propertyPrice * 0.2).toFixed(2))}) 하실 경우**
    <br>신청하시게 되는 총 융자 액수: $${comma((propertyPrice * 0.8).toFixed(2))}
    <br>세금, 보험, HOA 등이 포함된 월 페이먼트: $${comma((PMT(r, n, (propertyPrice * 0.8)) + tio).toFixed(2))}
    <br>
    <br>**다운페이를 25% ($${comma((propertyPrice * 0.25).toFixed(2))}) 하실 경우**
    <br>신청하시게 되는 총 융자 액수: $${comma((propertyPrice * 0.75).toFixed(2))}
    <br>세금, 보험, HOA 등이 포함된 월 페이먼트: $${comma((PMT(r, n, (propertyPrice * 0.75)) + tio).toFixed(2))}
    <br>
    <br>**다운페이를 30% ($${comma((propertyPrice * 0.3).toFixed(2))}) 하실 경우**
    <br>신청하시게 되는 총 융자 액수: $${comma((propertyPrice * 0.7).toFixed(2))}
    <br>세금, 보험, HOA 등이 포함된 월 페이먼트: $${comma((PMT(r, n, (propertyPrice * 0.7)) + tio).toFixed(2))}
    <br>
    <br>**다운페이를 40% ($${comma((propertyPrice * 0.4).toFixed(2))}) 하실 경우**
    <br>신청하시게 되는 총 융자 액수: $${comma((propertyPrice * 0.6).toFixed(2))}
    <br>세금, 보험, HOA 등이 포함된 월 페이먼트: $${comma((PMT(r, n, (propertyPrice * 0.6)) + tio).toFixed(2))}
    <br>
    <br>**다운페이를 50% ($${comma((propertyPrice * 0.5).toFixed(2))}) 하실 경우**
    <br>신청하시게 되는 총 융자 액수: $${comma((propertyPrice * 0.5).toFixed(2))}
    <br>세금, 보험, HOA 등이 포함된 월 페이먼트: $${comma((PMT(r, n, (propertyPrice * 0.5)) + tio).toFixed(2))}
    <br>
    <br>**다운페이를 60% ($${comma((propertyPrice * 0.6).toFixed(2))}) 하실 경우**
    <br>신청하시게 되는 총 융자 액수: $${comma((propertyPrice * 0.4).toFixed(2))}
    <br>세금, 보험, HOA 등이 포함된 월 페이먼트: $${comma((PMT(r, n, (propertyPrice * 0.4)) + tio).toFixed(2))}
    <br>
    <br>**다운페이를 80% ($${comma((propertyPrice * 0.8).toFixed(2))}) 하실 경우**
    <br>신청하시게 되는 총 융자 액수: $${comma((propertyPrice * 0.2).toFixed(2))}
    <br>세금, 보험, HOA 등이 포함된 월 페이먼트: $${comma((PMT(r, n, (propertyPrice * 0.2)) + tio).toFixed(2))}
    <br> 정도로 예상할 수 있습니다.
    <br>
    <br>
    주의: 다운페이를 20% 미만으로 하실 경우,<br> PMI(융자보험)로 인해 최대 융자 금액이 감소합니다.
      `;

  document.getElementById("result").innerHTML = resultMessage;
  document.getElementById("disclaimer").innerHTML = disclaimer;
}
