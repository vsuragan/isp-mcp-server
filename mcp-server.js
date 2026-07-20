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
    getNetworkHealth,
    getOperationsSummary,
    getExecutiveDashboard
} = require("./services/networkHealthService");
const {
    getDeviceByName,
    getOfflineDevices
} = require("./services/deviceService");

const {
    getOpenOutages,
    getCriticalOutages
} = require("./services/outageService");


const server = new McpServer({
    name: "isp-mcp-server",
    version: "1.0.0"
});

/*
 * Customer Tool
 */
server.registerTool(
    "getCustomer",
    {
        title: "Customer Lookup",
        description: "Get customer details by customer name",
        inputSchema: {
            customerName: z.string()
        }
    },
    async ({ customerName }) => {
        const result = await getCustomerByName(customerName);

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
 * Ticket Tool
 */
server.registerTool(
    "getTicket",
    {
        title: "Ticket Lookup",
        description: "Get ticket details by ticket title",
        inputSchema: {
            ticketTitle: z.string()
        }
    },
    async ({ ticketTitle }) => {
        const result = await getTicketByTitle(ticketTitle);

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
        description: "Returns all unresolved tickets",
        inputSchema: {}
    },
    async () => {
        const result = await getOpenTickets();

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
 * Device Tool
 */
server.registerTool(
    "getDevice",
    {
        title: "Device Lookup",
        description: "Get device details by device name",
        inputSchema: {
            deviceName: z.string()
        }
    },
    async ({ deviceName }) => {
        const result = await getDeviceByName(deviceName);

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
        description: "Returns all devices currently offline",
        inputSchema: {}
    },
    async () => {
        const result = await getOfflineDevices();

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
        description: "Returns all open outages",
        inputSchema: {}
    },
    async () => {
        const result = await getOpenOutages();

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
        description: "Returns all open outages with Critical severity",
        inputSchema: {}
    },
    async () => {
        const result = await getCriticalOutages();

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
            "Returns an executive summary of network operations including outages, offline devices and affected customers",
        inputSchema: {}
    },
    async () => {
        const result = await getOperationsSummary();

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
            "Returns overall network health including outages, tickets, devices and offline device count",
        inputSchema: {}
    },
    async () => {
        const result = await getNetworkHealth();

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
            "Returns executive-level operational metrics and customer impact",
        inputSchema: {}
    },
    async () => {

        const result =
            await getExecutiveDashboard();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(
                        result,
                        null,
                        2
                    )
                }
            ]
        };
    }
);

async function main() {
    const transport = new StdioServerTransport();

    await server.connect(transport);
}

main().catch(error => {
    console.error(error);
});