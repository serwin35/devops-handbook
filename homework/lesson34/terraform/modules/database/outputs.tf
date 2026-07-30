output "container_id" {
  description = "ID of the database container"
  value       = docker_container.this.id
}

output "container_name" {
  description = "Name of the database container"
  value       = docker_container.this.name
}

output "volume_name" {
  description = "Name of the data volume"
  value       = docker_volume.data.name
}
