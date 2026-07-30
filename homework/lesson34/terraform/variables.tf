variable "network_name" {
  description = "Name of the shared Docker bridge network"
  type        = string
  default     = "app-net"
}

variable "db_container_name" {
  description = "Database container name"
  type        = string
  default     = "app-db"
}

variable "db_image" {
  description = "Database image"
  type        = string
  default     = "postgres:16"
}

variable "db_volume_name" {
  description = "Volume for database data"
  type        = string
  default     = "app-db-data"
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "appdb"
}

variable "db_user" {
  description = "Database user"
  type        = string
  default     = "app"
}

variable "db_password" {
  description = "Database password (override via TF_VAR_db_password)"
  type        = string
  default     = "secret123"
  sensitive   = true
}

variable "web_container_name" {
  description = "Web application container name"
  type        = string
  default     = "app-web"
}

variable "web_image" {
  description = "Web application image"
  type        = string
  default     = "adminer:latest"
}

variable "lb_container_name" {
  description = "Load balancer container name"
  type        = string
  default     = "app-lb"
}

variable "lb_image" {
  description = "Load balancer image"
  type        = string
  default     = "nginx:latest"
}

variable "lb_external_port" {
  description = "Port published on the host by the load balancer"
  type        = number
  default     = 8080
}