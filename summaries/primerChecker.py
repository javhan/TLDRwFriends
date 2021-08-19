from googlesearch import search
from newspaper import Article
import spacy

nlp = spacy.load("en_core_web_md")

def scraper(url):
    article = Article(url)
    article.download()
    article.parse()
    article.nlp()
    return nlp(str(article.keywords))

def primerChecker(param, text):
    referenceText = nlp(text)
    links = search(f"What is {param}", num_results=5)
    top_scorer = [param, ""]
    score = 0
    for i in links:
        try:
            print("HIT")
            test=scraper(i)
            points = referenceText.similarity(test)
            if (points > score):
                top_scorer[1] = i
                score = points
        except:
            pass
    return top_scorer

