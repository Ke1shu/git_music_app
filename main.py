# -*- coding: utf-8 -*-
import eel,json,requests,urllib
eel.init("web")


@eel.expose
def music_search(key,no):

    # URLエンコード
    keywords = urllib.parse.quote(str(key))
    page = no

    # cf https://qiita.com/ssssssssok1/items/dfebcb352c3302c6af9a
    url = "https://theinfoapps.com/myfm/search/v2/?fmev=0&appid=com.bassmusicfm.ios.fm&page_no={}&query={}&type=song".format(page,keywords)

    # cf https://www.craneto.co.jp/archives/1331/
    res = urllib.request.urlopen(url)

    # json_loads() でPythonオブジェクトに変換
    data = json.loads(res.read().decode('utf-8'))

    return data

eel.start("index.html")
