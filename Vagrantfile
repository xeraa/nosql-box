# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"


# Our custom installation routine
$script = <<SCRIPT

echo Get the base system up to date
sudo apt-get update && sudo apt-get -y upgrade

if [ $(dpkg-query -W -f='${Status}' openjdk-7-jdk 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo Install Java and Maven
  sudo apt-get install -y openjdk-7-jdk maven && echo 'export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64' >> ~/.profile
fi

if [ $(dpkg-query -W -f='${Status}' redis-server 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo Install Redis
  sudo apt-get install -y redis-server
fi

if [ $(dpkg-query -W -f='${Status}' mongodb 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo Install MongoDB
  sudo apt-get install -y mongodb
fi

if [ $(dpkg-query -W -f='${Status}' couchdb 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo Install CouchDB
  sudo apt-get install -y couchdb
fi

if [ $(dpkg-query -W -f='${Status}' cassandra 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo Install Cassandra
  echo 'deb http://www.apache.org/dist/cassandra/debian 20x main' | sudo tee -a /etc/apt/sources.list
  echo 'deb-src http://www.apache.org/dist/cassandra/debian 20x main' | sudo tee -a /etc/apt/sources.list
  gpg --keyserver pgp.mit.edu --recv-keys 4BD736A82B5C1B00 && gpg --export --armor 4BD736A82B5C1B00 | sudo apt-key add -
  gpg --keyserver pgp.mit.edu --recv-keys 2B5C1B00 && gpg --export --armor 2B5C1B00 | sudo apt-key add -
  sudo apt-get update && sudo apt-get install -y cassandra
fi

if [ $(dpkg-query -W -f='${Status}' neo4j 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo Install Neo4j
  echo 'deb http://debian.neo4j.org/repo stable/' | sudo tee -a /etc/apt/sources.list
  gpg --keyserver pgp.mit.edu --recv-keys B73A5F962DC499C3 && gpg --export --armor B73A5F962DC499C3 | sudo apt-key add -
  sudo apt-get update && sudo apt-get install -y neo4j
  echo 'org.neo4j.server.webserver.address=0.0.0.0' | sudo tee -a /etc/neo4j/neo4j-server.properties
fi

if [ $(dpkg-query -W -f='${Status}' elasticsearch 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo Install ElasticSearch
  echo 'deb http://packages.elasticsearch.org/elasticsearch/1.1/debian stable main' | sudo tee -a /etc/apt/sources.list
  gpg --keyserver pgp.mit.edu --recv-keys D27D666CD88E42B4 && gpg --export --armor D27D666CD88E42B4 | sudo apt-key add -
  sudo apt-get update && sudo apt-get install -y elasticsearch
  sudo update-rc.d elasticsearch defaults 95 10
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

  # Forward CouchDB
  config.vm.network "forwarded_port", guest: 5984, host: 5984

  # Forward Neo4j
  config.vm.network "forwarded_port", guest: 7474, host: 7474

  # Forward ElasticSearch
  config.vm.network "forwarded_port", guest: 9200, host: 9200

  # Forward MongoDB
  config.vm.network "forwarded_port", guest: 27017, host: 27017


  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:

  config.vm.provider "virtualbox" do |vb|

    # Use VBoxManage to customize the VM.
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end


  # Fox https://github.com/mitchellh/vagrant/issues/1673
  config.ssh.pty = true

  # Install our dependencies
  config.vm.provision "shell", inline: $script

end
