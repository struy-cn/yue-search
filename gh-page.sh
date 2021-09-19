yarn fetch && yarn build
rm -rf ./docs
mv ./dist ./docs
git add .
git commit -am "update page"
git push