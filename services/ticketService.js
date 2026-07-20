const { dataverseGet } = require("./dataverseClient");

const STATUS_MAP = {
    602240000: "New",
    602240001: "In Progress",
    602240002: "Resolved"
};

async function getAllTickets() {

    const data = await dataverseGet(
        "/api/data/v9.2/crbab_isptickets"
    );

    return data.value.map(ticket => ({
        id: ticket.crbab_ispticketid,
        ticketNumber: ticket.crbab_ticketnumber,
        title: ticket.crbab_tickettitle,
        description: ticket.crbab_description,
        status:
            STATUS_MAP[ticket.crbab_status]
            || ticket.crbab_status,
        createdOn: ticket.createdon
    }));
}

async function getTicketByTitle(ticketTitle) {

    const query =
        "/api/data/v9.2/crbab_isptickets" +
        `?$filter=crbab_tickettitle eq '${ticketTitle}'`;

    const data = await dataverseGet(query);

    if (!data.value.length) {
        return {
            message: "Ticket not found"
        };
    }

    const ticket = data.value[0];

    return {
        id: ticket.crbab_ispticketid,
        ticketNumber: ticket.crbab_ticketnumber,
        title: ticket.crbab_tickettitle,
        description: ticket.crbab_description,
        status:
            STATUS_MAP[ticket.crbab_status]
            || ticket.crbab_status,
        createdOn: ticket.createdon
    };
}

module.exports = {
    getAllTickets,
    getTicketByTitle
};