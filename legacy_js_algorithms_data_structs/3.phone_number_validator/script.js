const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const checkValid = (inputNumber) => {
  if (inputNumber === "") {
    alert("Please provide a phone number");
    return;
  }

  const countryCode = "^(1\\s?)?";
  const areaCode = "(\\([0-9]{3}\\)|[0-9]{3})";
  const spaceDashes = "[\\s\\-]?";
  const phoneNumber = "[0-9]{3}[\\s\\-]?[0-9]{4}$";
  const phoneRegex = new RegExp(
    `${countryCode}${areaCode}${spaceDashes}${phoneNumber}`,
  );

  const isPhoneValid = phoneRegex.test(inputNumber);
  const pTag = document.createElement("p");
  const outputText = `${isPhoneValid ? "Valid" : "Invalid"} US number: ${inputNumber}`;
  pTag.innerText = outputText;
  resultsDiv.append(pTag);
};

clearBtn.addEventListener("click", () => {
  resultsDiv.innerHTML = "";
});

checkBtn.addEventListener("click", () => {
  checkValid(userInput.value);
  userInput.value = "";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkValid(userInput.value);
    userInput.value = "";
  }
});
