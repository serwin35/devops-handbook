terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
    }
  }
}

resource "docker_volume" "data" {
  name = var.volume_name
}

resource "docker_container" "this" {
  name  = var.container_name
  image = var.image

  networks_advanced {
    name = var.network_name
  }

  env = [
    "POSTGRES_DB=${var.db_name}",
    "POSTGRES_USER=${var.db_user}",
    "POSTGRES_PASSWORD=${var.db_password}",
  ]

  volumes {
    volume_name    = docker_volume.data.name
    container_path = "/var/lib/postgresql/data"
  }

  restart = "unless-stopped"
}
