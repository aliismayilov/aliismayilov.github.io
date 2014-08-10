---
layout: post
title: Deploy Jekyll with Mina
tags: jekyll mina centos digitalocean nginx
---

This blog is running on CentOS 7 server of [DigitalOcean](https://www.digitalocean.com/?refcode=ed777d54b05a).
The webserver is Nginx.
The blog system I am using is [Jekyll](http://jekyllrb.com/).
To make the deployment smooth and fast I use [Mina](http://mina-deploy.github.io/mina/).
The philosophy behind Mina is the same as Capistrano's, but with less features and configuration.

DigitalOcean has a good tutorial for setting up a CentOS server: [https://www.digitalocean.com/...-centos-6](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-centos-6)

Nginx has an official repo for CentOS which you can use for `sudo yum update`: [http://wiki.nginx.org/Install](http://wiki.nginx.org/Install)

Follow your preferred tool for Ruby version management and install ruby on the server.

Set up your jekyll blog on your local machine and make sure that it is ready for public. I use GitHub. You can use any git repository provider, but make sure that it will be available for pull from your CentOS machine. It can be even on your CentOS server!

### Mina configuration

Initial Mina deploy file can be created with `mina init` command.

Here is my `config/deploy.rb` file.

{% highlight ruby %}
# config/deploy.rb
require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rbenv'

set :domain,      'cloud.alii.pro'
set :user,        'ali'
set :deploy_to,   '/home/ali/blog'
set :repository,  'https://github.com/aliismayilov/blog.git'
set :branch,      'master'

task :environment do
  invoke :'rbenv:load'
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    invoke :'git:clone'
    invoke :'bundle:install'
    queue "#{bundle_prefix} jekyll build"
  end
end
{% endhighlight %}

Pretty straightforward. Declare ssh domain and user, deployment directory, repository to pull from (master branch).
Prepare the rbenv environment (loads .ruby-version file) and actual deploy process.

### Nginx configuration

First you'll need to create `/etc/nginx/sites-available/` and `/etc/nginx/sites-enabled/` folders.
I like this approach because you can easily symlink/unlink website configurations.
Add following line to `/etc/nginx/nginx.conf`:

{% highlight nginx %}
# /etc/nginx/nginx.conf
# ...
include /etc/nginx/sites-enabled/*;
# ...
{% endhighlight %}

Once your blog is on the server you cane create your nginx website files.

{% highlight nginx %}
# /etc/nginx/sites-available/blog.alii.pro
server {
  listen 80 default_server;
  server_name blog.alii.pro;
  root /home/ali/blog/current/_site;
  index index.html
  # how long should static files be cached for
  expires 1d;
}
{% endhighlight %}

Now symlink this file:

{% highlight bash %}
$ sudo ln -s /etc/nginx/sites-available/blog.alii.pro /etc/nginx/sites-enabled/blog.alii.pro
{% endhighlight %}


### Conclusion

These were the steps needed to take in order to set up Jekyll blog on CentOS. It can be easily deployed via `git push` and `mina deploy` commands.

I am great fan of GitHub, but GitHub Pages is way behind of the Jekyll release. I use Jekyll's tagging plugin, its SASS feature and I don't want limit myself on using any other feature of a great blogging system.

Here's the consoleshot of the deploy logs from local machine: [http://upl.io/b12cm7](http://upl.io/b12cm7).
