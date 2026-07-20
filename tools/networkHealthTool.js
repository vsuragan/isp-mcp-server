const {
    getNetworkHealth
} = require("../services/networkHealthService");

async function execute() {
    return await getNetworkHealth();
}

module.exports = {
    name: "getNetworkHealth",
    description: "Returns ISP network health summary",
    execute
};

server.registerTool(
    "getCustomer",
    {
        title: "Customer Lookup",
        description: "Get customer details by customer name",
        inputSchema: {}
    },
    async () => {

        const result =
            await getCustomerByName(
                "City Office"
            );

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