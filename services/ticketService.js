const { dataverseGet } = require("./dataverseClient");

async function getAllTickets() {

    const data = await dataverseGet(
        "/api/data/v9.2/crbab_isptickets"
    );

    return data.value;
}

async function getTicketByTitle(ticketTitle) {

    const query =
        `/api/data/v9.2/crbab_isptickets` +
        `?$filter=crbab_tickettitle eq '${ticketTitle}'`;

    const data = await dataverseGet(query);

    if (data.value.length === 0) {
        return {
            message: "Ticket not found"
        };
    }

    return data.value[0];
}

module.exports = {
    getAllTickets,
    getTicketByTitle
};