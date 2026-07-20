require("dotenv").config();

const axios = require("axios");
const { execSync } = require("child_process");

async function getAccessToken() {

    const tokenResult = JSON.parse(
        execSync(
            "az account get-access-token --scope https://org27f0b52e.crm.dynamics.com/.default"
        ).toString()
    );

    return tokenResult.accessToken;
}

async function dataverseGet(query) {

    const token = await getAccessToken();

    const response = await axios.get(
        `${process.env.DATAVERSE_URL}${query}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        }
    );

    return response.data;
}

module.exports = {
    dataverseGet
};