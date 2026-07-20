const {
    getCustomerByName
} = require("../services/customerService");

async function execute(customerName) {
    return await getCustomerByName(customerName);
}

module.exports = {
    name: "getCustomer",
    description: "Get customer details by name",
    execute
};