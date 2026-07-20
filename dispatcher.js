const tools = require("./tools");

function getAvailableTools() {

    return Object.values(tools).map(
        tool => ({
            name: tool.name,
            description: tool.description
        })
    );
}

module.exports = {
    runTool,
    getAvailableTools
};