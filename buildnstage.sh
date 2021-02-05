#!/bin/zsh
# get short version of the HEAD's git hash
GITHASH=`git rev-parse --short HEAD`

#generate sitemap XML document
python3 generate_sitemap.py

(cd public/assets && 
  find . -type f \( -name  '*.png' -o  -name '*.jpg' \) ! -path "./about/*" ! -path "./og/*" | while read IMAGE; do

    echo $IMAGE
    # split off extension
    IMAGE_NOEXT=${IMAGE:r}
    echo $IMAGE_NOEXT

    width_array=(384 512 768 1024 1280 1536 2048)

    for width in $width_array; do
      # cp all files to versions without extension
      cwebp -q 80 -resize $width 0 $IMAGE -o ${IMAGE_NOEXT}-${width}.webp
    done

    if [ $? -ne 0 ]; then
      echo "***** Failed converting .jpg images to .webp format."
      exit 1
    fi
  done)

npm run build

# at this point, we have an out directory as follows
# out/[all html files]
# out/_next/[all next files]

# now, we move things around to work with the S3 config described above
# the goal is to be able to have this new directory structure reflect what
# we want in S3, so that we can do aws s3 cp ./out s3://$S3_BUCKET/$NAMESPACE/
# (even though, as you'll see, we don't exactly do that).
mv out/_next . # out/ contains only html files
mv out _out
mkdir -p out/builds/$GITHASH
mv _out/* out/builds/$GITHASH
rm -rf _out
mv _next out/
