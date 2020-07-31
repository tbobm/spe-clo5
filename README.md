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

The registration token is located in [gitlab.yml](./vars/gitlab.yml).
In order to use it in the `gitlab_runner` role, provide the flag `-e @vars/gitlab.yml` and decrypt it using the ansible-vault secret while executing the playbook.

- [install\_gitlab](./roles/install_gitlab/README.md)
  In order to configure the users, you will need to provide a `gitlab_token` and a list of users.
  `ansible-playbook -i inventory.yml -e @vars/users.yml gitlab.yml`
- [gitlab\_runner](./roles/gitlab_runner/README.md)

### Utility roles

- [setup\_net\_fs](./roles/setup_net_fs/README.md) - Install and configure GlusterFS
- [setup\_local\_domain\_name](./roles/setup_local_domain_name/README.md) - Install and configure dnsmasq

## Graphs

### Technical infrastructure graph

Traefik routing (shortened)

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFJcbiAgQVtDbGllbnRdLS0-fEhUVFAgcmVxdWVzdHwgQ3t0cmFlZmlrfVxuICBDIC0tPnx1c2VyLW1hbmFnZXIuYmV0YS5jbG81LmxvY2FsL3wgRHtzdGFnaW5nIHVzZXItbWFuYWdlcn1cbiAgc3ViZ3JhcGggc3RhZ2luZ1xuICAgIEQgLS0-fGNvbm5lY3QgdG8gY29ycmVzcG9uZGluZyBkYXRhYmFzZXxEQltzdGFnaW5nIGRiIHVzZXItbWFuYWdlcl1cbiAgICBEIC0tPnxjb250YWN0IG90aGVyIHNlcnZpY2V8U0Vbc3RhZ2luZyBlc3RhYmxpc2htZW50IG1hbmFnZXJdXG4gIGVuZFxuICBDIC0tPnx1c2VyLW1hbmFnZXIuY2xvNS5sb2NhbC98IEVbcHJvZHVjdGlvbiB1c2VyLW1hbmFnZXJdXG4gIHN1YmdyYXBoIHByb2RcbiAgICBFIC0tPnxjb25uZWN0IHRvIGNvcnJlc3BvbmRpbmcgZGF0YWJhc2V8RFBbcHJvZHVjdGlvbiBkYiB1c2VyLW1hbmFnZXJdXG4gICAgRSAtLT58Y29udGFjdCBvdGhlciBzZXJ2aWNlfFBFW3Byb2R1Y3Rpb24gZXN0YWJsaXNobWVudCBtYW5hZ2VyXVxuICBlbmRcbiAgQyAtLT58dXNlci1tYW5hZ2VyLmNsbzUubG9jYWwvYmx1ZXwgRltibHVlIHByb2R1Y3Rpb24gdXNlci1tYW5hZ2VyXVxuICBzdWJncmFwaCBwcm9kLWJsdWVcbiAgICBGIC0tPnxjb25uZWN0IHRvIGNvcnJlc3BvbmRpbmcgZGF0YWJhc2V8REJCW2JsdWUgcHJvZHVjdGlvbiBkYiB1c2VyLW1hbmFnZXJdXG4gICAgRiAtLT58Y29udGFjdCBvdGhlciBzZXJ2aWNlfEJFW2JsdWUgcHJvZHVjdGlvbiBlc3RhYmxpc2htZW50IG1hbmFnZXJdXG4gIGVuZFxuICBDIC0tPnxncmFmYW5hLmNsbzUubG9jYWx8IEdbZ3JhZmFuYV1cbiAgc3ViZ3JhcGggbW9uaXRvcmluZ1xuICAgIEcgLS0-fGNvbm5lY3QgdG8gcHJvbWV0aGV1c3xQW3Byb21ldGhldXNdXG4gICAgUCAtLT58c2NyYXBlIG5vZGVfZXhwb3J0ZXJzfE5FQVtub2RlX2V4cG9ydGVyIEFdXG4gICAgUCAtLT58c2NyYXBlIG5vZGVfZXhwb3J0ZXJzfE5FQltub2RlX2V4cG9ydGVyIEJdXG4gICAgUCAtLT58c2NyYXBlIG5vZGVfZXhwb3J0ZXJzfE5FQ1tub2RlX2V4cG9ydGVyIENdXG4gICAgUCAtLT58c2NyYXBlIGNhZHZpc29yc3xDQVtjYWR2aXNvciBBXVxuICAgIFAgLS0-fHNjcmFwZSBjYWR2aXNvcnN8Q0JbY2Fkdmlzb3IgQl1cbiAgICBQIC0tPnxzY3JhcGUgY2Fkdmlzb3JzfENDW2NhZHZpc29yIENdXG4gIGVuZFxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcbiAgQVtDbGllbnRdLS0-fEhUVFAgcmVxdWVzdHwgQ3t0cmFlZmlrfVxuICBDIC0tPnx1c2VyLW1hbmFnZXIuYmV0YS5jbG81LmxvY2FsL3wgRHtzdGFnaW5nIHVzZXItbWFuYWdlcn1cbiAgc3ViZ3JhcGggc3RhZ2luZ1xuICAgIEQgLS0-fGNvbm5lY3QgdG8gY29ycmVzcG9uZGluZyBkYXRhYmFzZXxEQltzdGFnaW5nIGRiIHVzZXItbWFuYWdlcl1cbiAgICBEIC0tPnxjb250YWN0IG90aGVyIHNlcnZpY2V8U0Vbc3RhZ2luZyBlc3RhYmxpc2htZW50IG1hbmFnZXJdXG4gIGVuZFxuICBDIC0tPnx1c2VyLW1hbmFnZXIuY2xvNS5sb2NhbC98IEVbcHJvZHVjdGlvbiB1c2VyLW1hbmFnZXJdXG4gIHN1YmdyYXBoIHByb2RcbiAgICBFIC0tPnxjb25uZWN0IHRvIGNvcnJlc3BvbmRpbmcgZGF0YWJhc2V8RFBbcHJvZHVjdGlvbiBkYiB1c2VyLW1hbmFnZXJdXG4gICAgRSAtLT58Y29udGFjdCBvdGhlciBzZXJ2aWNlfFBFW3Byb2R1Y3Rpb24gZXN0YWJsaXNobWVudCBtYW5hZ2VyXVxuICBlbmRcbiAgQyAtLT58dXNlci1tYW5hZ2VyLmNsbzUubG9jYWwvYmx1ZXwgRltibHVlIHByb2R1Y3Rpb24gdXNlci1tYW5hZ2VyXVxuICBzdWJncmFwaCBwcm9kLWJsdWVcbiAgICBGIC0tPnxjb25uZWN0IHRvIGNvcnJlc3BvbmRpbmcgZGF0YWJhc2V8REJCW2JsdWUgcHJvZHVjdGlvbiBkYiB1c2VyLW1hbmFnZXJdXG4gICAgRiAtLT58Y29udGFjdCBvdGhlciBzZXJ2aWNlfEJFW2JsdWUgcHJvZHVjdGlvbiBlc3RhYmxpc2htZW50IG1hbmFnZXJdXG4gIGVuZFxuICBDIC0tPnxncmFmYW5hLmNsbzUubG9jYWx8IEdbZ3JhZmFuYV1cbiAgc3ViZ3JhcGggbW9uaXRvcmluZ1xuICAgIEcgLS0-fGNvbm5lY3QgdG8gcHJvbWV0aGV1c3xQW3Byb21ldGhldXNdXG4gICAgUCAtLT58c2NyYXBlIG5vZGVfZXhwb3J0ZXJzfE5FQVtub2RlX2V4cG9ydGVyIEFdXG4gICAgUCAtLT58c2NyYXBlIG5vZGVfZXhwb3J0ZXJzfE5FQltub2RlX2V4cG9ydGVyIEJdXG4gICAgUCAtLT58c2NyYXBlIG5vZGVfZXhwb3J0ZXJzfE5FQ1tub2RlX2V4cG9ydGVyIENdXG4gICAgUCAtLT58c2NyYXBlIGNhZHZpc29yc3xDQVtjYWR2aXNvciBBXVxuICAgIFAgLS0-fHNjcmFwZSBjYWR2aXNvcnN8Q0JbY2Fkdmlzb3IgQl1cbiAgICBQIC0tPnxzY3JhcGUgY2Fkdmlzb3JzfENDW2NhZHZpc29yIENdXG4gIGVuZFxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)


