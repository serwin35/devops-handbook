output "container_id" {
  description = "ID of the load balancer container"
  value       = docker_container.this.id
}

output "container_name" {
  description = "Name of the load balancer container"
  value       = docker_container.this.name
}

output "external_url" {
  description = "URL exposed on the host"
  value       = "http://localhost:${var.external_port}"
}
