# Project: Blaze

Team Name: Anti-Social

Project Description: *Blaze promotes positive social media interactions to help you reduce the negative aspects of Facebook and Instagram.*

# Repository Summary

* [Phase 1 Documentation](https://github.com/deco3500-2018/social-media/blob/master/Phase%201/Research.md)
* [Phase 2 Documentation](https://github.com/deco3500-2018/social-media/blob/master/Phase%202/Requirement%20Gathering.md)
* [Phase 3 Documentation](https://github.com/deco3500-2018/social-media/blob/master/Phase%203/User%20Testing.md)

* [Low Fidelity Prototype](https://github.com/deco3500-2018/social-media/tree/master/images)
* [Medium Fidelity Invision Prototype](https://projects.invisionapp.com/share/6KOC0DHF3Y4#/screens)
* [High Fidelity Invision Prototype](https://invis.io/C6OMGSSHXWJ#/326028443_Login)

* [Functional High Fidelity Prototype](https://github.com/deco3500-2018/social-media/wiki/Prototype-Instructions)

## 1.0 Promotional Materials

### 1.1 Exhibition Poster

![final-poster](https://github.com/deco3500-2018/social-media/blob/master/images/final-poster.jpg)

### 1.2 Exhibition Brochure 

![Brochure](https://github.com/deco3500-2018/social-media/blob/master/images/Brochure-1.jpg)

![Brochure](https://github.com/deco3500-2018/social-media/blob/master/images/Brochure-2.jpg)


      

## 2.0 Prototypes

Low Fidelity Prototype (Paper Prototype) 
![PP](https://github.com/deco3500-2018/social-media/blob/master/images/Low-fidelity-prototype-new-1.jpg)
![PP](https://github.com/deco3500-2018/social-media/blob/master/images/Low-fidelity-prototype-new-2.jpg)
![PP](https://github.com/deco3500-2018/social-media/blob/master/images/Low-fidelity-prototype-new-3.jpg)
![PP](https://github.com/deco3500-2018/social-media/blob/master/images/Low-fidelity-prototype-new-4.jpg)


Medium Fidelity Prototype - https://projects.invisionapp.com/share/6KOC0DHF3Y4#/screens

High Fidelity Prototype - https://invis.io/C6OMGSSHXWJ#/326028443_Login



## 3.0 Project Summary 

Academic research has shown that use of social media platforms like Facebook and Instagram in adolescents is a cause for decline in well-being. Symptoms of ‘Social Media Depression’ include feelings of sadness, isolation and depression resulting from excessive comparison with others. The problem has magnified  in recent years, with billions around the world using Facebook/Instagram, and new users signing up daily.

We have designed a mobile application that is linked with Facebook and Instagram to help promote positive interactions online. Key features include reconnecting with old friends through games, identifying and removing (unfriending/unfollowing) ‘friends’ who are no longer part of your life and cleaning up feed content on Instagram to optimize positive effects.

The app aims to boost positive effects of social media while mitigating its negative effects. It will also provide advice on positive social media habits which improve mental health.

Our solution is targeted at young adults and adolescents in Australia between the ages of 15-25. There is a large room for development for this demographic profile.


## 4.0 Project Process

### Phase 1: Ideas and Concept

#### Research 

From the initial research conducted, we found the use of social networks such as Facebook, Instagram and Snapchat can lead to reductions in well-being related to lowered self-confidence and life satisfaction, feelings of exclusion, anxiety, lowered self-awareness, depression and loneliness. It is commonly understood that these effects arise from users comparing themselves with others, leading to social media platforms becoming a 'competition' for beauty and self-image.

At this phase, we are trying to gather as much information as we could by conducting primary research (interviews and online research). We had some raw ideas for our main concept but still unsure if it is good for users or it will be a good solution, therefore, we implemented this phase and analyze the results from there. 

Overall, social networks may be deemed a double-edged sword for teens and young adults. Amongst other things, they are a source of anxiety and concern for self-image, but also a method through which people can build friendships, express themselves and learn.

[Interview Questions](https://github.com/deco3500-2018/social-media/blob/master/Phase%201/interview-questions.md)

[Interview Results](https://github.com/deco3500-2018/social-media/blob/master/Phase%201/interview-results.md)

[Collected Survey Data](https://github.com/deco3500-2018/social-media/blob/master/Phase%201/social-media-usage-habits.xlsx)

#### Our Design and Wireframe

Our team moved on with coming up with some low fidelity prototype using Microsoft Word.  
Images can be found [here](https://github.com/deco3500-2018/social-media/tree/master/images)

### Phase 2: Requirements Gathering

#### User Testing (paper prototype)

Using the paper prototype, our team proceeded to conduct user testing and gather additional feedback. We also worked concurrently to develop the pages on invisionapp, incorporating colours and designing a workflow for the prototype.

The plan was to obtain feedback from the paper prototype and incorporate changes to the medium-fidelity prototype on invsionapp. 

### Phase 3: Finalization

#### User Testing on Invisionapp 

We conducted user testing using invisionapp and gathered the following feedback:
- The colour on the pages was too bright. Consider following the layout on Instagram and Facebook which used white as their background colour. 
- The homepage tabs appeared confusing. Consider rewording them or combining some of them together. For instance, least active friends could be combined with the friend list tab while healthy social habits tab could be combined with unhealthy social habits tab.
- The rating page was redundant. Consider removing it or only asking upon the user’s first login to the site. 
- The purpose of the least active friends page was unclear.

In conclusion, we found that the overall layout was intuitive and the site was relatively easy to navigate due to the straightforward workflow. Having said that, some minor amendments would simplify the site’s content and design, thereby enhancing the overall user experience.

#### Development of functional prototype

A functional prototype was written as a Node server hosting a web application containing the survey questions, and screen for showing recommendations. The server uses a MySQL database for storage of survey results, and queries from this same database to find recommendations for accounts which are the most 'harmful'. As the Instagram scraper API which was originally played with was in Python, the Node server calls a Python script to login to Instagram and retrieve account information. This includes finding a user's followers during login, and finding a particular user's posts, likes and post frequency in the recommendations page.

### Final Touch Up

We made changes to the colour scheme and wording of the homepage to create 'familiarity' for the users. This was in response to their comments that similarities to Facebook and Instagram would serve to enhance their overall ease of usage. The number of tabs was also reduced to prevent the site from looking cluttered and overwhelming users with information. Ultimately, this would help to draw users’ attention to key content and direct their focus accordingly. 

