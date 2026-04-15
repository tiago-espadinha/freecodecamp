class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount > 0) {
      this.transactions.push({ type: "deposit", amount: amount });
      this.balance += amount;
      return `Successfully deposited $${amount}. New balance: $${this.balance}`;
    } else {
      return "Deposit amount must be greater than zero.";
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.transactions.push({ type: "withdraw", amount: amount });
      this.balance -= amount;
      return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
    } else {
      return "Insufficient balance or invalid amount.";
    }
  }

  checkBalance() {
    return `Current balance: $${this.balance}`;
  }

  listAllDeposits() {
    const deposits = this.transactions
      .filter((transaction) => transaction.type === "deposit")
      .map((transaction) => transaction.amount);

    return `Deposits: ${deposits.join(",")}`;
  }

  listAllWithdrawals() {
    const withdrawals = this.transactions
      .filter((transaction) => transaction.type === "withdraw")
      .map((transaction) => transaction.amount);

    return `Withdrawals: ${withdrawals.join(",")}`;
  }
}

// 1. Create a new instance of BankAccount named myAccount
const myAccount = new BankAccount();

// 2. Add at least five transactions (meets constraints: >=2 deposits, >=2 withdrawals)
console.log(myAccount.deposit(500)); // Deposit 1
console.log(myAccount.withdraw(50)); // Withdrawal 1
console.log(myAccount.deposit(200)); // Deposit 2
console.log(myAccount.withdraw(100)); // Withdrawal 2
console.log(myAccount.deposit(75)); // Deposit 3

// 3. Verify final state and test remaining methods
console.log("--- Account Summary ---");
console.log(myAccount.checkBalance()); // Should output > $100 (Current balance: $625)
console.log(myAccount.listAllDeposits()); // Deposits: 500,200,75
console.log(myAccount.listAllWithdrawals()); // Withdrawals: 50,100


// Function to update the UI text
function updateUI(message) {
    document.getElementById('message-display').innerText = message;
    document.getElementById('current-balance').innerText = myAccount.checkBalance();
}

// Event Handlers
function handleDeposit() {
    const amount = parseFloat(document.getElementById('amount-input').value);
    const result = myAccount.deposit(amount);
    updateUI(result);
    document.getElementById('amount-input').value = ''; // Clear input
}

function handleWithdraw() {
    const amount = parseFloat(document.getElementById('amount-input').value);
    const result = myAccount.withdraw(amount);
    updateUI(result);
    document.getElementById('amount-input').value = ''; // Clear input
}

function handleCheckBalance() {
    updateUI(myAccount.checkBalance());
}

function handleListDeposits() {
    updateUI(myAccount.listAllDeposits());
}

function handleListWithdrawals() {
    updateUI(myAccount.listAllWithdrawals());
}
