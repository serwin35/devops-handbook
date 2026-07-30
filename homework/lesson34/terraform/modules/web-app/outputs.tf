output "container_id" {
  description = "ID of the web application container"
  value       = docker_container.this.id
}

output "container_name" {
  description = "Name of the web application container"
  value       = docker_container.this.name
}
