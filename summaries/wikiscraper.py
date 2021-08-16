# ref: https://www.freecodecamp.org/news/scraping-wikipedia-articles-with-python/

import requests
import re
from bs4 import BeautifulSoup

#! choose wiki topic here

# param = 'amy winehouse'
# URL = f"https://en.wikipedia.org/wiki/{param}"

#* newspaper article summary comparison
URL = "https://www.nytimes.com/2021/08/14/us/politics/afghanistan-biden-taliban.html"

response = requests.get(
    url=URL
)

#get elem by ID tag
soup = BeautifulSoup(response.content, 'lxml')
title = soup.find_all('p')
text = ''
for para in title:
    text += para.text
text = re.sub(r'\[.*?\]+', '', text)
text = re.sub(r'\{.*?\}+', '', text)
text = text.replace('\n', '')
# print(text)
# print(title, "status", response.status_code)
# print(soup.get_text())

# import wikipedia

# wiki = wikipedia.page(param)

# text = wiki
# print(wiki)











# # Get all the links
# allLinks = soup.find(id="bodyContent").find_all("a")
# random.shuffle(allLinks)
# linkToScrape = 0

# for link in allLinks:
# 	# We are only interested in other wiki articles
# 	if link['href'].find("/wiki/") == -1: 
# 		continue

# 	# Use this link to scrape
# 	linkToScrape = link
# 	break

# print(linkToScrape)