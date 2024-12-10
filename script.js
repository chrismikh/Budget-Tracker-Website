// button function when clicked on "Add Transaction" button
function addTransactionDisplay() 
{
    var form = document.getElementById("transactionFormContainer");
    var overlay = document.getElementById("mainContentOverlay");
    form.style.display = "block"; // show the form
    overlay.style.display = "block"; // show the overlay
}

// button function when clicked on "Cancel" button inside the forms container
function closeTransactionForm() 
{
    var form = document.getElementById("transactionFormContainer");
    var overlay = document.getElementById("mainContentOverlay");
    form.style.display = "none"; // hide the form
    overlay.style.display = "none"; // hide the overlay
}

// Storing the transaction form data
function submitTransactionForm(event) 
{
    event.preventDefault(); // prevent page reload on form submission

    // get form values
    const type = document.querySelector('input[name="type"]:checked')?.value; // type, income or expense
    const category = document.getElementById("category").value; // category
    const amount = document.getElementById("amount").value.trim(); // $ amount
    const date = document.getElementById("date").value; // date
    const description = document.getElementById("description").value.trim(); // description

    // validate the inputs
    if (!type || !category || !amount || !date) 
    {
        alert("All fields are required!");
        return;
    }

    if (isNaN(amount) || Number(amount) <= 0) 
    {
        alert("Amount must be a positive number!");
        return;
    }

    // format the data
    const transactionData = 
    {
        type,
        category,
        amount: parseFloat(amount).toFixed(2), // ensure two decimal places
        date,
        description,
    };

    // store in local storage
    saveTransactionToLocalStorage(transactionData);

    // clear the form
    document.getElementById("transactionForm").reset();

    // close the form and overlay
    closeTransactionForm();

    // refresh the transaction list when new transaction added
    loadTransactions();
}

function saveTransactionToLocalStorage(transaction) 
{
    // retrieve existing transactions from local storage or initialize an empty array
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction); // add the new transaction
    localStorage.setItem("transactions", JSON.stringify(transactions)); // save back to local storage
}

// Display Transactions
function loadTransactions() 
{
    // display pictures/icons of categories
    const categoryIcons = 
    {
        restaurant: "pics/restaurant.png",
        groceries: "pics/groceries.png",
        transport: "pics/transport.png",
        health: "pics/health.png",
        gifts: "pics/gifts.png",
        family: "pics/family.png",
        shopping: "pics/shopping.png",
        leisure: "pics/leisure.png",
        default: "pics/default.png" // fallback image
    };

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const transactionList = document.getElementById("transactionList");
    transactionList.innerHTML = "";

    transactions.forEach((transaction) => 
    {
        // create a container for each transaction
        const item = document.createElement("div");
        item.className = "transaction-item"; // base class for all transactions

        // add specific class based on the type
        if (transaction.type === "income") // for income
        {
            item.classList.add("income-item");
        } 
        else if (transaction.type === "expense") // for expense
        {
            item.classList.add("transaction-item-specific");
        }

        // format the category to capitalize the first letter
        const formattedCategory = transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1);

        // get the icon based on the category
        const iconSrc = categoryIcons[transaction.category] || categoryIcons.default;

        // add content to the item
        item.innerHTML = `
            <img src="${iconSrc}" alt="${transaction.category}" />
            <div>
                <strong>${transaction.type.toUpperCase()}</strong> - ${formattedCategory} <br />
                <strong>$${transaction.amount}</strong> - ${transaction.date} <br />
                ${transaction.description}
            </div>
        `;

        // append the item to the list
        transactionList.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", loadTransactions);