# `docker_swarm` role

This role installes docker and configures the remote hosts as a swarm cluster.

## Requirements

None

## Role Variables

```
# docker swarm default configuration
docker_swarm_interface: "{{ ansible_default_ipv4['interface']  }}"
docker_swarm_addr: "{{ hostvars[inventory_hostname]['ansible_' + docker_swarm_interface]['ipv4']['address']  }}"
docker_swarm_port: 2377
```

These variables allow to automatically bound the swarm advertising address to the interface ansible is connecting to, as well as the default swarm port.
