const { dataverseGet } = require("./dataverseClient");

async function getAllDevices() {

    const data = await dataverseGet(
        "/api/data/v9.2/crbab_ispdevices"
    );

    return data.value;
}

async function getDeviceByName(deviceName) {

    const query =
        `/api/data/v9.2/crbab_ispdevices` +
        `?$filter=crbab_devicename eq '${deviceName}'`;

    const data = await dataverseGet(query);

    if (data.value.length === 0) {
        return {
            message: "Device not found"
        };
    }

    return data.value[0];
}

module.exports = {
    getAllDevices,
    getDeviceByName
};