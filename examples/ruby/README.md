# Ruby 2.7 runtime example

This Ruby AWS Lambda handler calls out to an Open Policy Agent (OPA) sidecar running alongside your Lambda function. It uses the `check_policy` function to check the policy defined in the lambda_extension_test package and returns a response with the value of allow.

## Testing

You can call the handler with any test event, but in order to return an HTTP 200 response, you must provide an event with a `shouldAllow` key that is set to `true`.

```json
{
    "shouldAllow": true
}
```
