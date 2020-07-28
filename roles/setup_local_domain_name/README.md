# `setup_local_domain_name` role

Allow to access traefik the pattern `<service>.clo5.local` by leveraging `dnsmasq`.

## Requirements

None

## Role vars

```
# dnsmasq config path
dnsmasq_config_file: "/etc/dnsmasq.conf"
dnsmasq_config_directory: "/etc/dnsmasq.d"
dnsmasq_custom_config_filename: "clo5.conf"
dnsmasq_custom_config_path: "{{ dnsmasq_config_directory }}/{{ dnsmasq_custom_config_filename }}"
```

## Overridable vars

```
services_domain: clo5.local
traefik_host_ip: 172.16.228.52  # vm2
registry_host_ip: 172.16.228.47  # vm1
```
