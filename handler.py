""" Handler """
import threading
import os

import tweepy as tw

# Import Watson
from ibm_watson import PersonalityInsightsV3

# Import authenticator
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

lock = threading.Lock()


class Handler:
    def __init__(self, consumer_key, consumer_secret, access_token, acess_token_secret, MLapikey, MLurl):
        self.auth = tw.OAuthHandler(consumer_key, consumer_secret)
        self.auth.set_access_token(access_token, acess_token_secret)
        self.api = tw.API(self.auth, wait_on_rate_limit=True)
        self.authenticator = IAMAuthenticator(MLapikey)
        self.personality_insights = PersonalityInsightsV3(
            version='2017-10-13',
            authenticator=self.authenticator
        )
        self.personality_insights.set_service_url(MLurl)

    def analyze(self, id=None):
        if not id:
            return None
        with lock:
            try:
                # Make a twitter API Call
                res = self.api.user_timeline(
                    screen_name=id, count=100, include_rts=True)
                # get the tweets from the response
                tweets = [tweet.text for tweet in res]
                # combine all tweets into a paragraph
                data = ''.join(str(tweet) for tweet in tweets)
                # Make an API call to personality insights API
                profile = self.personality_insights.profile(
                    data, accept='application/json').get_result()
                print(profile)
                # Return the traits
                return profile
            except:
                return None
