const {
    getOpenOutages
} = require("../services/outageService");

async function execute() {
    return await getOpenOutages();
}

module.exports = {
    name: "getOpenOutages",
    description: "Returns all open outages",
    execute
};