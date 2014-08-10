---
layout: post
title: Rails Vagrant box
tags: vagrant rails windows puppet
image: http://upload.wikimedia.org/wikipedia/commons/8/87/Vagrant.png
---

Recently, I had a pleasure to work with @kinnaj.
He is a designer and uses Photoshop on Windows.
We were going to work on a Rails project together.

You noticed it right. _Windows + Rails = :sweat:_

Among all the solutions I thought (including cloud IDE) vagrant was the smoothest.
Building a suitable box is not a problem, but I wanted it to be automated and available inside of our repo.

1. So, I forked [rails/rails-dev-box](https://github.com/rails/rails-dev-box) repo;
1. Removed MySQL [8fe6b0e](https://github.com/aliismayilov/rails-dev-box/commit/8fe6b0e208fdda6491efb45f753922939df76391#diff-d41d8cd98f00b204e9800998ecf8427e);
1. Made `postgres` user trusted [cb1384b](https://github.com/aliismayilov/rails-dev-box/commit/cb1384bf7e52eb7b055114bf2d3e170506789c0d#diff-d41d8cd98f00b204e9800998ecf8427e);
1. Updated ruby version to `2.1.2` [4b32caf](https://github.com/aliismayilov/rails-dev-box/commit/4b32cafb06c8ec27059083b4343c89418f7ab262#diff-d41d8cd98f00b204e9800998ecf8427e);
1. Added [aliismayilov/rails-dev-box](https://github.com/aliismayilov/rails-dev-box) as a submodule to our Rails project.

Here is the modified part of Vagrantfile from the project:

```ruby
# ...
  # Use 1GB RAM instead of default < 512MB.
  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end

  # specify puppet manifest and module files location
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = 'rails-dev-box/puppet/manifests'
    puppet.module_path    = 'rails-dev-box/puppet/modules'
  end
# ...
```

Now my collegue had to install VirtualBox and Vagrant.
Run the following commands to be inside of a working vagrant box with Rails+PostgresSQL+Memcached.

```sh
> vagrant up
> vagrant ssh
$ cd /vagrant
```
