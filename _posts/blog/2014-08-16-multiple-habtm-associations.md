---
layout: post
title:  Multiple HABTM associations between 2 models in Rails
tags: [rails, activerecord, models, has_and_belongs_to_many, multiple, relationship, rspec]
---

There can be a case where you want to have more than one `has_and_belongs_to_many` associations between 2 models.
Here I will show you how to achieve this and write some specs.

Consider following case: There are services (like cleaning, fixing stuff). A service has providers and seekers, both of which are Users.

```ruby
# spec/models/service_spec.rb
require 'rails_helper'

describe Service do
  describe 'associations' do
    it { is_expected.to have_and_belong_to_many(:providers)
                                        .class_name('User') }
    it { is_expected.to have_and_belong_to_many(:seekers)
                                        .class_name('User') }
  end
end
```


There are users. A user can provide and look for services.

```ruby
# spec/models/user_spec.rb
require 'rails_helper'

describe User do
  describe 'associations' do
    it { is_expected.to have_and_belong_to_many(:provides)
                                    .class_name('Service') }
    it { is_expected.to have_and_belong_to_many(:seeks)
                                    .class_name('Service') }
  end
end
```


For this we'll need 2 more tables. One join table for providers, another for seekers. Here's our migration:

```ruby
# db/migrate/20140807005921_join_providers_seekers_services.rb
class JoinProvidersSeekersServices < ActiveRecord::Migration
  def change
    create_table :providers_services do |t|
      t.references :user, index: true
      t.references :service, index: true

      t.timestamps
    end

    create_table :seekers_services do |t|
      t.references :user, index: true
      t.references :service, index: true

      t.timestamps
    end
  end
end
```


And now we can join our 2 models in multiple `has_and_belongs_to_many` associations:

```ruby
# app/models/service.rb
class Service < ActiveRecord::Base
  has_and_belongs_to_many :seekers, join_table: 'seekers_services',
    class_name: 'User'
  has_and_belongs_to_many :providers, join_table: 'providers_services',
    class_name: 'User'
end
```

```ruby
# app/models/user.rb
class User < ActiveRecord::Base
  has_and_belongs_to_many :seeks, join_table: 'seekers_services',
    class_name: 'Service'
  has_and_belongs_to_many :provides, join_table: 'providers_services',
    class_name: 'Service'
end
```


Specs are written with [rspec-rails 3](https://github.com/rspec/rspec-rails) and [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers).
