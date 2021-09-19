yarn
yarn fetch && yarn build
rm -rf ./docs
mv ./dist ./docs
cp CNAME ./docs
git add .
git commit -am "update page"
