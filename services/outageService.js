const { dataverseGet } = require("./dataverseClient");

const STATUS_MAP = {
    602240000: "Open",
    602240001: "Resolved",
    602240002: "In Progress"
};

const SEVERITY_MAP = {
    602240000: "Critical",
    602240001: "Major",
    602240002: "Minor"
};

async function getAllOutages() {

    const data = await dataverseGet(
        "/api/data/v9.2/crbab_ispoutages"
    );

    return data.value.map(outage => ({
        id: outage.crbab_ispoutageid,
        region: outage.crbab_region,
        status:
            STATUS_MAP[outage.crbab_status]
            || outage.crbab_status,
        severity:
            SEVERITY_MAP[outage.crbab_severity]
            || outage.crbab_severity,
        impactedCustomers:
            outage.crbab_impactedcustomers,
        rootCause:
            outage.crbab_rootcause
    }));
}

async function getOpenOutages() {

    const data = await dataverseGet(
        "/api/data/v9.2/crbab_ispoutages?$filter=crbab_status eq 602240000"
    );

    return data.value.map(outage => ({
        id: outage.crbab_ispoutageid,
        region: outage.crbab_region,
        severity:
            SEVERITY_MAP[outage.crbab_severity]
            || outage.crbab_severity,
        impactedCustomers:
            outage.crbab_impactedcustomers,
        rootCause:
            outage.crbab_rootcause
    }));
}

async function getCriticalOutages() {

    const outages =
        await getOpenOutages();

    return outages.filter(
        outage => outage.severity === "Critical"
    );
}

async function getAffectedRegions() {

    const outages =
        await getOpenOutages();

    const regions = [
        ...new Set(
            outages.map(
                outage => outage.region
            )
        )
    ].sort();

    return {
        regions,
        totalRegionsAffected:
            regions.length
    };
}

module.exports = {
    getAllOutages,
    getOpenOutages,
    getCriticalOutages,
    getAffectedRegions
};