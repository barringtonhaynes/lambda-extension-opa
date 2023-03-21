require 'json'
require 'net/http'

def check_policy(input, package, policy = nil)
  """
  Checks the OPA policy for a given input against a specified package and policy.

  Args:
    input (Hash): The input JSON for the OPA policy.
    package (String): The name of the OPA package to check.
    policy (String, optional): The name of the OPA policy to check within the package. Defaults to nil.

  Returns:
    Hash: The OPA policy evaluation result.
  """
  # Build the URL for the OPA policy endpoint
  url = "http://127.0.0.1:8181/v1/data/#{package}"
  url += "/#{policy}" if policy

  # Set the headers and payload for the HTTP request
  headers = {'Content-Type': 'application/json'}
  payload = input.to_json

  # Make the HTTP request to the OPA policy endpoint
  uri = URI(url)
  response = Net::HTTP.post(uri, payload, headers)

  # Return the OPA policy evaluation result
  JSON.parse(response.body)['result']
end

def lambda_handler(event:, context:)
  """
  Lambda function handler that checks the OPA policy for a given input and returns the evaluation result.

  Args:
    event (Hash): The Lambda function event input.
    context: The Lambda function context.

  Returns:
    Hash: The Lambda function response with the OPA policy evaluation result.
  """
  # Call the check_policy function to evaluate the OPA policy for the input
  allow = check_policy({'input': event}, 'lambda_extension_test', 'allow')

  {
    statusCode: allow ? 200 : 403,
    body: {
      allow: allow
    }.to_json
  }
end
