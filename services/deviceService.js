const { dataverseGet } = require("./dataverseClient");

const STATUS_MAP = {
    602240000: "Online",
    602240001: "Offline",
    602240002: "Maintenance"
};

async function getAllDevices() {

    const data = await dataverseGet(
        "/api/data/v9.2/crbab_ispdevices"
    );

    return data.value.map(device => ({
        id: device.crbab_ispdeviceid,
        name: device.crbab_devicename,
        status:
            STATUS_MAP[device.crbab_status]
            || device.crbab_status,
        location: device.crbab_location
    }));
}

async function getDeviceByName(deviceName) {

    const query =
        "/api/data/v9.2/crbab_ispdevices" +
        `?$filter=crbab_devicename eq '${deviceName}'`;

    const data = await dataverseGet(query);

    if (!data.value.length) {
        return {
            message: "Device not found"
        };
    }

    const device = data.value[0];

    return {
        id: device.crbab_ispdeviceid,
        name: device.crbab_devicename,
        status:
            STATUS_MAP[device.crbab_status]
            || device.crbab_status,
        location: device.crbab_location
    };
}

module.exports = {
    getAllDevices,
    getDeviceByName
};