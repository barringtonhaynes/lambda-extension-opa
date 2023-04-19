# AWS Lambda Extension for Open Policy Agent

This [AWS Lambda extension](https://docs.aws.amazon.com/lambda/latest/dg/lambda-extensions.html) runs an [Open Policy Agent (OPA)](https://www.openpolicyagent.org) sidecar alongside your Lambda function. By using the [sidecar pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar), you can make microservice decisions with local data, keep your code platform-agnostic, and separate policy from code.

## Table of Contents

- [AWS Lambda Extension for Open Policy Agent](#aws-lambda-extension-for-open-policy-agent)
  - [Table of Contents](#table-of-contents)
  - [Why Use an OPA Sidecar in AWS Lambda?](#why-use-an-opa-sidecar-in-aws-lambda)
    - [1. Microservice Decisions with Local Data](#1-microservice-decisions-with-local-data)
    - [2. Platform-Agnostic Code](#2-platform-agnostic-code)
    - [3. Separation of Policy and Code](#3-separation-of-policy-and-code)
  - [Installation and Usage](#installation-and-usage)
    - [Environment variables](#environment-variables)
    - [Published layers](#published-layers)
  - [Shell script](#shell-script)
  - [Contributing](#contributing)
  - [License](#license)

## Why Use an OPA Sidecar in AWS Lambda?

There are several benefits to using an OPA sidecar in AWS Lambda:

### 1. Microservice Decisions with Local Data

With an OPA sidecar, you can make microservice decisions based on local data. This means that you don't need to make network calls to retrieve policy information, which can improve the performance and reliability of your Lambda function. Additionally, you can use the same OPA policy across multiple Lambdas without having to modify the code for each function.

### 2. Platform-Agnostic Code

By using an OPA sidecar, you can write platform-agnostic code that works across multiple environments. The OPA sidecar is responsible for enforcing policies, so you don't need to worry about writing platform-specific code to handle policy enforcement.

### 3. Separation of Policy and Code

With an OPA sidecar, you can separate policy from code. This means that you can update policies without having to update the Lambda function code. Additionally, you can enforce policies across multiple functions without having to modify the code for each function.

## Installation and Usage

To use this AWS Lambda extension, include the layer in your AWS Lambda function deployment package. The extension will automatically start the OPA sidecar alongside your function.

For more information on how to use this extension, please check out the [examples](examples). There is a [sample rego policy](src/opa/policies/test.rego) file which can be used for testing that your Lambda function is able to communicate with the OPA service prior to introducing your own policy files.

### Environment variables

The following environment are available. You should set `OPA_POLICY_PATH` to point to your policy files, e.g. /var/task/policies

| Environment variable   | Default value                | Description                                     |
| ---------------------- | ---------------------------- | ------------------------------------------------|
| OPA_POLICY_PATH        | /opt/opa/policies            | Policy file path. Defaults to test policy path. |
| OPA_LOGS_TO_CLOUDWATCH | false                        | Send OPA logs to Cloudwatch if set to `true`    |

### Published layers

Pre-built layers are available in the following regions:

<!-- LAYERS_TABLE_START -->
| Region | x86_64 | arm64 |
| ------ | ------ | ----- |
| ap-south-1 | arn:aws:lambda:ap-south-1:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:ap-south-1:929837356077:layer:OPAExtension-Arm64:1 |
| eu-north-1 | arn:aws:lambda:eu-north-1:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:eu-north-1:929837356077:layer:OPAExtension-Arm64:1 |
| eu-west-3 | arn:aws:lambda:eu-west-3:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:eu-west-3:929837356077:layer:OPAExtension-Arm64:1 |
| eu-west-2 | arn:aws:lambda:eu-west-2:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:eu-west-2:929837356077:layer:OPAExtension-Arm64:1 |
| eu-west-1 | arn:aws:lambda:eu-west-1:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:eu-west-1:929837356077:layer:OPAExtension-Arm64:1 |
| ap-northeast-3 | arn:aws:lambda:ap-northeast-3:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:ap-northeast-3:929837356077:layer:OPAExtension-Arm64:1 |
| ap-northeast-2 | arn:aws:lambda:ap-northeast-2:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:ap-northeast-2:929837356077:layer:OPAExtension-Arm64:1 |
| ap-northeast-1 | arn:aws:lambda:ap-northeast-1:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:ap-northeast-1:929837356077:layer:OPAExtension-Arm64:1 |
| ca-central-1 | arn:aws:lambda:ca-central-1:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:ca-central-1:929837356077:layer:OPAExtension-Arm64:1 |
| sa-east-1 | arn:aws:lambda:sa-east-1:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:sa-east-1:929837356077:layer:OPAExtension-Arm64:1 |
| ap-southeast-1 | arn:aws:lambda:ap-southeast-1:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:ap-southeast-1:929837356077:layer:OPAExtension-Arm64:1 |
| ap-southeast-2 | arn:aws:lambda:ap-southeast-2:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:ap-southeast-2:929837356077:layer:OPAExtension-Arm64:1 |
| eu-central-1 | arn:aws:lambda:eu-central-1:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:eu-central-1:929837356077:layer:OPAExtension-Arm64:1 |
| us-east-1 | arn:aws:lambda:us-east-1:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:us-east-1:929837356077:layer:OPAExtension-Arm64:1 |
| us-east-2 | arn:aws:lambda:us-east-2:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:us-east-2:929837356077:layer:OPAExtension-Arm64:1 |
| us-west-1 | arn:aws:lambda:us-west-1:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:us-west-1:929837356077:layer:OPAExtension-Arm64:1 |
| us-west-2 | arn:aws:lambda:us-west-2:929837356077:layer:OPAExtension-x86_64:1 | arn:aws:lambda:us-west-2:929837356077:layer:OPAExtension-Arm64:1 |
<!-- LAYERS_TABLE_END -->

## Shell script

The [shell script](src/extensions/opa) is largely influenced by the [Custom Runtime Extension(s) Demo](https://github.com/aws-samples/aws-lambda-extensions/tree/main/custom-runtime-extension-demo) provided by AWS. It is written such that it should not require any packages not included by any of the runtimes.

## Contributing

If you would like to contribute to this project, please feel free to submit a pull request. Contributions of all kinds, including bug fixes, new features, and documentation improvements are welcome. That said, the focus of this project is a portable sidecar for OPA with fastest execution time and minimum configuration.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE file](LICENSE) for details.
