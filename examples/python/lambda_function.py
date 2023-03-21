import json
import urllib.request


def check_policy(input: dict, package: str, policy: str = None) -> dict:
    """
    Checks the OPA policy for a given input against a specified package and policy.

    Args:
        input (dict): The input JSON for the OPA policy.
        package (str): The name of the OPA package to check.
        policy (str, optional): The name of the OPA policy to check within the package. Defaults to None.

    Returns:
        dict: The OPA policy evaluation result.
    """
    # Build the URL for the OPA policy endpoint
    url = f'http://127.0.0.1:8181/v1/data/{package}'
    if policy is not None:
        url += f'/{policy}'

    # Set the headers and payload for the HTTP request
    headers = {'Content-Type': "application/json"}
    payload = json.dumps(input)

    # Make the HTTP request to the OPA policy endpoint
    req = urllib.request.Request(
        url, method='POST', data=payload.encode('utf-8'), headers=headers)
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))

    # Return the OPA policy evaluation result
    return data['result']


def lambda_handler(event: dict, context) -> dict:
    """
    Lambda function handler that checks the OPA policy for a given input and returns the evaluation result.

    Args:
        event (dict): The Lambda function event input.
        context: The Lambda function context.

    Returns:
        dict: The Lambda function response with the OPA policy evaluation result.
    """
    # Call the check_policy function to evaluate the OPA policy for the input
    allow = check_policy(
        {'input': event}, 'lambda_extension_test', 'allow')

    return {
        'statusCode': 200 if allow else 403,
        'body': json.dumps({
            'allow': allow
        })
    }
