# `docker_registry` role

This role configures a secured docker registry on the available docker swarm listening on the port 443.
It generates and distributes the self-signed SSL certificates the docker registry uses.

## Requirements

A working swarm cluster on the target nodes.

## Role Variables

```
# registry target
registry_host: "vm3"
```
The `inventory_hostname` used to specify the host where the registry will be hosted.

```
# network variables
registry_interface: "{{ ansible_default_ipv4['interface']  }}"
registry_addr: "{{ hostvars[registry_host]['ansible_' + registry_interface]['ipv4']['address']  }}"
```
This variables allow to automatically generate the `registry_common_name` for the self-signed certificate.

```
# registry configuration
registry_http_port: 443
registry_common_name: "{{ registry_addr }}"
```
SSL is enabled by default, as well as self-signed certificates, when using this role. You can override the HTTP port using this variable.

```
# working directories
registry_local_tmp_directory: /tmp/ansible-docker-registry
registry_working_directory: "/opt/certs"
registry_storage_directory: "/mnt/shared/registry/"
```
`registry_local_tmp_directory` is the directory on your ansible controller host where the temporary files for certificate creation will be stored. Considering this is a temporary directory, you can find leftovers of the certificate signing there.
`registry_working_directory` is the directory where the certificate-related files will be stored before being copied in the docker secret environment.
`registry_storage_directory` is the directory mounted as a volume to store the registry's data.
