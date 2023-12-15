import * as pulumi from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';

// location to deploy cloud run service
const location = gcp.config.region || 'us-central1';

// deploy a pre-existing Hello Cloud Run container
const helloService = new gcp.cloudrun.Service('hello', {
  location,
  template: {
    spec: {
      containers: [{ image: 'gcr.io/cloudrun/hello' }],
    },
  },
});
