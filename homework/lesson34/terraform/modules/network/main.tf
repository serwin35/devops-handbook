terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
    }
  }
}

resource "docker_network" "this" {
  name   = var.network_name
  driver = "bridge"
}
