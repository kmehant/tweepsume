![Tweepsume](https://i.ibb.co/xGJbCWS/Logo.png)

# Tweepsume

## Inspiration

We got inspiration and motivated by the question that popped up in our mind. Would a timed personality test that you take at uncertain environments in one shot be able to throw true light on your traits? We tried brainstorming on this point.

Twitter being used all over the world to share emotions, help, news, education and many more, its been part of everyone's life like a **parallel life**. Leveraging this, we built Tweepsume.

Our product Tweepsume is for everyone who uses Twitter that leverages one's own tweets to display **20+ traits** in a **single chart** giving **true** insights derived from the timeline.

## What it does

![ProjectFlow](https://i.ibb.co/wRY4PjN/banner-2.png)

Tweepsome takes Twitter ID as an input. It uses this twitter ID to fetch latest tweets of the user utilizing the **Twitter API** and then converts all of these tweets into a string and sends it to IBM Whatson to derive insights using **Open Vocabulary appraoch**. This data is visualized in the form a single **radical bar chart** in the increasing percentiles. Single chart would make understanding and sharing easy.

## How we built it

With passion driven development approach, we used **Twitter API** being one of the main constituents and we built using the following tech stack.

- *Web Client* - HTML | CSS | JS | Bootstrap | Other JS Libraries
- *Server* - Python | Flask | Gunicorn (WSGI)
- *Version Control* - git tool | GitHub
- *ML/AI* - IBM Watson (Open Vocabulary appraoch)
- *Deployment* - Heroku | Netlify
- *Marketing* - Canva 

## Challenges I ran into

Honestly, It was the first time we are using Twitter API. To our opinion using API is fairly easy and our huge applause to the API team and documentation team for building such a user friendly product.

We struggled a bit with Frontend part of the project as representing 22 traits in a single go is quite a challenge task and we finally made it :)

## Accomplishments that I'm proud of

Well Using the Twitter API and getting our first response from the server, it gave a sense of satisfaction.

We quite consider Tweepsume itself a huge accomplishment as within very short period of time we were able to build the product completely from scratch.

Some of our friends already loved the product and could not wait to use it in their resume's and personal websites.

## What I learned

We learnt a wide range of things from managing time, developing in a fast paced environment. troubleshoot and debugging stuff and finally building the product completely with less possible bugs.

## What's next for Tweepsume

We want to make Tweepsume more scalable to a larger audience and also enforcing some more optimizations possible in both the backend and frontend systems. We would like to add other ways to distribute chart through embed in iFrames and anchor tags.

Built during the #Codechella 2020 Hackathon conducted by Twitter University.