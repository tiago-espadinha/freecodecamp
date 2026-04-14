class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []

    def deposit(self, amount, description=""):
        self.ledger.append({"amount": amount, "description": description})

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({"amount": -amount, "description": description})
            return True
        return False

    def get_balance(self):
        return sum(item["amount"] for item in self.ledger)

    def transfer(self, amount, destination):
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {destination.name}")
            destination.deposit(amount, f"Transfer from {self.name}")
            return True
        return False

    def check_funds(self, amount):
        return amount <= self.get_balance()

    def __str__(self):
        title = self.name.center(30, "*") + "\n"
        items = ""
        for entry in self.ledger:
            desc = entry["description"][:23].ljust(23)
            amount = f"{entry['amount']:.2f}"[:7].rjust(7)
            items += f"{desc}{amount}\n"
        total = f"Total: {self.get_balance():.2f}"
        return title + items + total


def create_spend_chart(categories):
    # Calculate withdrawals per category
    withdrawals = []
    for cat in categories:
        total = sum(-item["amount"] for item in cat.ledger if item["amount"] < 0)
        withdrawals.append(total)

    total_spent = sum(withdrawals)

    # Calculate percentages rounded down to nearest 10
    percentages = [int((w / total_spent) * 100) // 10 * 10 for w in withdrawals]

    # Build chart
    lines = ["Percentage spent by category"]

    for level in range(100, -1, -10):
        row = f"{level:3}| "
        for pct in percentages:
            row += "o  " if pct >= level else "   "
        lines.append(row)

    # Horizontal line
    lines.append("    " + "-" * (len(categories) * 3 + 1))

    # Category names vertically
    max_len = max(len(cat.name) for cat in categories)
    for i in range(max_len):
        row = "     "
        for cat in categories:
            if i < len(cat.name):
                row += cat.name[i] + "  "
            else:
                row += "   "
        lines.append(row)

    return "\n".join(lines)

if __name__ == "__main__":
    # --- Setup categories ---
    food = Category("Food")
    clothing = Category("Clothing")
    auto = Category("Auto")
    entertainment = Category("Entertainment")
 
    # --- Food transactions ---
    food.deposit(1000, "initial deposit")
    food.withdraw(10.15, "groceries")
    food.withdraw(15.89, "restaurant and more food for dessert")
    food.transfer(50, clothing)
 
    # --- Clothing transactions ---
    clothing.deposit(500, "paycheck")
    clothing.withdraw(25.55, "shirt")
    clothing.withdraw(100.00, "shoes")
    clothing.transfer(30, entertainment)
 
    # --- Auto transactions ---
    auto.deposit(2000, "savings")
    auto.withdraw(33.40, "gas")
    auto.withdraw(100.50, "repair")
    auto.withdraw(200.00, "insurance")
 
    # --- Entertainment transactions ---
    entertainment.deposit(300, "gift")
    entertainment.withdraw(50.00, "concert ticket")
    entertainment.withdraw(12.99, "streaming service")
 
    # --- Print each category ledger ---
    print("=" * 40)
    print("         CATEGORY LEDGERS")
    print("=" * 40)
    print(food)
    print()
    print(clothing)
    print()
    print(auto)
    print()
    print(entertainment)
 
    # --- Test check_funds ---
    print("\n" + "=" * 40)
    print("         FUND CHECKS")
    print("=" * 40)
    print(f"Food balance:          ${food.get_balance():.2f}")
    print(f"Clothing balance:      ${clothing.get_balance():.2f}")
    print(f"Auto balance:          ${auto.get_balance():.2f}")
    print(f"Entertainment balance: ${entertainment.get_balance():.2f}")
    print()
    print(f"Withdraw $5000 from Food? {food.withdraw(5000, 'big purchase')} (expected: False)")
    print(f"Withdraw $100 from Auto?  {auto.withdraw(100, 'oil change')} (expected: True)")
    print(f"Transfer $999 from Clothing to Auto? {clothing.transfer(999, auto)} (expected: False)")
 
    # --- Spend chart ---
    print("\n" + "=" * 40)
    print("         SPEND CHART")
    print("=" * 40)
    print(create_spend_chart([food, clothing, auto, entertainment]))