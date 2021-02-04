This is the code for my personal website built with React and Next.js. It is hosted on AWS using a combination of S3 + CloudFront. 

You can create your own next.js website by cloning this repo and get started right there!

For versioned deployments using S3, the workflow is as follows:

1. Commit your changes to your local git repo.
2. Run `buildnstage.sh` on the command line in the root of the repository. This will build the website's next.js bundle and create a staging folder in next's `out` directory corresponding to the hash of the local repository's current HEAD.
3. Run `aws-s3upload.sh`. This will upload the `/out` folder into a corresponding folder on your website's S3 bucket. The hashes are matched, which versions the 
files inside the S3 bucket. Furthermore, all the html files (your content) are uploaded redundantly without the file extension. This solves a problem with S3 static 
website routing using next.js, which fails to resolve routes with a ".html" extension upon page refresh. 
4. Run `aws-s3deploy.sh`. This syncs the uploaded S3 folder to another S3 folder called `current`, which contains the current deployment. To roll back changes to an earlier commit, you can set the `GITHASH` variable in the script to an earlier deployment's hash still present in the S3 bucket.

You can (and should) reset the `AWS_PROFILE` and `S3_BUCKET` variables to match your own scenario. Simply edit the script files for that :-)

More information can be found in this excellent Gist: https://gist.github.com/rbalicki2/30e8ee5fb5bc2018923a06c5ea5e3ea5

## Required permissions for versioned deployments on the command line

To deploy the website on the command line, you need 3 things:

 1. An AWS account.
 2. An AWS S3 bucket.
 3. An IAM user with the following minimum permissions:
 ```
  "Action": [
      "s3:PutObject",
      "s3:GetObject",
      "s3:ListBucket",
      "s3:DeleteObject",
      "s3:PutObjectAcl"
  ],
  "Resource": [
      "arn:aws:s3:::<YOUR_S3_BUCKET_NAME>/*",
      "arn:aws:s3:::<YOUR_S3_BUCKET_NAME>"
  ]
  ```

## Additional info

To configure your site with HTTPS, you have to resort to a CloudFront distribution, since S3 static website endpoints are http-only. Creating a CloudFront distribution is easy, you can even request a custom HTTPS cert for your domain from ACM during the creation process.

Also, it is recommended to adhere to AWS IAM best practices by using an IAM user profile with the minimum necessary permissions to perform bucket updates. You can create these users directly in the IAM console, export the credentials to a CSV file and read them in with the `aws configure import` command of the AWS CLI (NB: this requires v2 of the CLI).

## Sitemap generation

You can programmatically generate the sitemap by executing the `generate_sitemap.py` script in the root folder:
```
python generate_sitemap.py
```