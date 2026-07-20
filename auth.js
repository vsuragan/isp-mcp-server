require("dotenv").config();

const { DefaultAzureCredential } = require("@azure/identity");

async function testAuth() {
    try {
        const credential = new DefaultAzureCredential();

        const token = await credential.getToken(
            "https://org27f0b52e.crm.dynamics.com/.default"
        );

        console.log("Token acquired");
        console.log(token.token.substring(0, 50) + "...");
    }
    catch (error) {
        console.log("Authentication failed");
        console.log(error.message);
    }
}

testAuth();