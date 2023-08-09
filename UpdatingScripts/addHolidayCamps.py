from pymongo import MongoClient
client = MongoClient("localhost", 3000)
db = client.test_database