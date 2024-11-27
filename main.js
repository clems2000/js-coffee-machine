const readline = require('readline');

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promisified input function
function input(promptText) {
    return new Promise((resolve) => {
        rl.question(promptText, (answer) => {
            resolve(answer);
        });
    });
}

let coffeeMachine = [400, 540, 120, 9, 550];

async function main() {
    let action;
    do {
        action = await input("Write action (buy, fill, take, remaining, exit): ");
        await go(action, coffeeMachine);
    } while (action !== "exit");

    rl.close(); // Close the readline interface when done
}

async function go(action, coffeeMachine) {
    switch (action) {
        case "buy":
            coffeeMachine = await buy(coffeeMachine);
            break;
        case "fill":
            coffeeMachine = await fill(coffeeMachine);
            break;
        case "take":
            coffeeMachine = take(coffeeMachine);
            break;
        case "remaining":
            remaining(coffeeMachine);
            break;
        case "exit":
            return;
        default:
            console.log("This wasn't an option");
            break;
    }
}

async function fill(coffeeMachine) {
    let addAmount;

    addAmount = await input("Write how many ml of water you want to add: ");
    coffeeMachine[0] += parseInt(addAmount);

    addAmount = await input("Write how many ml of milk you want to add: ");
    coffeeMachine[1] += parseInt(addAmount);

    addAmount = await input("Write how many grams of coffee beans you want to add: ");
    coffeeMachine[2] += parseInt(addAmount);

    addAmount = await input("Write how many disposable coffee cups you want to add: ");
    coffeeMachine[3] += parseInt(addAmount);

    return coffeeMachine;
}

function take(coffeeMachine) {
    console.log(`I gave you $${coffeeMachine[4]}`);
    coffeeMachine[4] = 0;
    return coffeeMachine;
}

function remaining(coffeeMachine) {
    console.log(`The coffee machine has:
${coffeeMachine[0]} ml of water
${coffeeMachine[1]} ml of milk
${coffeeMachine[2]} g of coffee beans
${coffeeMachine[3]} disposable cups
$${coffeeMachine[4]} of money`);
}

async function buy(coffeeMachine) {
    let coffeeType = await input(
        "What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: "
    );

    switch (coffeeType) {
        case "1":
            coffeeMachine = espressoAmount(coffeeMachine);
            break;
        case "2":
            coffeeMachine = latteAmount(coffeeMachine);
            break;
        case "3":
            coffeeMachine = cappuccinoAmount(coffeeMachine);
            break;
        case "back":
            return coffeeMachine;
        default:
            console.log("This wasn't an option");
            break;
    }

    return coffeeMachine;
}

function espressoAmount(coffeeMachine) {
    if (coffeeMachine[0] < 250) {
        console.log("Sorry, not enough water!");
    } else if (coffeeMachine[2] < 16) {
        console.log("Sorry, not enough coffee beans!");
    } else if (coffeeMachine[3] < 1) {
        console.log("Sorry, not enough cups!");
    } else {
        console.log("I have enough resources, making you a coffee!");
        coffeeMachine[0] -= 250;
        coffeeMachine[2] -= 16;
        coffeeMachine[4] += 4;
        coffeeMachine[3] -= 1;
    }
    return coffeeMachine;
}

function latteAmount(coffeeMachine) {
    if (coffeeMachine[0] < 350) {
        console.log("Sorry, not enough water!");
    } else if (coffeeMachine[1] < 75) {
        console.log("Sorry, not enough milk!");
    } else if (coffeeMachine[2] < 20) {
        console.log("Sorry, not enough coffee beans!");
    } else if (coffeeMachine[3] < 1) {
        console.log("Sorry, not enough cups!");
    } else {
        console.log("I have enough resources, making you a coffee!");
        coffeeMachine[0] -= 350;
        coffeeMachine[1] -= 75;
        coffeeMachine[2] -= 20;
        coffeeMachine[4] += 7;
        coffeeMachine[3] -= 1;
    }
    return coffeeMachine;
}

function cappuccinoAmount(coffeeMachine) {
    if (coffeeMachine[0] < 200) {
        console.log("Sorry, not enough water!");
    } else if (coffeeMachine[1] < 100) {
        console.log("Sorry, not enough milk!");
    } else if (coffeeMachine[2] < 12) {
        console.log("Sorry, not enough coffee beans!");
    } else if (coffeeMachine[3] < 1) {
        console.log("Sorry, not enough cups!");
    } else {
        console.log("I have enough resources, making you a coffee!");
        coffeeMachine[0] -= 200;
        coffeeMachine[1] -= 100;
        coffeeMachine[2] -= 12;
        coffeeMachine[4] += 6;
        coffeeMachine[3] -= 1;
    }
    return coffeeMachine;
}

// Start the main function
main();