_source:_
```markdown
graph LR
  A[Client]-->|HTTP request| C{traefik}
  C -->|user-manager.beta.clo5.local/| D{staging user-manager}
  subgraph staging
    D -->|connect to corresponding database|DB[staging db user-manager]
    D -->|contact other service|SE[staging establishment manager]
  end
  C -->|user-manager.clo5.local/| E[production user-manager]
  subgraph prod
    E -->|connect to corresponding database|DP[production db user-manager]
    E -->|contact other service|PE[production establishment manager]
  end
  C -->|user-manager.clo5.local/blue| F[blue production user-manager]
  subgraph prod-blue
    F -->|connect to corresponding database|DBB[blue production db user-manager]
    F -->|contact other service|BE[blue production establishment manager]
  end
  C -->|grafana.clo5.local| G[grafana]
  subgraph monitoring
    G -->|connect to prometheus|P[prometheus]
    P -->|scrape node_exporters|NEA[node_exporter A]
    P -->|scrape node_exporters|NEB[node_exporter B]
    P -->|scrape node_exporters|NEC[node_exporter C]
    P -->|scrape cadvisors|CA[cadvisor A]
    P -->|scrape cadvisors|CB[cadvisor B]
    P -->|scrape cadvisors|CC[cadvisor C]
  end
```
