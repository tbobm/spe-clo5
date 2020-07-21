# `install_gitlab` role

This role installs and configures gitlab on a remote host. In addition, it creates a list of users on the remote gitlab instance.

## Requirements

None

## Role variables

```
# default networking values
gitlab_interface: "{{ ansible_default_ipv4['interface'] }}"
gitlab_addr: "{{ hostvars[inventory_hostname]['ansible_' + gitlab_interface]['ipv4']['address']  }}"
```
`gitlab_addr` is used as gitlab's `external_url`.

```
# step management
gitlab_install: "yes"
gitlab_setup_users: "yes"
```
Provide flexibility over the expected behaviours of this role.

```
# choose the host where the gitlab installation should take place
gitlab_host: "vm3"
```

```
# default password
gitlab_password: "SamplePassword"
```
Defaut password, you can easily override this variable by either adding a `gitlab_password` variable in your inventory, or by passing it through the command-line argument `--extra-args`.

```
# local script location
gitlab_tmp_script_location: "/tmp/gitlab.deb.sh"
```
The gitlab repository setup script location.
