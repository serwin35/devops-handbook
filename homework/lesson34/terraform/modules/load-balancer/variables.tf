variable "container_name" {
  description = "Load balancer container name"
  type        = string
}

variable "image" {
  description = "Load balancer image"
  type        = string
}

variable "network_name" {
  description = "Docker network to attach the container to"
  type        = string
}

variable "external_port" {
  description = "Port published on the host"
  type        = number
}

variable "config_path" {
  description = "Absolute path to the nginx config mounted into the container"
  type        = string
}
