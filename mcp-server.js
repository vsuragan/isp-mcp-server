const fs = require("fs");
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");

const server = new Server(
  {
    name: "isp-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const tickets = JSON.parse(
  fs.readFileSync("./data/tickets.json", "utf8")
);

const customers = JSON.parse(
  fs.readFileSync("./data/customers.json", "utf8")
);

const { getCustomerFromDataverse } = require("./dataverse");

getCustomerFromDataverse("CUST001");

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

function getCustomer(customerId) {
  return customers.find(
    c => c.customerId === customerId
  ) || "Customer not found";
}



const devices = JSON.parse(
  fs.readFileSync("./data/devices.json", "utf8")
);

function getDeviceStatus(deviceId) {
  return devices.find(
    d => d.deviceId === deviceId
  ) || "Device not found";
}


const tools = {
  getCustomer,
  getTicketStatus,
  getOpenTickets
};

const command = process.argv[2];
const value = process.argv[3];

if (command === "getCustomer") {
  console.log(getCustomer(value));
}
else if (command === "getTicketStatus") {
  console.log(getTicketStatus(value));
}
else if (command === "getOpenTickets") {
  console.log(getOpenTickets());
}
else if (command === "getDeviceStatus") {
  console.log(getDeviceStatus(value));
}
else {
  console.log("Available Tools:");
  console.log("getCustomer <customerId>");
  console.log("getTicketStatus <ticketNumber>");
  console.log("getOpenTickets");
}