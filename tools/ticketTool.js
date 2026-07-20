const {
    getTicketByTitle
} = require("../services/ticketService");

async function execute(ticketTitle) {
    return await getTicketByTitle(ticketTitle);
}

module.exports = {
    name: "getTicket",
    description: "Get ticket details by title",
    execute
};