import { NextApiRequest, NextApiResponse } from 'next';
import { getK8sClient } from './helpers';

async function getNamespaces(req: NextApiRequest, res: NextApiResponse) {
  try {
    const k8sApi = await getK8sClient();
    const namespaces = await k8sApi.listNamespace();
    res.status(200).json(namespaces.body);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while fetching namespaces.' });
  }
}

// POST /api/namespaces
async function createNamespace(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Your code to create a new namespace
    res.status(201).json({ message: 'Namespace created successfully.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while creating the namespace.' });
  }
}

// PUT /api/namespaces/:id
async function updateNamespace(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Your code to update an existing namespace
    res.status(200).json({ message: 'Namespace updated successfully.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while updating the namespace.' });
  }
}

// DELETE /api/namespaces/:id
async function deleteNamespace(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Your code to delete an existing namespace
    res.status(200).json({ message: 'Namespace deleted successfully.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while deleting the namespace.' });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getNamespaces(req, res);
  } else if (req.method === 'POST') {
    await createNamespace(req, res);
  } else if (req.method === 'PUT') {
    await updateNamespace(req, res);
  } else if (req.method === 'DELETE') {
    await deleteNamespace(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

