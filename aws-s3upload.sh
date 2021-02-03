#!/bin/zsh

# change this to your S3 bucket name
S3_BUCKET=www.nicholasjunge.com
# namespace, good if you have staging / testing builds too
NAMESPACE=production
# change this to the name of your AWS IAM User Profile
AWS_PROFILE=githubactionswebsite

# copy _next and static folders, and make the files immutable
aws s3 cp ./out/_next s3://$S3_BUCKET/$NAMESPACE/_next \
  --cache-control immutable,max-age=100000000,public \
  --acl public-read --exclude "*.DS_Store" \
  --recursive --profile $AWS_PROFILE

# copy the out/builds folder, and make the files never cached.
# NOTE: there is a bug in AWS. If you copy a file that has been
# uploaded as immutable using aws cp and try to modify its cache-control
# metadata, it will retain its old metadata. Hence, we can't just do
# aws s3 cp ./out s3://$S3_BUCKET/$NAMESPACE
aws s3 cp ./out/builds s3://$S3_BUCKET/$NAMESPACE/builds \
  --cache-control max-age=0,no-cache \
  --acl public-read --exclude "*.DS_Store" \
  --recursive --profile $AWS_PROFILE

# Now, we've uploaded out/builds/$GITHASH/about/index.html to
# builds/$GITHASH/about/index.html
# But, s3 is stupid. When you request /about (without the terminal slash),
# it will only look for /about (no extension). So, we need a separate step
# to upload the html files redundantly.
(cd out/builds &&
  find . -type f -name '*.html' | while read HTMLFILE; do
    # split off ./ (first two chars)
    HTMLFILESHORT=${HTMLFILE:2}
    # split off extension
    HTMLFILE_NOEXT=${HTMLFILESHORT:r}

    # cp all files to versions without extension
    aws s3 cp s3://$S3_BUCKET/$NAMESPACE/builds/${HTMLFILESHORT} \
      s3://$S3_BUCKET/$NAMESPACE/builds/$HTMLFILE_NOEXT \
      --profile $AWS_PROFILE

    if [ $? -ne 0 ]; then
      echo "***** Failed renaming build to $S3_BUCKET/$NAMESPACE (html)"
      exit 1
    fi
  done)

# locally, we can't have a file named about and a folder named about/ in the
# same directory. Hence, we have to do a lot of individual copies.
# This step takes up a lot of time, but there's not much else we can do.
#
# These files need Content-Type: text/html metadata, which they inherit from
# the original files.