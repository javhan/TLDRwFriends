from newspaper import Article
from .make_summary import make_summary

def scraper(url):
    article = Article(url)

    article.download()
    article.parse()
    article.nlp()

    print(article.text)
    print(article.title)
    summary = make_summary(article.text) 
    print(summary)  
    
    summary["title"] = article.title 
    return summary

    # article.nlp() #* activate this for using article.summary
    # return article.summary

