variable "container_name" {
  description = "Web application container name"
  type        = string
}

variable "image" {
  description = "Web application image"
  type        = string
}

variable "network_name" {
  description = "Docker network to attach the container to"
  type        = string
}

variable "default_db_server" {
  description = "Hostname of the database server the app connects to"
  type        = string
}
