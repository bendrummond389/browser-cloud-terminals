import WebTerminal from '@/components/WebTerminal';
import React from 'react';

export default function Index() {
  return <>
  <WebTerminal ingressPath='ubuntu'/>
  <WebTerminal ingressPath='debian' />
  </>;
}
