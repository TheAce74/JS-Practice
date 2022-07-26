const clipboard = document.querySelector("img");
const result = document.querySelector(".password input");
const length = document.querySelector("#length");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const button = document.querySelector("button");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

//enter key activates click events
clipboard.addEventListener("keydown", clickify);

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("keydown", clickify);
});

function clickify(e) {
  if (e.key === "Enter") {
    e.target.click();
  }
}

const randomFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

button.addEventListener("click", () => {
  const charLength = +length.value;
  const hasLower = lowercase.checked;
  const hasUpper = uppercase.checked;
  const hasNumbers = numbers.checked;
  const hasSymbols = symbols.checked;

  result.value = generatePassword(
    hasLower,
    hasUpper,
    hasNumbers,
    hasSymbols,
    charLength
  );
});

//Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  let password = "";

  const typesCount = lower + upper + number + symbol;

  const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount == 0) return "";

  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0];

      password += randomFunction[funcName]();
    });
  }
  return password.slice(0, length);
}

//Generator functions
function getRandomLower() {
  let lowerCaseLetter = Math.floor(Math.random() * 26) + 97;
  return String.fromCharCode(lowerCaseLetter);
}

function getRandomUpper() {
  let upperCaseLetter = Math.floor(Math.random() * 26) + 65;
  return String.fromCharCode(upperCaseLetter);
}

function getRandomNumber() {
  let number = Math.floor(Math.random() * 10) + 48;
  return String.fromCharCode(number);
}

function getRandomSymbol() {
  let symbols = "!@#$%^&*()-_=+[]{}\\|~/<>?";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

//copy password to clipboard
clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = result.value;

  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});
