const fs = require("fs");

const tickets = JSON.parse(
    fs.readFileSync("./data/tickets.json", "utf8")
);

function getTicketStatus(ticketNumber) {
    return tickets.find(
        t => t.ticketNumber === ticketNumber
    ) || "Ticket not found";
}

function getOpenTickets() {
    return tickets.filter(
        t => t.status !== "Resolved"
    );
}

const customers = JSON.parse(
    fs.readFileSync("./data/customers.json", "utf8")
);

function getCustomer(customerId) {
    return customers.find(
        c => c.customerId === customerId
    ) || "Customer not found";
}

const command = process.argv[2];
const value = process.argv[3];

if (command === "ticket") {
    console.log(getTicketStatus(value));
}
else if (command === "open") {
    console.log(getOpenTickets());
}

else if (command === "customer") {
    console.log(getCustomer(value));
}
else {
    console.log("Commands:");
    console.log("node server.js ticket TN001");
    console.log("node server.js open");
}

