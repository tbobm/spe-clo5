# `docker_monitoring` role

This role deploys a swarm stack based on:
- Prometheus
- node\_exporter
- Grafana
- cadvisor

With datasource and dashboard provisioning.

In addition, a traefik instance is deployed configured to use the docker provider.

## Requirements

A working swarm cluster on the remote hosts.

## Role variables

```
# dockerfile variables
## prometheus
prometheus_version: 2.19.2
prometheus_download_url: "https://github.com/prometheus/prometheus/releases/download/v{{ prometheus_version }}/prometheus-{{ prometheus_version }}.linux-amd64.tar.gz"
## grafana
grafana_version: 7.0.5
grafana_download_url: "https://dl.grafana.com/oss/release/grafana-{{ grafana_version }}.linux-amd64.tar.gz"
## node_exporter
node_exporter_version: 1.0.1
node_exporter_url: "https://github.com/prometheus/node_exporter/releases/download/v{{ node_exporter_version }}/node_exporter-{{ node_exporter_version }}.linux-amd64.tar.gz"
## cadvisor
cadvisor_version: 0.35.0
cadvisor_url: "https://github.com/google/cadvisor/releases/download/v{{ cadvisor_version }}/cadvisor"
```
These are the variables used to template the corresponding Dockerfiles. This way, you can customize the images when deploying the playbook, without editing the Dockerfiles directly.

```
# registry target
registry_url: "localhost:5000"
## restrict deployments
swarm_master: vm3
```
The registry variables allow to:

1. Push the built custom docker images to the private registry
2. Restrict the deployment and image building to the swarm master node

```
# prometheus target node list
target_node_a: 172.16.228.52
target_node_b: 172.16.228.47
## node_c is the master node here
target_node_c: 172.16.228.42
## prometheus target
prometheus_addr: "{{ target_node_c }}:9090"
```
These variables allow to dynamically create the prometheus configuration file to scrape the node\_exporter, prometheus and cadvisor metrics. This can also lead to gitlab-runner metrics scrapping.
