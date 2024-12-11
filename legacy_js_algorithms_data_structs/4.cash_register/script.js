let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");
const statusScreen = document.getElementById("status-screen");
const penniesDiv = document.getElementById("pennies");
const nickelsDiv = document.getElementById("nickels");
const dimesDiv = document.getElementById("dimes");
const quartersDiv = document.getElementById("quarters");
const onesDiv = document.getElementById("ones");
const fivesDiv = document.getElementById("fives");
const tensDiv = document.getElementById("tens");
const twentiesDiv = document.getElementById("twenties");
const hundredsDiv = document.getElementById("hundreds");

priceScreen.textContent = `$${price}`;

const updateUI = (change) => {
  const currencyNameMap = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };

  if (change) {
    change.forEach(([changeDenomination, changeAmount]) => {
      const targetArr = cid.find(
        ([denominationName]) => denominationName === changeDenomination,
      );
      targetArr[1] =
        (Math.round(targetArr[1] * 100) - Math.round(changeAmount * 100)) / 100;
    });
  }

  cash.value = "";
  priceScreen.textContent = `$${price}`;

  Object.entries(currencyNameMap).forEach(([denominationName, displayName]) => {
    const targetDiv = document.getElementById(displayName.toLowerCase());
    const changeAmount =
      change.find(([name]) => name === denominationName)?.[1] || 0;
    const cidAmount = cid.find(([name]) => name === denominationName)?.[1] || 0;
    targetDiv.innerHTML = `${displayName}: <br>$${cidAmount.toFixed(2)} (-$${changeAmount.toFixed(2)})`;
    if (changeAmount !== 0) {
      changeDue.innerHTML += `${denominationName}: $${changeAmount} `;
    }
  });
};

const randomizePrice = () => {
  price = (Math.random() * 100).toFixed(2);
  priceScreen.textContent = `$${price}`;
};

const changeCalculator = () => {
  const cashInCents = Math.round(Number(cashInput.value) * 100);
  const priceInCents = Math.round(price * 100);
  if (cashInCents < priceInCents) {
    alert("Customer does not have enough money to purchase the item");
    cashInput.value = "";
    return false;
  }
  changeDue.innerHTML = "";
  if (cashInCents === priceInCents) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    cashInput.value = "";
    return true;
  }

  let changeInCents = cashInCents - priceInCents;

  const reversedCid = [...cid]
    .reverse()
    .map(([denominationName, amount]) => [
      denominationName,
      Math.round(amount * 100),
    ]);

  const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  const change = [];
  const totalCID = reversedCid.reduce((prev, [_, amount]) => prev + amount, 0);
  statusScreen.innerText = "OPEN";
  changeDue.innerHTML = "Status: OPEN ";

  if (totalCID < changeInCents) {
    statusScreen.innerText = "INSUFFICIENT_FUNDS";
    changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return false;
  }

  if (totalCID === changeInCents) {
    statusScreen.innerText = "CLOSED";
    changeDue.innerHTML = "Status: CLOSED";
  }

  for (let i = 0; i <= reversedCid.length; i++) {
    if (changeInCents >= denominations[i] && changeInCents > 0) {
      const [denominationName, total] = reversedCid[i];
      const possibleChange = Math.min(total, changeInCents);
      const count = Math.floor(possibleChange / denominations[i]);
      const amountInChange = count * denominations[i];
      changeInCents -= amountInChange;

      if (count > 0) {
        change.push([denominationName, amountInChange / 100]);
      }
    }
  }

  if (changeInCents > 0) {
    statusScreen.innerText = "INSUFFICIENT_FUNDS";
    changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return false;
  }

  updateUI(change);
  return true;
};

purchaseBtn.addEventListener("click", () => {
  if (changeCalculator()) {
    randomizePrice();
  }
});

cashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (changeCalculator()) {
      randomizePrice();
    }
  }
});
