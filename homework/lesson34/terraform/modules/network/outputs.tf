output "network_id" {
  description = "ID of the network"
  value       = docker_network.this.id
}

output "network_name" {
  description = "Name of the network"
  value       = docker_network.this.name
}
