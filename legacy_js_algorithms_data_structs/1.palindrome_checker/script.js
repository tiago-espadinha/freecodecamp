const userInput = document.getElementById("text-input");
const palindromeBtn = document.getElementById("check-btn");
const palindromeDiv = document.getElementById("result");

const checkForPalindrome = (input) => {
  const originalInput = input;
  if (input === "") {
    alert("Please input a value");
    return;
  }

  palindromeDiv.replaceChildren();

  const lowerCaseStr = input.replace(/[^A-Za-z0-9]/gi, "").toLowerCase();
  const isPalindrome = lowerCaseStr === [...lowerCaseStr].reverse().join("");
  const cleanedOriginal = originalInput
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const resultMsg = `<strong>${cleanedOriginal}</strong> ${isPalindrome ? "is" : "is not"} a palindrome.`;

  const pTag = document.createElement("p");
  pTag.className = "user-input";
  pTag.innerHTML = resultMsg;
  palindromeDiv.appendChild(pTag);

  palindromeDiv.classList.remove("hidden");
};

palindromeBtn.addEventListener("click", () => {
  checkForPalindrome(userInput.value);
  userInput.value = "";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkForPalindrome(userInput.value);
    userInput.value = "";
  }
});
