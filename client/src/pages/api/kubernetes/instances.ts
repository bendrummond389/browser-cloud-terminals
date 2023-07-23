import { NextApiRequest, NextApiResponse } from 'next';
import { generateNameSpace, getK8sClient, getK8sNetworkingClient } from './helpers';
import { CoreV1Api, NetworkingV1Api, V1Ingress, V1Service } from '@kubernetes/client-node';
import { CreateInstanceRequestBody } from '@/components/DashboardPage';
import { Instance, PrismaClient } from '@prisma/client';

const createInstance = async (req: NextApiRequest, res: NextApiResponse) => {
  const timestamp = Date.now().toString();
  const { user, name, podImage }: CreateInstanceRequestBody = req.body;

  const namespace = generateNameSpace(user.sid, timestamp);
  const k8sApi = await getK8sClient();
  const k8sNetworkingApi = await getK8sNetworkingClient();

  const prisma = new PrismaClient();

  try {
    await createNamespace(namespace, k8sApi);
    await createPod(k8sApi, name, namespace, podImage);
    await createService(k8sApi, name, namespace);
    await createIngress(k8sNetworkingApi, name, namespace);

    const response = await prisma.instance.create({
      data: {
        userId: user.id,
        namespace,
        name: name,
        ingressPath: `/${namespace}`,
        distro: podImage
      }
    });
    res.status(200).json({ message: 'Instance created successfully.', instance: response });

    console.log('created new instance', response);
  } catch (e) {
    deleteNamespace(namespace, k8sApi);
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteNamespace = async (namespace: string, client: CoreV1Api) => {
  try {
    await client.deleteNamespace(namespace);
  } catch (e) {
    console.log('failed to delete namespace');
  }
};

const createNamespace = async (namespace: string, client: CoreV1Api) => {
  try {
    await client.createNamespace({
      metadata: {
        name: namespace
      }
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createPod = async (client: CoreV1Api, name: string, namespace: string, imageName: string) => {
  const podManifest = {
    apiVersion: 'v1',
    kind: 'Pod',
    metadata: {
      name: name,
      namespace: namespace,
      labels: { app: namespace }
    },
    spec: {
      containers: [
        {
          name: name,
          image: `bendrummond389/${imageName}:latest`,
          ports: [{ containerPort: 8080 }]
        }
      ]
    }
  };

  try {
    const response = await client.createNamespacedPod(namespace, podManifest);
    if (response.body.metadata) console.log(`Pod ${response.body.metadata.name} created successfully.`);
    return response.body;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createService = async (client: CoreV1Api, name: string, namespace: string) => {
  const serviceManifest: V1Service = {
    apiVersion: 'v1',
    kind: 'Service',
    metadata: {
      name: name,
      namespace: namespace
    },
    spec: {
      selector: {
        app: namespace
      },
      ports: [
        {
          protocol: 'TCP',
          port: 80,
          targetPort: 8080
        }
      ],
      type: 'NodePort'
    }
  };

  try {
    const response = await client.createNamespacedService(namespace, serviceManifest);
    if (response.body.metadata) console.log(`Service ${response.body.metadata.name} created successfully.`);
    return response.body;
  } catch (e) {
    console.error(e);
  }
};

const createIngress = async (client: NetworkingV1Api, name: string, namespace: string) => {
  const ingressManifest: V1Ingress = {
    apiVersion: 'networking.k8s.io/v1',
    kind: 'Ingress',
    metadata: {
      name: name,
      namespace: namespace,
      annotations: {
        'kubernetes.io/ingress.class': 'nginx',
        'nginx.ingress.kubernetes.io/websocket': 'true',
        'nginx.org/websocket-services': 'gateway-cluster-ip-service'
      }
    },
    spec: {
      rules: [
        {
          http: {
            paths: [
              {
                path: `/${namespace}`,
                pathType: 'Exact',
                backend: {
                  service: {
                    name: name,
                    port: {
                      number: 80
                    }
                  }
                }
              }
            ]
          }
        }
      ]
    }
  };

  try {
    const response = await client.createNamespacedIngress(namespace, ingressManifest);
    if (response.body.metadata) console.log(`Ingress ${response.body.metadata.name} created successfully.`);
    return response.body;
  } catch (e) {
    console.error(e);
  }
};

const getInstances = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  const userId = req.query.userId;

  console.log(userId);

  try {
    let instances: Instance[] = [];

    if (typeof userId === 'string') {
      const userIdNumber = parseInt(userId, 10);
      instances = await prisma.instance.findMany({
        where: {
          userId: userIdNumber
        }
      });
    }

    res.status(200).json(instances);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while fetching instances.' });
  }
};

const deleteInstance = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const k8sApi = await getK8sClient();
  const instanceId = req.query.id;

  if (typeof instanceId === 'string') {
    try {
      const instanceIdNumber = parseInt(instanceId, 10);

      const instance = await prisma.instance.findUnique({
        where: {
          id: instanceIdNumber
        }
      });
      if (instance) {
        await deleteNamespace(instance.namespace, k8sApi);
        await prisma.instance.delete({
          where: {
            id: instanceIdNumber
          }
        });

        res.status(200).json({ message: 'Instance deleted successfully.' });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'An error occurred while fetching instances.' });
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getInstances(req, res);
  } else if (req.method === 'POST') {
    await createInstance(req, res);
  } else if (req.method === 'DELETE') {
    await deleteInstance(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
