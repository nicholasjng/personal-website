GITHASH=`git rev-parse --short=12 HEAD`
S3_BUCKET=www.nicholasjunge.com
NAMESPACE=production
AWS_PROFILE=githubactionswebsite

aws s3 sync \
  s3://$S3_BUCKET/$NAMESPACE/builds/$GITHASH \
  s3://$S3_BUCKET/$NAMESPACE/current \
  --delete \
  --cache-control max-age=0,no-cache \
  --acl public-read --profile $AWS_PROFILE