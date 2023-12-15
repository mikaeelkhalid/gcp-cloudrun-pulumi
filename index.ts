import * as pulumi from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';
import * as docker from '@pulumi/docker';

// location to deploy cloud run service
const location = gcp.config.region || 'us-central1';

/* deploy a pre-existing Hello Cloud Run container */
const helloService = new gcp.cloudrun.Service('hello', {
  location,
  template: {
    spec: {
      containers: [{ image: 'gcr.io/cloudrun/hello' }],
    },
  },
});

// allow public unrestricted access
const iamHello = new gcp.cloudrun.IamMember('hello-everyone', {
  service: helloService.name,
  location,
  role: 'roles/run.invoker',
  member: 'allUsers',
});

// export the app URL
export const helloUrl = helloService.statuses[0].url;

/* ------------------------------------------------------------------- */

/* deploy a custom container to Cloud Run */

// build a Docker image from our sample Ruby app and put it to Google Container Registry.
// note: run `gcloud auth configure-docker` in your command line to configure auth to GCR.
const imageName = 'ruby-app';
const rubyImage = new docker.Image(imageName, {
  imageName: pulumi.interpolate`gcr.io/${gcp.config.project}/${imageName}:v1.0.0`,
  build: {
    context: './ruby-app',
  },
});

// deploy to Cloud Run, and some parameters like concurrency and memory.
const rubyService = new gcp.cloudrun.Service('ruby', {
  location,
  template: {
    spec: {
      containers: [
        {
          image: rubyImage.imageName,
          resources: {
            limits: {
              memory: '1Gi',
            },
          },
        },
      ],
      containerConcurrency: 50,
    },
  },
});

// allow public unrestricted access
const iamRuby = new gcp.cloudrun.IamMember('ruby-everyone', {
  service: rubyService.name,
  location,
  role: 'roles/run.invoker',
  member: 'allUsers',
});

// export the app URL
export const rubyUrl = rubyService.statuses[0].url;

