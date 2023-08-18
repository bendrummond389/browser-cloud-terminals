# Browser Cloud Terminals
## Description
Browser Cloud Terminals is a web application that demonstrates how to provide users with remote shell access to a server directly from their browser. It showcases an ideal environment for individuals interested in Linux, Docker, and Kubernetes.

Please note that this application requires a specific infrastructure setup, including a Kubernetes cluster, Postgres VM running on Azure, and an Auth0 account for authentication. Additionally, SSL certificates and a domain name are required to enable secure connections via Kubernetes Ingress.

## Built With
- NextJs
- MaterialUI
- Kubernetes
- Azure
- PostgreSQL

## Demo
Watch a demo of the application in action: [Video](https://youtu.be/DIr_peoYBLA)

## Note
This project is intended for educational purposes and serves as a guide for building web terminal applications. It is not a standalone application that can be easily cloned and used without the necessary infrastructure and configurations.

## How it Works
The Browser Cloud Terminals application uses the Kubernetes API to automate the creation, access, and deletion of Kubernetes pods, services, and ingresses. Each pod runs a custom Docker image with a WebSocket server on startup, allowing users to access the pods via the web-based terminal in the dashboard. The WebSocket connections are managed by the Nginx Ingress controller, which assigns a unique ingress path based on the user session ID.

## Requirements
- A Kubernetes cluster
- A PostgreSQL database
- If you plan on using HTTPS, the WebSocket connection must be secured, which requires a domain to acquire an SSL certificate.

## Limitations
The performance of this website largely depends on the resources available in the Kubernetes cluster. The cluster can be horizontally scaled by adding additional Nginx Ingress controller pods to manage more WebSocket traffic.

## Contact
If you have any questions or need further assistance, feel free to reach out to me via [bendrummond389@gmail.com](mailto:bendrummond389@gmail.com).
