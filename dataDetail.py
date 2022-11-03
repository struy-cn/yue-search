#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os
import re
import requests
import json
import time
import copy
import hashlib

img_path = './public/cover'
db_path = './public/db'
path = './public/wechat-page'
files = os.listdir(path)
cover_files = os.listdir(img_path)
linkPattern = re.compile(
    r'<a.*?href="(.*?)".*?textvalue="(.*?)".*?>.*?>(.*?)<\/span><\/a>')
domPattern = re.compile("<.*?\/?>")


def genearteMD5(str):
    """
    生成MD5
    """
    hl = hashlib.md5()
    hl.update(str.encode(encoding='utf-8'))
    return hl.hexdigest()


for file in files:
    if not os.path.isdir(file):  # 判断是否是文件夹
        year = file.replace('.html', '')
        filePath = path+"/"+file
        f = open(filePath, 'r')
        content = f.read()
        f.close()
        # 解析已经存储过的html
        dbFilePath = db_path + "/" + year+'.json'
        hasDbFilePath = os.path.exists(dbFilePath)
        curr_year_list = []
        if hasDbFilePath:
            f1 = open(dbFilePath, 'r')
            curr_year_json = f1.read()
            f1.close()
            curr_year_list = json.loads(curr_year_json)
        # 解析html
        matchObj = linkPattern.findall(content)
        print('开始解析 %s' % year)
        if matchObj:
            linkInfos = copy.deepcopy(curr_year_list)
            for link in matchObj:
                # 可能有其他字符
                text = re.sub(domPattern, '', link[2])
                title = link[1]
                number = 0
                if('、' in title):
                    number = int(title.split("、")[0])
                href = link[0]
                exist = list(filter(lambda x: x.get('title') ==
                                    title and x.get('href') == href, curr_year_list))
                if not exist:
                    hrefApi = href.replace(
                        '#wechat_redirect', '&f=json').replace('http', 'https')
                    try:
                        linkContent = requests.get(
                            hrefApi, headers={'Connection': 'close'}).json()
                        linkInfo = {'title': title, 'href': href, 'text': text, 'number': number,
                                    'coverLink': genearteMD5(title)+'.jpg', 'linkContent': linkContent}
                        time.sleep(1)
                        linkInfos.append(linkInfo)
                        print(len(linkInfos), '/', len(matchObj))
                    except:
                        json_str = json.dumps(linkInfos, ensure_ascii=False)
                        fYear = open(db_path+'/'+year+'.json', 'w')
                        fYear.write(json_str)
                        fYear.close()
        print("获取封面图")
        for info in linkInfos:
            cover_exist = list(
                filter(lambda x: (info['coverLink'] == x), cover_files))
            if (not cover_exist) and info.get('linkContent'):
                file_name = info['coverLink']
                cdn_url = info['linkContent']['cdn_url']
                img_res = requests.get(cdn_url)
                with open(img_path+'/'+file_name, 'wb') as img:
                    img.write(img_res.content)
            if info.get('linkContent'):
                info['pageTitle'] = info['linkContent']['title']
                info['desc'] = info['linkContent']['desc']
                info['contentNoencode'] = info['linkContent']['content_noencode']
                info['createTime'] = info['linkContent']['create_time']
                info['oriCreateTime'] = info['linkContent']['ori_create_time']
                del info['linkContent']
        linkInfos.sort(key=lambda x: x['oriCreateTime'], reverse=True)
        json_str = json.dumps(linkInfos, ensure_ascii=False)
        fYear = open(db_path+'/'+year+'.json', 'w')
        fYear.seek(0)
        fYear.truncate()
        fYear.write(json_str)
        fYear.close()
