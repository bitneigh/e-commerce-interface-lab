/**
 * Lab 4: JavaScript Fundamentals & Git Concepts
 * File: solution.js
 */

// Problem 1: The Strict Type Checker

// PINUELA, BRITNEY ASHLEY C. AND PAJANOSTAN, STEPAHANIE D.
function checkVariable(input) {
    switch (typeof input) {
        case "string":
            return "string";
        case "number":
            return "number";
        case "boolean":
            return "boolean";
        case "bigint":
            return "bigint";
        case "undefined":
            return "undefined";
        case "object":
            // In JS, typeof null is also "object", satisfying the requirement
            return "object";
        default:
            return "unknown";
    }
}

// Problem 2: Secure ID Generator
function generateIDs(count) {
    const ids = [];
    for (let i = 0; i < count; i++) {
        // Use continue to skip the number 5
        if (i === 5) {
            continue;
        }
        ids.push(`ID-${i}`);
    }
    return ids;
}

// Problem 3: The Functional Sum
function calculateTotal(...numbers) {
    return numbers.reduce((accumulator, current) => {
        if (typeof current !== "number") {
            throw new TypeError("Invalid input: All arguments must be numbers");
        }
        return accumulator + current;
    }, 0);
}

// Problem 4: Leaderboard Filter
function getTopScorers(playerList) {
    return playerList
        .filter(player => player.score > 8) // Filter scores > 8
        .map(player => player.name)         // Extract names only
        .join(", ");                        // Join with comma and space
}

// Problem 5: The Private Inventory
class Item {
    // Private property initialized to 0.1
    #discount = 0.1;

    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    get finalPrice() {
        return this.price - (this.price * this.#discount);
    }
}

// Problem 6: Robust Division
function safeDivide(a, b) {
    try {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a / b;
    } catch (error) {
        // Return the error message string
        return error.message;
    } finally {
        // This always runs
        console.log("Operation attempted");
    }
}

// ==========================================
// TESTING / DEMONSTRATION
// ==========================================

console.log("--- PROBLEM 1 ---");
console.log(checkVariable("Hello")); // string
console.log(checkVariable(100n));    // bigint
console.log(checkVariable(null));    // object

console.log("\n--- PROBLEM 2 ---");
console.log(generateIDs(7)); // ["ID-0", "ID-1", "ID-2", "ID-3", "ID-4", "ID-6"]

console.log("\n--- PROBLEM 3 ---");
try {
    console.log(calculateTotal(10, 20, 30)); // 60
    // console.log(calculateTotal(10, "A")); // This would throw the TypeError
} catch (e) {
    console.error(e.message);
}

console.log("\n--- PROBLEM 4 ---");
const players = [
    {name: "Alice", score: 10}, {name: "Bob", score: 5},
    {name: "Charlie", score: 12}, {name: "David", score: 7},
    {name: "Eve", score: 9}, {name: "Frank", score: 4},
    {name: "Grace", score: 11}, {name: "Heidi", score: 6},
    {name: "Ivan", score: 15}, {name: "Judy", score: 8}
];
console.log(getTopScorers(players)); // Alice, Charlie, Eve, Grace, Ivan

console.log("\n--- PROBLEM 5 ---");
const laptop = new Item("Laptop", 1000);
console.log(`Item: ${laptop.name}, Final Price: ${laptop.finalPrice}`); // 900

console.log("\n--- PROBLEM 6 ---");
console.log("Result:", safeDivide(10, 2));
console.log("Result:", safeDivide(10, 0));