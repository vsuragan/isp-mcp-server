const { dataverseGet } = require("./dataverseClient");

const STATUS_MAP = {
    602240000: "New",
    602240001: "In Progress",
    602240002: "Resolved"
};

async function getTicketByTitle(ticketTitle) {

    const query =
        "/api/data/v9.2/crbab_isptickets" +
        `?$filter=crbab_title eq '${ticketTitle}'`;

    const data = await dataverseGet(query);

    if (!data.value.length) {
        return {
            message: "Ticket not found"
        };
    }

    const ticket = data.value[0];

    return {
        id: ticket.crbab_ispticketid,
        title: ticket.crbab_title,
        status:
            STATUS_MAP[ticket.crbab_status]
            || ticket.crbab_status,
        createdOn: ticket.createdon
    };
}

module.exports = {
    getTicketByTitle
};