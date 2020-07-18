# `setup_net_fs` role

Create a Glusterfs cluster and configure the required directories.

This role will create the following shared directories:
- `/mnt/shared/registry`
- `/mnt/shared/monitoring`
- `/mnt/shared/beta`
- `/mnt/shared/production`

## Requirements

None

## Role vars

```
# partition customisation
glusterfs_data_size: 3G
glusterfs_part_directory: "/opt/gluster"
glusterfs_partition: "{{ glusterfs_part_directory }}/data"
```
Related to [part.yml](./tasks/part.yml), these variables allow to customize the "partition" used by GlusterFS.

```
# glusterfs global configuration
glusterfs_working_directory: "/mnt/glusterfs"
glusterfs_base_mountpoint: "/mnt/shared"
```
Specify the base directories for the brick creation and the volume mounting points.

```
# glusterfs bricks
glusterfs_shared_monitoring: "{{ glusterfs_working_directory }}/monitoring"
glusterfs_mounted_monitoring: "{{ glusterfs_base_mountpoint }}/monitoring"
glusterfs_shared_registry: "{{ glusterfs_working_directory }}/registry"
glusterfs_mounted_registry: "{{ glusterfs_base_mountpoint }}/registry"
# glusterfs applicative bricks
glusterfs_shared_production: "{{ glusterfs_working_directory }}/production"
glusterfs_mounted_production: "{{ glusterfs_base_mountpoint }}/production"
glusterfs_shared_beta: "{{ glusterfs_working_directory }}/beta"
glusterfs_mounted_beta: "{{ glusterfs_base_mountpoint }}/beta"
```
Actual bricks configuration.

```
# glusterfs peers
glusterfs_peer_a: 172.16.228.52
glusterfs_peer_b: 172.16.228.47
glusterfs_peer_c: 172.16.228.42
```
The node list which will compose the trusted pool and the volume's cluster.

```
# first probing host
glusterfs_single: vm3
```
Utility variable to first probe from one server.
