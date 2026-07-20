const { dataverseGet } = require("./dataverseClient");

const STATUS_MAP = {
    602240000: "Active",
    602240001: "Inactive",
    602240002: "Suspended"
};

const SERVICE_TYPE_MAP = {
    602240000: "DSL",
    602240001: "Cable",
    602240002: "Fiber"
};

async function getCustomerByName(customerName) {

    const query =
        "/api/data/v9.2/crbab_ispcustomers" +
        `?$filter=crbab_customername eq '${customerName}'`;

    const data = await dataverseGet(query);

    if (!data.value.length) {
        return {
            message: "Customer not found"
        };
    }

    const customer = data.value[0];

    return {
        id: customer.crbab_ispcustomerid,
        name: customer.crbab_customername,
        city: customer.crbab_city,
        status:
            STATUS_MAP[customer.crbab_status]
            || customer.crbab_status,
        serviceType:
            SERVICE_TYPE_MAP[customer.crbab_servicetype]
            || customer.crbab_servicetype,
        createdOn: customer.createdon
    };
}

module.exports = {
    getCustomerByName
};