yarn
yarn fetch && yarn build
if [ $? -eq 0 ]; then
    echo "fetch and build succeed"
    rm -rf ./docs
    mv ./dist ./docs
else
    echo "fetch and build failed"
fi
cp CNAME ./docs
git add .
git commit -am "update page"
