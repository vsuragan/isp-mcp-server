const {
    getDeviceByName
} = require("../services/deviceService");

async function execute(deviceName) {
    return await getDeviceByName(deviceName);
}

module.exports = {
    name: "getDevice",
    description: "Get device details by name",
    execute
};