// button function when clicked on "Add Expense" button
function addExpenseDisplay() 
{
    var form = document.getElementById("expenseFormContainer");
    var overlay = document.getElementById("mainContentOverlay");
    form.style.display = "block"; // show the form
    overlay.style.display = "block"; // show the overlay
}

// button function when clicked on "Cancel" button inside the forms container
function closeExpenseForm() 
{
    var form = document.getElementById("expenseFormContainer");
    var overlay = document.getElementById("mainContentOverlay");
    form.style.display = "none"; // hide the form
    overlay.style.display = "none"; // hide the overlay
}

// Storing the expenses forms data
function submitExpenseForm(event) 
{

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
    const expenseData = 
    {
        type,
        category,
        amount: parseFloat(amount).toFixed(2), // ensure two decimal places
        date,
        description,
    };

    // store in local storage
    saveExpenseToLocalStorage(expenseData);

    // clear the form
    document.getElementById("expenseForm").reset();

    // close the form and overlay
    closeExpenseForm();
}

function saveExpenseToLocalStorage(expense) 
{
    // retrieve existing expenses from local storage or initialize an empty array
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense); // add the new expense
    localStorage.setItem("expenses", JSON.stringify(expenses)); // save back to local storage
}

// Display Expenses
function loadExpenses() 
{
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const expenseList = document.getElementById("expenseList"); // add a container for the list in HTML
    expenseList.innerHTML = ""; // clear any existing content

    expenses.forEach((expense, index) => 
    {
        const item = document.createElement("div");
        item.className = "expense-item";
        item.innerHTML = `
            <p>${index + 1}. ${expense.type} - ${expense.category} - $${expense.amount} - ${expense.date} - ${expense.description}</p>
        `;
        expenseList.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", loadExpenses);