# `gitlab_runner` role

This role installs and configures the gitlab runner on the target hosts.
Currently, it installs it with the `command` module, as the `python-gitlab` and the `gitlab_runner` ansible module seems to lack the executor choice and version informations when registering to the gitlab instance.

## Requirements

A working gitlab installation available from the target hosts.
A `gitlab_token` and a `register_token`.

## Role Variables

```
# installation related variables for apt
gitlab_apt_pref_file: /etc/apt/preferences.d/pin-gitlab-runner.pref
gitlab_apt_list_file: /etc/apt/sources.list.d/runner_gitlab-runner.list
```
These variables allow to add the gitlab-runner apt repositories to the target system, and pin the gitlab-ce's gitlab-runner package over the default community one.

```
# runner configuration and installation variables
gitlab_runner_config_file: /etc/gitlab-runner/config.toml
gitlab_runner_post_inst_script: /usr/share/gitlab-runner/post-install
gitlab_runner_package_script_url: "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh"
```
These variables concern the installation process of the gitlab runner. 

```
# script storage
gitlab_runner_tmp_script_location: "/tmp/gitlab-runner.deb.sh"
```
You can override this default variable to chose another location to store the gitlab runner repository configuration script.
