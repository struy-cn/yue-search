touch public/wechat-page/2018.html && curl -s "https://mp.weixin.qq.com/s/5e3HSJQfq11zTCUoNAvggg?f=json" | jq --raw-output .content_noencode >public/wechat-page/2018.html
touch public/wechat-page/2019.html && curl -s "https://mp.weixin.qq.com/s/wrG3TwBBD3lVmUjm5KpJUw?f=json" | jq --raw-output .content_noencode >public/wechat-page/2019.html
touch public/wechat-page/2020.html && curl -s "https://mp.weixin.qq.com/s/IGVt1tWItyWcxiXZr8uO5A?f=json" | jq --raw-output .content_noencode >public/wechat-page/2020.html
touch public/wechat-page/2021.html && curl -s "https://mp.weixin.qq.com/s/hf4fF_DgXpDk9ENcW8-LGg?f=json" | jq --raw-output .content_noencode >public/wechat-page/2021.html

datas=$(ls public/wechat-page/)
echo '[' >public/db/data.json
for data in $datas; do
    echo "\"$data\"," >>public/db/data.json
done
datas=$(cat public/db/data.json)
echo ${datas%?} > public/db/data.json
echo ']' >>public/db/data.json