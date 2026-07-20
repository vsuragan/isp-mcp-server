const { dataverseGet } = require("./dataverseClient");

async function getAllCustomers() {

    const data = await dataverseGet(
        "/api/data/v9.2/crbab_ispcustomers"
    );

    return data.value;
}

async function getCustomerByName(customerName) {

    const query =
        `/api/data/v9.2/crbab_ispcustomers` +
        `?$filter=crbab_customername eq '${customerName}'`;

    const data = await dataverseGet(query);

    if (data.value.length === 0) {
        return {
            message: "Customer not found"
        };
    }

    return data.value[0];
}

module.exports = {
    getAllCustomers,
    getCustomerByName
};