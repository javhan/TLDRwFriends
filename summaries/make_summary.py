import spacy
from pprint import pp
from heapq import nlargest

# from wikiscraper import text

def make_summary(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)

    scraped = {
        "content" : [],
        "title" : ""
    }

    TLDR_LEVEL = 0.5
    MAX_SENTENCES = 5

    #* Iterate over the predicted entities
    topics = {}
    for ent in doc.ents:
        """ Print the entity text and its label """    
        if ent.label_ in ["ORG", "PRODUCT", "PERSON"]:
            selected_word = ent.text.lower()
            if selected_word not in topics.keys():
                topics[selected_word] = 1
            else:
                topics[selected_word] += 1        

    max_frequency = max(topics.values())
    # print("max freq",max_frequency)

    for word in topics.keys():
        topics[word] = topics[word]/max_frequency
    # pp(topics)


    #* sentence tokenization
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

    # print("FINAL SUMMARY", summary)
    # final_summary = [word.text for word in summary]
    # scraped.content = " ".join(final_summary)
    return scraped