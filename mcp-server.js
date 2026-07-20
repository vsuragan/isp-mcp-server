const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { z } = require("zod");

const {
    getCustomerByName
} = require("./services/customerService");

const {
    getTicketByTitle
} = require("./services/ticketService");

const {
    getDeviceByName
} = require("./services/deviceService");

const {
    getOpenOutages
} = require("./services/outageService");

const {
    getNetworkHealth
} = require("./services/networkHealthService");

console.log("Creating MCP Server...");

const server = new McpServer({
    name: "isp-mcp-server",
    version: "1.0.0"
});

// CUSTOMER

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

        const result =
            await getCustomerByName(customerName);

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

// TICKET

server.registerTool(
    "getTicket",
    {
        title: "Ticket Lookup",
        description: "Get ticket details by title",
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

// DEVICE

server.registerTool(
    "getDevice",
    {
        title: "Device Lookup",
        description: "Get device details by name",
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

// OUTAGES

server.registerTool(
    "getOpenOutages",
    {
        title: "Open Outages",
        description: "Returns all open outages",
        inputSchema: {}
    },
    async () => {

        const result =
            await getOpenOutages();

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

// NETWORK HEALTH

server.registerTool(
    "getNetworkHealth",
    {
        title: "Network Health",
        description: "Returns overall ISP network health",
        inputSchema: {}
    },
    async () => {

        const result =
            await getNetworkHealth();

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

    console.log("Connecting transport...");

    const transport =
        new StdioServerTransport();

    await server.connect(
        transport
    );

    console.log("Connected");
    console.log("ISP MCP Server Started");
}

main().catch(error => {
    console.error(error);
});