git checkout gh-pages
git pull
git merge master
yarn fetch && yarn build
git add -f dist
git commit -m 'update page'
git subtree push --prefix dist origin gh-pages
git checkout master
