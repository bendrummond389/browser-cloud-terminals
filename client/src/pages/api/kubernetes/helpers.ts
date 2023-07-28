import { DefaultAzureCredential } from '@azure/identity';
import { ContainerServiceClient } from '@azure/arm-containerservice';
import { KubeConfig, CoreV1Api, NetworkingV1Api } from '@kubernetes/client-node';
import { time } from 'console';

export const getK8sClient = async () => {
  const creds = new DefaultAzureCredential();
  const subscriptionId = process.env.SUBSCRIPTION_ID;
  const resourceGroupName = process.env.RESOURCE_GROUP_NAME;
  const aksName = process.env.AKS_NAME;

  if (!subscriptionId || !resourceGroupName || !aksName) {
    throw new Error('Environment variables SUBSCRIPTION_ID, RESOURCE_GROUP_NAME, or AKS_NAME are not defined');
  }

  const aksClient = new ContainerServiceClient(creds, subscriptionId);
  const cluster = await aksClient.managedClusters.listClusterUserCredentials(resourceGroupName, aksName);

  if (!cluster.kubeconfigs || cluster.kubeconfigs.length === 0) {
    throw new Error('Failed to retrieve Kubernetes credentials from the AKS cluster.');
  }

  const kubeconfigResult = cluster.kubeconfigs[0];

  if (!kubeconfigResult.value) {
    throw new Error('Failed to retrieve Kubernetes credentials from the AKS cluster.');
  }

  const kubeconfigStr = new TextDecoder().decode(kubeconfigResult.value);
  const kubeconfig = new KubeConfig();
  kubeconfig.loadFromString(kubeconfigStr);

  const k8sApi = kubeconfig.makeApiClient(CoreV1Api);

  return k8sApi;
};

export const getK8sNetworkingClient = async () => {
  const creds = new DefaultAzureCredential();
  const subscriptionId = process.env.SUBSCRIPTION_ID;
  const resourceGroupName = process.env.RESOURCE_GROUP_NAME;
  const aksName = process.env.AKS_NAME;

  if (!subscriptionId || !resourceGroupName || !aksName) {
    throw new Error('Environment variables SUBSCRIPTION_ID, RESOURCE_GROUP_NAME, or AKS_NAME are not defined');
  }

  const aksClient = new ContainerServiceClient(creds, subscriptionId);
  const cluster = await aksClient.managedClusters.listClusterUserCredentials(resourceGroupName, aksName);

  if (!cluster.kubeconfigs || cluster.kubeconfigs.length === 0) {
    throw new Error('Failed to retrieve Kubernetes credentials from the AKS cluster.');
  }

  const kubeconfigResult = cluster.kubeconfigs[0];

  if (!kubeconfigResult.value) {
    throw new Error('Failed to retrieve Kubernetes credentials from the AKS cluster.');
  }

  const kubeconfigStr = new TextDecoder().decode(kubeconfigResult.value);
  const kubeconfig = new KubeConfig();
  kubeconfig.loadFromString(kubeconfigStr);

  const k8sNetworkingApi = kubeconfig.makeApiClient(NetworkingV1Api);

  return k8sNetworkingApi;
};

const sanitizeString = (str: string): string => {
  return str.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
};

export const generateNameSpace = (sid: string, timestamp: string): string => {
  const namespace: string = sanitizeString(`${sid}-${timestamp}`);

  return namespace;
};
