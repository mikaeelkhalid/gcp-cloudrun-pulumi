# Google Cloud Run Pulumi

Example of deploying a custom Docker image into Google Cloud Run service using TypeScript. Image builds a simple HelloWorld web
application in Ruby. You may change it to any language and runtime that can run on Linux and serve HTTP traffic.

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/mikaeelkhalid/gcp-cloudrun-pulumi/blob/main/README.md)

## Pre-req

1. [Ensure you have the latest Node.js and NPM](https://nodejs.org/en/download/)
2. [Install the Pulumi CLI](https://www.pulumi.com/docs/get-started/install/)
3. [Configure Pulumi to access your GCP account](https://www.pulumi.com/docs/intro/cloud-providers/gcp/setup/)
4. [Install Docker](https://docs.docker.com/install/)
5. Enable Docker to deploy to Google Container Registry with `gcloud auth configure-docker`

## Deploy

1.  NPM dependencies:

    ```
    $ npm install
    ```

2.  Create a new stack:

    ```
    $ pulumi stack init dev
    ```

3.  Configure your GCP project and region:

    ```
    $ pulumi config set gcp:project <projectname>
    $ pulumi config set gcp:region <region>
    ```

4.  Run `pulumi up` to deploy changes:

    ```
    $ pulumi up
    ```

5.  Check the deployed Cloud Run endpoint:

    ```
    $ curl "$(pulumi stack output rubyUrl)"
    ```

6.  Clean up your GCP and Pulumi resources:

    ```
    $ pulumi destroy
    ```

