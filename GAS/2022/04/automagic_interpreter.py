import requests
import wget
import pyglet

response = requests.get("https://network.satnogs.org/api/observations/?end=2022-04-02T15%3A22%3A00Z&ground_station=&id=&observer=&page=6&satellite__norad_cat_id=51439&start=2022-03-29T01%3A00%3A00Z&status=&transmitter_mode=&transmitter_type=&transmitter_uuid=&vetted_status=&vetted_user=&waterfall_status=")


# for transmission in response.json():
#     if transmission["payload"] != None:
#         print(transmission["payload"])
#     else:
#         print(transmission["archive_url"])

path = r"/Users/taylorrowser/taylorrowser.github.io/GAS/2022/04/" + "test.ogg"
url = response.json()[0]["payload"]
wget.download(url, path)
music = pyglet.resource.media(r"/Users/taylorrowser/taylorrowser.github.io/GAS/2022/04/test.ogg")
music.play()
pyglet.app.run()