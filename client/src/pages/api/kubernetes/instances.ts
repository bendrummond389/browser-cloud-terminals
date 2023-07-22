import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateNameSpace, getK8sClient } from './helpers';

async function createNamespace(req: NextApiRequest, res: NextApiResponse) {
  const timestamp = Date.now().toString();

  try {
    const body: User = req.body;

    if (!body.sid) {
      return res.status(400).json({ error: 'must have user to create namespace' });
    }

    const namespace = generateNameSpace(body.sid, timestamp);

    const k8sApi = await getK8sClient();

    const namespaceExists = await k8sApi.readNamespace(namespace).catch(() => false);

    if (namespaceExists) {
      return res.status(409).json({ error: 'Namespace already exists.' });
    }

    await k8sApi.createNamespace({
      metadata: {
        namespace
      }
    });

    res.status(201).json({ message: 'Namespace created successfully.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while creating the namespace.' });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
  } else if (req.method === 'POST') {
    createNamespace(req, res);
  } else if (req.method === 'PUT') {
  } else if (req.method === 'DELETE') {
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
