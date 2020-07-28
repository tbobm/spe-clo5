# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.define "vm1" do |vm1|
    vm1.vm.box = "vm1"
    vm1.vm.box = "debian/stretch64"
    vm1.vm.network "private_network", ip: "192.168.50.4"
    vm1.vm.synced_folder '.', '/vagrant', disabled: true
  end
  config.vm.define "vm2" do |vm2|
    vm2.vm.box = "vm2"
    vm2.vm.box = "debian/stretch64"
    vm2.vm.network "private_network", ip: "192.168.50.5"
    vm2.vm.synced_folder '.', '/vagrant', disabled: true
  end
  config.vm.define "vm3" do |vm3|
    vm3.vm.box = "vm3"
    vm3.vm.box = "debian/stretch64"
    vm3.vm.network "private_network", ip: "192.168.50.6"
    vm3.vm.synced_folder '.', '/vagrant', disabled: true
    vm3.vm.provider "virtualbox" do |vb|
      vb.memory = "4096"
      vb.cpus = 4
    end
  end
  config.vm.provision "ansible" do |ansible|
    ansible.limit = "all"
    ansible.verbose = "v"
    ansible.playbook = "infrastructure.yml"
    ansible.groups = {
      "docker_swarm_worker": ["vm1", "vm2"],
      "docker_swarm_manager": ["vm3"]
    }
    ansible.host_vars = {
      "vm3" => {
        "docker_swarm_addr": "192.168.50.6",
        "docker_swarm_port": "2377",
        "gitlab_addr": "192.168.50.6",
        "registry_addr": "192.168.50.4",
        "registry_host_ip": "192.168.50.4",
        "traefik_host_ip": "192.168.50.5",
        "registry_url": "192.168.50.6:443",
        "gitlab_token": "PVNYg9BZJtEBMqd7Rsax",
        "gitlab_users": [
          {
            "name": "test1",
            "email": "test@loc.al",
            "password": "P@SSW0RD",
            "username": "test1"
          },
          {
            "name": "test2",
            "email": "test@loc.al",
            "password": "P@SSW0RD",
            "username": "test2"
          }
        ],
        "gitlab_install": "plz dont",
        "gitlab_setup_users": "plz dont",
        "target_node_a": "192.168.50.4",
        "target_node_b": "192.168.50.5",
        "target_node_c": "192.168.50.6",
        "gitlab_runner_register_token": "EdBmZmspGq-9feFfVyxV",
        "glusterfs_peer_a": "192.168.50.4",
        "glusterfs_peer_b": "192.168.50.5",
        "glusterfs_peer_c": "192.168.50.6",
      },
      "vm2" => {
        "registry_addr": "192.168.50.4",
        "registry_host_ip": "192.168.50.4",
        "traefik_host_ip": "192.168.50.5",
        "registry_url": "192.168.50.6:443",
        "gitlab_addr": "192.168.50.6",
        "gitlab_token": "PVNYg9BZJtEBMqd7Rsax",
        "gitlab_runner_register_token": "EdBmZmspGq-9feFfVyxV",
        "glusterfs_peer_a": "192.168.50.4",
        "glusterfs_peer_b": "192.168.50.5",
        "glusterfs_peer_c": "192.168.50.6",
      },
      "vm1" => {
        "registry_addr": "192.168.50.4",
        "registry_host_ip": "192.168.50.4",
        "traefik_host_ip": "192.168.50.5",
        "registry_url": "192.168.50.6:443",
        "gitlab_addr": "192.168.50.6",
        "gitlab_token": "PVNYg9BZJtEBMqd7Rsax",
        "gitlab_runner_register_token": "EdBmZmspGq-9feFfVyxV",
        "glusterfs_peer_a": "192.168.50.4",
        "glusterfs_peer_b": "192.168.50.5",
        "glusterfs_peer_c": "192.168.50.6",
      }
  }
  end
end
