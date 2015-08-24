# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"


# Our custom installation routine
$script = <<SCRIPT
set -x

echo Get the base system up to date
sudo apt-get update && sudo apt-get -y upgrade && sudo apt-get autoclean -y && sudo apt-get autoremove -y

echo Fix the locale
echo 'LC_ALL="en_US.UTF-8"' | sudo tee /etc/environment

if [ $(dpkg-query -W -f='${Status}' mongodb-org 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo Install MongoDB
  VERSION=3.0.5
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
  echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
  sudo apt-get install -y mongodb-org=$VERSION mongodb-org-server=$VERSION mongodb-org-shell=$VERSION mongodb-org-mongos=$VERSION mongodb-org-tools=$VERSION
fi

echo All done...

SCRIPT



Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/trusty64"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Forward the MongoDB default port
  config.vm.network "forwarded_port", guest: 27017, host: 27017

  # Forward additional MongoDB ports for replication and sharding
  config.vm.network "forwarded_port", guest: 27018, host: 27018
  config.vm.network "forwarded_port", guest: 27019, host: 27019
  config.vm.network "forwarded_port", guest: 27020, host: 27020
  config.vm.network "forwarded_port", guest: 27021, host: 27021


  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:

  config.vm.provider "virtualbox" do |vb|

    # Use VBoxManage to customize the VM.
    vb.customize ["modifyvm", :id, "--memory", "512"]
  end


  # Install our dependencies
  config.vm.provision "shell", inline: $script


end
