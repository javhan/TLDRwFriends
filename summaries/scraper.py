from newspaper import Article

def scraper(url):
    article = Article(url)

    article.download()
    article.parse()

    print(article.text)
    return article.text

    # article.nlp() #* activate this for using article.summary
    # return article.summary


#! test area for newspaper nlp
# URL = "https://www.straitstimes.com/singapore/consumer/some-disgruntled-diners-fake-vaccination-certificates-in-first-week-of-dining-in"
# print(scraper(URL))