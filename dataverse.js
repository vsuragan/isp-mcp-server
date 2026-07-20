require("dotenv").config();

const axios = require("axios");
const { execSync } = require("child_process");

async function getTicketByTitle(ticketTitle) {
    try {

        const tokenResult = JSON.parse(
            execSync(
                "az account get-access-token --scope https://org27f0b52e.crm.dynamics.com/.default"
            ).toString()
        );

        const token = tokenResult.accessToken;

        const query =
            `${process.env.DATAVERSE_URL}` +
            `/api/data/v9.2/crbab_isptickets` +
            `?$filter=crbab_tickettitle eq '${ticketTitle}'`;

        const response = await axios.get(
            query,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            }
        );

        if (response.data.value.length === 0) {
            console.log("Ticket not found");
            return;
        }

        console.log("Ticket Found:");
        console.log(
            JSON.stringify(
                response.data.value[0],
                null,
                2
            )
        );

    } catch (error) {

        console.log("ERROR");

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log(
                JSON.stringify(
                    error.response.data,
                    null,
                    2
                )
            );
        } else {
            console.log(error.message);
        }
    }
}

// Replace with an actual ticket title from your table
getTicketByTitle("Login Issue");