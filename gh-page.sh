yarn fetch && yarn build
git add -f dist
git commit -m 'update page'
git subtree push --prefix dist origin gh-pages
