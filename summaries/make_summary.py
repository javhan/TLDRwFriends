import spacy
import functools
from .primerChecker import primerChecker
from pprint import pp
from heapq import nlargest

"""Settings for Summary Processing"""
TLDR_LEVEL = 0.5
MAX_SENTENCES = 5
MAX_TOPICS = 5
ENTITY_ARRAY = ["ORG", "PRODUCT", "PERSON", "NORG", "GPE"]

def make_summary(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)

    scraped = {
        "content" : [],
        "title" : "",
        "tags": [],
        "primers": [],
    }

    """Iterate over the predicted entities"""
    topics = {}
    for ent in doc.ents:
        if ent.label_ in ENTITY_ARRAY:
            selected_word = ent.text.lower()
            if selected_word not in topics.keys():
                topics[selected_word] = 1
            else:
                topics[selected_word] += 1        

    if len(topics.values()) == 0: return 
    #exit if we failed to get any values for topic (bad processing)
    
    """ Weight sentences by topics """
    max_frequency = max(topics.values())

    for word in topics.keys():
        topics[word] = topics[word]/max_frequency

    #sentence tokenization
    sentence_tokens = [sent for sent in doc.sents]

    sentence_scores = {}
    for sent in sentence_tokens:
        for word in sent:
            word = word.text.lower()
            if word in topics.keys():
                if sent not in sentence_scores.keys():
                    sentence_scores[sent] = topics[word]
                else:
                    sentence_scores[sent] += topics[word]
    # pp(sentence_scores)

    select_length = min(int(len(sentence_tokens)*TLDR_LEVEL),MAX_SENTENCES)
    print("trimmed to ",select_length,"sentences")

    """ Sort Sentence Dictionary into the top X sentences based on overall scores derived above. """
    summary = nlargest(select_length, sentence_scores, key = sentence_scores.get)
    scraped["content"] = summary

    """ Extract topics from chosen sentences"""
    scraped['tags'] = list(get_topics(str(summary)))
    # for i in scraped['tags']:
    #     scraped['primers'].append(primerChecker(i, str(summary)))

    # strSummary = functools.partial(primerChecker, text = str(summary))
    # result = map(strSummary, scraped['tags'])
    # scraped['primers'] = result
    scraped['primers'] = [primerChecker(x,str(summary)) for x in scraped['tags']]
    return scraped

    

    # scraped['primers'] = list(map( primerChecker, scraped['tags']))
  

#* add article topics as suggested tags
def get_topics(text):

    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)

    #* Iterate over the predicted entities
    topics = {}

    for ent in doc.ents: 
        if ent.label_ in ENTITY_ARRAY:
            selected_topic = ent.text.lower()
            if selected_topic not in topics.keys():
                topics[selected_topic] = 1
            else:
                topics[selected_topic] += 1  
    
    topics = nlargest(MAX_TOPICS, topics, key=topics.get)
    return topics