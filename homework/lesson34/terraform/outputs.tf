output "network_id" {
  description = "ID of the Docker network"
  value       = module.network.network_id
}

output "database_container" {
  description = "Database container name"
  value       = module.database.container_name
}

output "web_app_container" {
  description = "Web application container name"
  value       = module.web_app.container_name
}

output "load_balancer_url" {
  description = "Application entrypoint exposed by the load balancer"
  value       = module.load_balancer.external_url
}
