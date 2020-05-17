# 开发
yarn global add parcel-bundler
parcel src/index.html

# 发布
rm -rf dist
parcel build src/index.html --no-minify --public-url ./