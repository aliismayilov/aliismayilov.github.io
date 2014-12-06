---
layout: post
title:  Amazon Reduced Redundancy Storage
tags: aws s3 paperclip
image: /images/2014/rrs.png
category: blog
---

While working on a network application which was using Amazon S3 as a temporary file storage,
I recalled that there is Reduced Redundancy Storage.
It turned out that one line of code saved me up to **20%** of the storage expenses.

I usually try to remember overview descriptions of the products.
That way it's easier to come back to it and check if it really fits my needs.

Here's a quote from [AWS S3 FAQ](http://aws.amazon.com/s3/faqs):
> RRS is ideal for non-critical or reproducible data. For example, RRS is a cost-effective solution for sharing media content that is durably stored elsewhere. RRS also makes sense if you are storing thumbnails and other resized images that can be easily reproduced from an original image.

That's exactly what I needed. While uploading a file I needed to specify storage type. Default is `STANDARD`.
Digging in more in the docs I found out that all I need is to add one more header `x-amz-storage-class`:

```
x-amz-storage-class: REDUCED_REDUNDANCY
```

You can also confirm the result on AWS Console:

<img src="/images/2014/rrs.png" alt="Reduced Redundancy" title="Yes you can change it manually too." class="img-responsive">

As FAQ says it is also good for thumbnails. First library I checked was [Paperclip](https://github.com/thoughtbot/paperclip).
Turned out that they already had support for it and I never noticed it. Because they buried it inside the [documentation](http://rubydoc.info/gems/paperclip/Paperclip/Storage/S3) instead of frontpage, README. Check S3 libraries you use for RRS support. Don't miss it!

If you are still asking why is it cheaper, here's answer from FAQ:
> RRS is designed to provide 99.99% durability of objects over a given year. This durability level corresponds to an average annual expected loss of 0.01% of objects. For example, if you store 10,000 objects using the RRS option, you can on average expect to incur an annual loss of a single object (i.e. 0.01% of 10,000 objects). This annual loss represents an expected average and does not guarantee the loss of 0.01% of objects in a given year.

> The RRS option stores objects on multiple devices across multiple facilities, providing 400 times the durability of a typical disk drive, but does not replicate objects as many times as standard Amazon S3 storage, and thus is even more cost effective. In addition, RRS is designed to sustain the loss of data in a single facility.
