const { getAllTickets } = require("./ticketService");
const { getAllDevices } = require("./deviceService");
const { getAllOutages } = require("./outageService");

async function getNetworkHealth() {

    const tickets = await getAllTickets();
    const devices = await getAllDevices();
    const outages = await getAllOutages();

    const offlineDevices = devices.filter(
        d => d.status === "Offline"
    ).length;

    return {
        ticketCount: tickets.length,
        deviceCount: devices.length,
        outageCount: outages.length,
        offlineDevices,
        overallStatus:
            outages.length > 0
                ? "Warning"
                : "Healthy"
    };
}

module.exports = {
    getNetworkHealth
};