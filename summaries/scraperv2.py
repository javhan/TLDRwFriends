from newspaper import Article
from .make_summary import make_summary

def scraper(url):
    article = Article(url)
    article.download()
    if (article.html == None ): return "failed"
    article.parse()

    summary = make_summary(article.text)

    if summary == None: return

    summary["title"] = article.title
    return summary
