from newspaper import Article
from .make_summary import make_summary

def scraper(url):
    article = Article(url)
    article.download()
    if (article.html == None ): return "failed"
    article.parse()

    print(article.text)
    print(article.title)

    summary = make_summary(article.text)
    print(summary)

    if summary == None: return

    summary["title"] = article.title
    return summary

# url = "https://www.stackhawk.com/blog/what-is-cross-site-request-forgery-csrf/"
# scraper(url)