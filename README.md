# SPE-CLO5

## Goal

Setup a CI/CD infrastructure with the following components:
- Gitlab
- Gitlab-runner
- Docker in swarm mode
- A monitoring stack (supposedly a TICK stack, but prometheus/grafana/node\_exporter will be our go-to)
- Traefik

The code itself will be hosted on the private gitlab server and will trigger unit test and fonctionnal tests upon push.
If the code is validated, it will trigger a blue/green deployment in "production"

## Ansible roles

### Docker-related

- [docker\_swarm](./roles/docker_swarm/README.md)
- [docker\_registry](./roles/docker_registry/README.md)
- [docker\_monitoring](./roles/docker_monitoring/README.md)

### Gitlab-related

- [install\_gitlab](./roles/install_gitlab/README.md)
  In order to configure the users, you will need to provide a `gitlab_token` and a list of users.
  `ansible-playbook -i inventory.yml -e @vars/users.yml gitlab.yml`
- [gitlab\_runner](./roles/gitlab_runner/README.md)

### Utility roles

- [setup\_net\_fs](./roles/setup_net_fs/README.md) - Install and configure GlusterFS
- [setup\_local\_domain\_name](./roles/setup_local_domain_name/README.md) - Install and configure dnsmasq
