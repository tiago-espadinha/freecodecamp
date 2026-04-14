class HashTable:
    def __init__(self):
        self.collection = {}

    def hash(self, key):
        return sum(ord(char) for char in key)

    def add(self, key, value):
        hashed = self.hash(key)
        if hashed not in self.collection:
            self.collection[hashed] = {}
        self.collection[hashed][key] = value

    def remove(self, key):
        hashed = self.hash(key)
        if hashed in self.collection and key in self.collection[hashed]:
            del self.collection[hashed][key]

    def lookup(self, key):
        hashed = self.hash(key)
        if hashed in self.collection and key in self.collection[hashed]:
            return self.collection[hashed][key]
        return None   


if __name__ == "__main__":
    ht = HashTable()

    # Add key-value pairs
    print("=== Adding entries ===")
    ht.add("name", "Alice")
    ht.add("age", 30)
    ht.add("city", "Lisbon")
    print("Added: name=Alice, age=30, city=Lisbon")

    # Lookup existing keys
    print("\n=== Lookups ===")
    print(f"name  -> {ht.lookup('name')}")
    print(f"age   -> {ht.lookup('age')}")
    print(f"city  -> {ht.lookup('city')}")

    # Lookup a key that doesn't exist
    print(f"email -> {ht.lookup('email')}")  # None

    # Remove a key
    print("\n=== Removing 'age' ===")
    ht.remove("age")
    print(f"age after removal -> {ht.lookup('age')}")  # None

    # Remove a key that doesn't exist (no error)
    print("\n=== Removing non-existent key 'phone' ===")
    ht.remove("phone")
    print("No error raised.")

    # Demonstrate collision handling
    print("\n=== Collision handling ===")
    print(f"hash('ab') = {ht.hash('ab')}")  # ord('a') + ord('b') = 97 + 98 = 195
    print(f"hash('ba') = {ht.hash('ba')}")  # ord('b') + ord('a') = 98 + 97 = 195
    ht.add("ab", "value for ab")
    ht.add("ba", "value for ba")
    print(f"lookup('ab') -> {ht.lookup('ab')}")
    print(f"lookup('ba') -> {ht.lookup('ba')}")
    print(f"Both stored in same bucket: {ht.collection[ht.hash('ab')]}")