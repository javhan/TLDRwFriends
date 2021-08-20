from googlesearch import search
from newspaper import Article
import spacy
import asyncio
import concurrent.futures

nlp = spacy.load("en_core_web_md", disable=["tagger", "attribute_ruler", "lemmatizer"])

def scraper(url):
    article = Article(url)
    article.download()
    article.parse()
    article.nlp()
    return nlp(str(article.keywords))

def primerChecker(text, param):
    links = search(f"What is {param}", num_results=3)
    top_scorer = [param, ""]
    score = 0
    def scoreCheck(link):
        nonlocal score        
        try:
            test = scraper(link)
            points = text.similarity(test)
            print(param, link, points)
            if (points > score):
                top_scorer[1] = link
                score = points
        except:
            pass
    with concurrent.futures.ThreadPoolExecutor() as executor:
        result = executor.map(scoreCheck, links)
    return top_scorer



