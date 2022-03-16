import pymongo
import json
# mongo_client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
# mongo_db = mongo_client['AIuserinfo']
# mongo_collection = mongo_db['imagerecord']
# info = {
#     "user_id": "62106da11a169d9e92370284",
#     "src_url": "http",
#     "dst_url": "https:"
# }
# mongo_collection.insert_one(info)
# find_condition = {
#     "user_id": "62106da11a169d9e92370284"
# }
# find_result = mongo_collection.find(find_condition)
# for content in find_result:
#     print(content)
def savefileinfo(jsoninfo):
    mongo_client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
    mongo_db = mongo_client['AIuserinfo']
    mongo_collection = mongo_db['imagerecord']
    mongo_collection.insert_one(jsoninfo)
def getuploadrecord(username):
    historyfile=["","","","","",""]
    jsoninfo={"user_id":username}
    mongo_client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
    mongo_db = mongo_client['AIuserinfo']
    mongo_collection = mongo_db['imagerecord']
    find_result = mongo_collection.find(jsoninfo)
    i=0
    for content in find_result:
        if i<6:
            historyfile[i]=content["src_url"]
        i=i+1
    historyjson={
        "url1": historyfile[0],
        "url2": historyfile[1],
        "url3": historyfile[2],
        "url4": historyfile[3],
        "url5": historyfile[4],
        "url6": historyfile[5]
        }
    return historyjson
# find_condition = {
#     "user_id": "62106da11a169d9e92370284"
# }
# res=getuploadrecord(find_condition)
# print(res)



