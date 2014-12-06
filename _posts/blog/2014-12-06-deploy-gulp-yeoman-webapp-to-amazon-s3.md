---
layout: post
title:  Deploy Gulp Yeoman webapp to Amazon S3
tags: gulp yeoman js javascript aws s3 optimization gzip
image: /images/2014/gulp-2x.png
category: blog
---

Recently I wrote a [recipe](https://github.com/yeoman/generator-gulp-webapp/blob/master/docs/recipes/aws-s3-deployment.md) for how to deploy a Yeoman Gulp Webapp to Amazon S3.
Now I'd like to give more configuration on deploying to S3.
Specifically, optimization notes.

#### Revving

After you follow the recipe and add `gulp deploy` task, I highly recommend you to revision your assets.
The above recipe puts a long expiry date which means that once the assets have been downloaded to client's browser, they will stay there for a long time. Which is actually good, unless you don't make any changes.

There's a recipe for that: [Asset revisioning](https://github.com/yeoman/generator-gulp-webapp/blob/master/docs/recipes/revving.md). Just follow it, straigtforward.

Every time you update your assets they will be renamed to include a hash `app-4321231.js`, which will make the clients to download assets every time you update them.

#### Compression (gzip)

Compression should not be confused with minification. Gzipping can save up to 50% of the served files size. Which also means that it will save your bandwith (and hosting if you pay for) billing.

I tried to do it on my own project with [gulp-gzip](https://www.npmjs.org/package/gulp-gzip), but I had a hard time with Content-Types and Content-Encoding. Filename references can be solved with [gulp-rev-replace](https://www.npmjs.org/package/gulp-rev-replace). Which is also described in asset revisioning recipe.

The easiest solution I found was to use [gulp-awspublish](https://www.npmjs.org/package/gulp-awspublish) which already has a built-in support for it. We are already using it for deployment. Just add the following command and that's it:

```diff
gulp.task('deploy', ['build'], function () {
  // create a new publisher
  var publisher = $.awspublish.create({
    key: '...',
    secret: '...',
    bucket: '...'
  });

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('dist/**/*.*')
+   .pipe($.awspublish.gzip({ ext: '' }))
    .pipe(publisher.publish(headers))
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe($.awspublish.reporter());
});
```

It will gzip all your files, keeping their original filenames and set the correct `Content-Encoding` on Amazon S3.

Profit!
