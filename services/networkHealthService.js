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

async function getOperationsSummary() {

    const tickets = await getAllTickets();
    const devices = await getAllDevices();
    const outages = await getAllOutages();

    const offlineDevices = devices.filter(
        d => d.status === "Offline"
    );

    const criticalOutages = outages.filter(
        o => o.severity === "Critical"
    );

    const affectedCustomers = criticalOutages.reduce(
        (sum, outage) =>
            sum + (outage.impactedCustomers || 0),
        0
    );

    return {
        overallStatus:
            criticalOutages.length > 0
                ? "Warning"
                : "Healthy",

        openTickets: tickets.length,
        openOutages: outages.length,
        criticalOutages: criticalOutages.length,
        offlineDevices: offlineDevices.length,
        affectedCustomers,

        summary:
            `${criticalOutages.length} critical outages affecting ` +
            `${affectedCustomers} customers and ` +
            `${offlineDevices.length} devices currently offline.`
    };
}

async function getExecutiveDashboard() {

    const operations =
        await getOperationsSummary();

    return {
        overallStatus:
            operations.overallStatus,

        customerImpact:
            operations.affectedCustomers,

        criticalOutages:
            operations.criticalOutages,

        offlineDevices:
            operations.offlineDevices,

        openTickets:
            operations.openTickets,

        highPriorityMessage:
            operations.criticalOutages > 0
                ? "Critical outages require immediate attention."
                : "No critical outages reported."
    };
}

module.exports = {
    getNetworkHealth,
    getOperationsSummary,
    getExecutiveDashboard
};