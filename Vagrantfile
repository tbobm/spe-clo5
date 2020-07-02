# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.

  config.vm.define "vm1" do |vm1|
    vm1.vm.box = "vm1"
    vm1.vm.box = "debian/stretch64"
    vm1.vm.network "private_network", ip: "172.16.228.52"
  end
  config.vm.define "vm2" do |vm2|
    vm2.vm.box = "vm2"
    vm2.vm.box = "debian/stretch64"
    vm2.vm.network "private_network", ip: "172.16.228.47"
  end
  config.vm.define "vm3" do |vm3|
    vm3.vm.box = "vm3"
    vm3.vm.box = "debian/stretch64"
    vm3.vm.network "private_network", ip: "172.16.228.42"
    vm3.vm.provider "virtualbox" do |vb|
      vb.memory = "4096"
      vb.cpus = 4
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
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
        "gitlab_addr": "192.168.50.6",
        "registry_addr": "192.168.50.6",
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
        "gitlab_install": "no",
      },
      "vm2" => {
        "registry_addr": "192.168.50.6",
      },
      "vm1" => {
        "registry_addr": "192.168.50.6",
      }
  }
  end
  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
end
