server.registerTool(
    "ping",
    {
        title: "Ping",
        description: "Simple test tool",
        inputSchema: {}
    },
    async () => {
        return {
            content: [
                {
                    type: "text",
                    text: "pong"
                }
            ]
        };
    }
);