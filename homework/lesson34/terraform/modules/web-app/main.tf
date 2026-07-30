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

  env = [
    "ADMINER_DEFAULT_SERVER=${var.default_db_server}",
  ]

  restart = "unless-stopped"
}
