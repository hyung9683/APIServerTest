import {gcpMetadata} from "google-auth-library";
import {GoogleAuth} from "google-auth-library";

const auth = new GoogleAuth();

async function fetchProjectId() {

    return await auth.getProjectId();
}

async function fetchServiceRegion() {

    let region = undefined;

    if(await gcpMetadata.isAvailable()) {

        region = await gcpMetadata.instance('region');
    }

    return region
}

async function authenicatedRequest(url, method) {

    const client = await auth.getIdTokenClient(url);
    const response = await client.request({url, method});

    return response;
}

export default {
    fetchProjectId,
    fetchServiceRegion,
    authenicatedRequest
}