from os import link
from re import I
from googlesearch import search
from newspaper import Article
import spacy

nlp = spacy.load("en_core_web_md", disable=["tagger", "attribute_ruler", "lemmatizer"])

def scraper(url):
    article = Article(url)
    article.download()
    article.parse()
    article.nlp()
    return nlp(str(article.keywords))

def primerChecker(param, text):
    links = search(f"What is {param}", num_results=5)
    top_scorer = [param, ""]
    score = 0
    def scoreCheck(link):
        try:
            test=scraper(link)
            points = text.similarity(test)
            print(param, link, points)
            if (points > score):
                top_scorer[1] = link
        except:
            pass
    checker = map(scoreCheck, links)
    list(checker)
    return top_scorer



