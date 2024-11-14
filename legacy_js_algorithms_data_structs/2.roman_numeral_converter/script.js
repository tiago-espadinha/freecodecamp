const userInput = document.getElementById("number");
const romanBtn = document.getElementById("convert-btn");
const romanDiv = document.getElementById("output");

const convertRoman = (inputNumber) => {
  const romanReference = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  const romanNumber = [];

  romanReference.forEach(function (arr) {
    while (inputNumber >= arr[1]) {
      romanNumber.push(arr[0]);
      inputNumber -= arr[1];
    }
  });
  return romanNumber.join("");
};

const validInput = (str, int) => {
  let errorText = "";

  if (!str || str.match(/[e.]/g)) {
    errorText = "Please enter a valid number.";
  } else if (int < 1) {
    errorText = "Please enter a number greater than or equal to 1.";
  } else if (int > 3999) {
    errorText = "Please enter a number less than or equal to 3999.";
  } else {
    return true;
  }
  const pTag = document.createElement("p");
  pTag.className = "user-input";
  pTag.innerText = errorText;
  romanDiv.appendChild(pTag);
  return false;
};

const updateUI = () => {
  const numStr = document.getElementById("number").value;
  const int = parseInt(numStr, 10);

  romanDiv.replaceChildren();

  if (validInput(numStr, int)) {
    const pTag = document.createElement("p");
    pTag.className = "user-input";
    pTag.innerText = convertRoman(int);
    pTag.style.fontFamily = '"Times New Roman", Times, serif';
    romanDiv.appendChild(pTag);
    romanDiv.classList.remove("hidden");
  }
};

romanBtn.addEventListener("click", () => {
  updateUI();
  userInput.value = "";
});

userInput.addEventListener("keydown", (input) => {
  if (input.key === "Enter") {
    updateUI();
    userInput.value = "";
  }
});
