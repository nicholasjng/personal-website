This is the code for my personal website built with React and Next.js. It is hosted on AWS using a combination of S3 + CloudFront. 

You can create your own next.js website by cloning this repo and get started right there!

For versioned deployments using S3, the workflow is as follows:

1. Commit your changes to your local git repo.
2. Run `buildnstage.sh` on the command line in the root of the repository. This will build the website's next.js bundle and create a staging folder in next's `out` directory corresponding to the hash of the local repository's current HEAD.
3. Run `aws-s3upload.sh`. This will upload the `/out` folder into a corresponding folder on your website's S3 bucket. The hashes are matched, which versions the 
files inside the S3 bucket. Furthermore, all the html files (your content) are uploaded redundantly without the file extension. This solves a problem with S3 static 
website routing using next.js, which fails to resolve routes with a ".html" extension upon page refresh. 
4. Run `aws-s3deploy.sh`. This syncs the uploaded S3 folder to another S3 folder called `current`, which contains the current deployment. To roll back changes to an earlier commit, you can set the `GITHASH` variable in the script to an earlier deployment's hash still present in the S3 bucket.

More information can be found in this Gist: https://gist.github.com/rbalicki2/30e8ee5fb5bc2018923a06c5ea5e3ea5


 
