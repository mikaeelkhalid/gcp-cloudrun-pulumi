import * as pulumi from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';

// location to deploy cloud run service
const location = gcp.config.region || 'us-central1';

