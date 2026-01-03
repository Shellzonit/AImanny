from textblob import TextBlob

def detect_emotion(text):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    if polarity < -0.3:
        return 'negative'
    elif polarity > 0.3:
        return 'positive'
    else:
        return 'neutral'
