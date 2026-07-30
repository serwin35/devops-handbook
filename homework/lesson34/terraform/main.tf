provider "docker" {
  host = "unix:///var/run/docker.sock"
}

module "network" {
  source = "./modules/network"

  network_name = var.network_name
}

module "database" {
  source = "./modules/database"

  container_name = var.db_container_name
  image          = var.db_image
  network_name   = module.network.network_name
  volume_name    = var.db_volume_name
  db_name        = var.db_name
  db_user        = var.db_user
  db_password    = var.db_password
}

module "web_app" {
  source = "./modules/web-app"

  container_name    = var.web_container_name
  image             = var.web_image
  network_name      = module.network.network_name
  default_db_server = module.database.container_name
}

module "load_balancer" {
  source = "./modules/load-balancer"

  container_name = var.lb_container_name
  image          = var.lb_image
  network_name   = module.network.network_name
  external_port  = var.lb_external_port
  config_path    = abspath("${path.root}/../lb/nginx.conf")
}