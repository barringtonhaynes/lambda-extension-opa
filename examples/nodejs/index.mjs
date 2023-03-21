import { request } from 'http';

function checkPolicy(input, packageName, policy = null) {
    /**
     * Checks the OPA policy for a given input against a specified package and policy.
     *
     * @param {Object} input - The input JSON for the OPA policy.
     * @param {string} packageName - The name of the OPA package to check.
     * @param {string|null} [policy=null] - The name of the OPA policy to check within the package.
     * @returns {Object} - The OPA policy evaluation result.
     */

    // Build the URL for the OPA policy endpoint
    let url = `http://127.0.0.1:8181/v1/data/${packageName}`;
    if (policy !== null) {
        url += `/${policy}`;
    }

    // Set the headers and payload for the HTTP request
    const headers = { 'Content-Type': 'application/json' };
    const payload = JSON.stringify(input);

    // Make the HTTP request to the OPA policy endpoint
    return new Promise((resolve, reject) => {
        const req = request(url, { method: 'POST', headers }, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                const result = JSON.parse(data)['result'];
                resolve(result);
            });
        });
        req.on('error', err => reject(err));
        req.write(payload);
        req.end();
    });
}

async function handler(event, context) {
    /**
     * Lambda function handler that checks the OPA policy for a given input and returns the evaluation result.
     *
     * @param {Object} event - The Lambda function event input.
     * @param {Object} context - The Lambda function context.
     * @returns {Object} - The Lambda function response with the OPA policy evaluation result.
     */

    // Call the checkPolicy function to evaluate the OPA policy for the input
    const allow = await checkPolicy({ input: event }, 'lambda_extension_test', 'allow');

    return {
        statusCode: allow ? 200 : 403,
        body: JSON.stringify({ allow })
    };
}

export { handler };
