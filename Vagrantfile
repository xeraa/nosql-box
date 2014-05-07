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
fi

echo All done...

SCRIPT



Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/trusty64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

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


  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # If true, then any SSH connections made will enable agent forwarding.
  # Default value: false
  # config.ssh.forward_agent = true

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Don't boot with headless mode
  #   vb.gui = true
  #
  #   # Use VBoxManage to customize the VM. For example to change memory:
  #   vb.customize ["modifyvm", :id, "--memory", "1024"]
  # end
  #
  # View the documentation for the provider you're using for more
  # information on available options.

  # Enable provisioning with CFEngine. CFEngine Community packages are
  # automatically installed. For example, configure the host as a
  # policy server and optionally a policy file to run:
  #
  # config.vm.provision "cfengine" do |cf|
  #   cf.am_policy_hub = true
  #   # cf.run_file = "motd.cf"
  # end
  #
  # You can also configure and bootstrap a client to an existing
  # policy server:
  #
  # config.vm.provision "cfengine" do |cf|
  #   cf.policy_server_address = "10.0.2.15"
  # end

  # Enable provisioning with Puppet stand alone.  Puppet manifests
  # are contained in a directory path relative to this Vagrantfile.
  # You will need to create the manifests directory and a manifest in
  # the file default.pp in the manifests_path directory.
  #
  # config.vm.provision "puppet" do |puppet|
  #   puppet.manifests_path = "manifests"
  #   puppet.manifest_file  = "site.pp"
  # end

  # Enable provisioning with chef solo, specifying a cookbooks path, roles
  # path, and data_bags path (all relative to this Vagrantfile), and adding
  # some recipes and/or roles.
  #
  # config.vm.provision "chef_solo" do |chef|
  #   chef.cookbooks_path = "../my-recipes/cookbooks"
  #   chef.roles_path = "../my-recipes/roles"
  #   chef.data_bags_path = "../my-recipes/data_bags"
  #   chef.add_recipe "mysql"
  #   chef.add_role "web"
  #
  #   # You may also specify custom JSON attributes:
  #   chef.json = { :mysql_password => "foo" }
  # end

  # Enable provisioning with chef server, specifying the chef server URL,
  # and the path to the validation key (relative to this Vagrantfile).
  #
  # The Opscode Platform uses HTTPS. Substitute your organization for
  # ORGNAME in the URL and validation key.
  #
  # If you have your own Chef Server, use the appropriate URL, which may be
  # HTTP instead of HTTPS depending on your configuration. Also change the
  # validation key to validation.pem.
  #
  # config.vm.provision "chef_client" do |chef|
  #   chef.chef_server_url = "https://api.opscode.com/organizations/ORGNAME"
  #   chef.validation_key_path = "ORGNAME-validator.pem"
  # end
  #
  # If you're using the Opscode platform, your validator client is
  # ORGNAME-validator, replacing ORGNAME with your organization name.
  #
  # If you have your own Chef Server, the default validation client name is
  # chef-validator, unless you changed the configuration.
  #
  #   chef.validation_client_name = "ORGNAME-validator"


  config.ssh.pty = true # https://github.com/mitchellh/vagrant/issues/1673

  # Install our dependencies
  config.vm.provision "shell", inline: $script

end
