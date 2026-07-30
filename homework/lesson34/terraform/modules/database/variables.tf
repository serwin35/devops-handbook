variable "container_name" {
  description = "Database container name"
  type        = string
}

variable "image" {
  description = "Database image"
  type        = string
}

variable "network_name" {
  description = "Docker network to attach the container to"
  type        = string
}

variable "volume_name" {
  description = "Volume for database data"
  type        = string
}

variable "db_name" {
  description = "Database name"
  type        = string
}

variable "db_user" {
  description = "Database user"
  type        = string
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}
