import WebTerminal from '@/components/WebTerminal';
import React from 'react';

interface NamespaceMetadata {
  name: string;
  // add other properties as needed
}

interface Namespace {
  metadata: NamespaceMetadata;
}

interface NamespaceList {
  items: Namespace[];
}

export default function Index() {
  const [namespaces, setNamespaces] = React.useState<NamespaceList | null>(null);

  React.useEffect(() => {
    async function fetchNamespaces() {
      const res = await fetch("/api/kubernetes/namespaces",
      {
        method: "GET"
      });
      const data: NamespaceList = await res.json();
      setNamespaces(data);
    }
    fetchNamespaces();
  }, []);

  if (!namespaces) return "Loading...";

  return (
    <div>
      <h1>Namespaces:</h1>
      {namespaces.items.map((namespace) => (
        <div key={namespace.metadata.name}>
          <p>Name: {namespace.metadata.name}</p>
        </div>
      ))}

      <WebTerminal ingressPath='/'/>
      <WebTerminal ingressPath='/ubuntu'/>
    </div>
  );
}
