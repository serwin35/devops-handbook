terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
    }
  }
}

resource "docker_container" "this" {
  name  = var.container_name
  image = var.image

  networks_advanced {
    name = var.network_name
  }

  ports {
    internal = 80
    external = var.external_port
    ip       = "0.0.0.0"
    protocol = "tcp"
  }

  volumes {
    host_path      = var.config_path
    container_path = "/etc/nginx/conf.d/default.conf"
    read_only      = true
  }

  restart = "unless-stopped"
}
