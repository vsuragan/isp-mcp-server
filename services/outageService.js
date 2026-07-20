const { dataverseGet } = require("./dataverseClient");

async function getAllOutages() {

    const data = await dataverseGet(
        "/api/data/v9.2/crbab_ispoutages"
    );

    return data.value;
}

async function getOpenOutages() {

    const query =
        `/api/data/v9.2/crbab_ispoutages` +
        `?$filter=crbab_status eq 'Open'`;

    const data = await dataverseGet(query);

    return data.value;
}

module.exports = {
    getAllOutages,
    getOpenOutages
};