const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { z } = require("zod");

const {
    getCustomerByName
} = require("./services/customerService");

const {
    getTicketByTitle,
    getOpenTickets
} = require("./services/ticketService");

const {
    getDeviceByName,
    getOfflineDevices
} = require("./services/deviceService");

const {
    getOpenOutages,
    getCriticalOutages,
    getAffectedRegions
} = require("./services/outageService");

const {
    getNetworkHealth,
    getOperationsSummary,
    getExecutiveDashboard
} = require("./services/networkHealthService");

const server = new McpServer({
    name: "isp-mcp-server",
    version: "3.0.0"
});

/*
 * Customer Tool
 */
server.registerTool(
    "getCustomer",
    {
        title: "Customer Lookup",
        description:
            "Use when a user asks about a customer account, customer details, customer status, service type, or customer location.",
        inputSchema: {
            customerName: z.string()
        }
    },
    async ({ customerName }) => {

        const result =
            await getCustomerByName(customerName);

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

/*
 * Ticket Lookup Tool
 */
server.registerTool(
    "getTicket",
    {
        title: "Ticket Lookup",
        description:
            "Use when a user asks about a specific support ticket, issue, incident, service request, or case.",
        inputSchema: {
            ticketTitle: z.string()
        }
    },
    async ({ ticketTitle }) => {

        const result =
            await getTicketByTitle(ticketTitle);

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

/*
 * Open Tickets Tool
 */
server.registerTool(
    "getOpenTickets",
    {
        title: "Open Tickets",
        description:
            "Use when a user asks about open, active, unresolved, pending, or in-progress support tickets.",
        inputSchema: {}
    },
    async () => {

        const result =
            await getOpenTickets();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

/*
 * Device Lookup Tool
 */
server.registerTool(
    "getDevice",
    {
        title: "Device Lookup",
        description:
            "Use when a user asks about a specific network device, router, switch, OLT, firewall, or infrastructure component.",
        inputSchema: {
            deviceName: z.string()
        }
    },
    async ({ deviceName }) => {

        const result =
            await getDeviceByName(deviceName);

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

/*
 * Offline Devices Tool
 */
server.registerTool(
    "getOfflineDevices",
    {
        title: "Offline Devices",
        description:
            "Use when a user asks which network devices are down, unavailable, offline, unreachable, or experiencing connectivity issues.",
        inputSchema: {}
    },
    async () => {

        const result =
            await getOfflineDevices();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

/*
 * Open Outages Tool
 */
server.registerTool(
    "getOpenOutages",
    {
        title: "Open Outages",
        description:
            "Use when a user asks about active outages, network incidents, service disruptions, impacted customers, or outage details.",
        inputSchema: {}
    },
    async () => {

        const result =
            await getOpenOutages();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

/*
 * Critical Outages Tool
 */
server.registerTool(
    "getCriticalOutages",
    {
        title: "Critical Outages",
        description:
            "Use when a user asks about severe outages, major service disruptions, critical incidents, or high-impact network events.",
        inputSchema: {}
    },
    async () => {

        const result =
            await getCriticalOutages();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

/*
 * Affected Regions Tool
 */
server.registerTool(
    "getAffectedRegions",
    {
        title: "Affected Regions",
        description:
            "Use when a user asks which regions, cities, locations, or service areas are currently impacted by outages.",
        inputSchema: {}
    },
    async () => {

        const result =
            await getAffectedRegions();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

/*
 * Operations Summary Tool
 */
server.registerTool(
    "getOperationsSummary",
    {
        title: "Operations Summary",
        description:
            "Use when a user asks for an operational overview, outage summary, network status review, customer impact summary, or operations dashboard.",
        inputSchema: {}
    },
    async () => {

        const result =
            await getOperationsSummary();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

/*
 * Network Health Tool
 */
server.registerTool(
    "getNetworkHealth",
    {
        title: "Network Health",
        description:
            "Use when a user asks about network health, service health, operational status, outage counts, ticket volume, or device availability.",
        inputSchema: {}
    },
    async () => {

        const result =
            await getNetworkHealth();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

/*
 * Executive Dashboard Tool
 */
server.registerTool(
    "getExecutiveDashboard",
    {
        title: "Executive Dashboard",
        description:
            "Use when a user asks for an executive summary, leadership dashboard, customer impact assessment, high-level operational review, or business status report.",
        inputSchema: {}
    },
    async () => {

        const result =
            await getExecutiveDashboard();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

async function main() {

    const transport =
        new StdioServerTransport();

    await server.connect(transport);
}

main().catch(error => {
    console.error(error);
});