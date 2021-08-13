from newspaper import Article

def scraper(url):
    article = Article(url)

    article.download()
    article.parse()

    print(article.text)
    return article.text