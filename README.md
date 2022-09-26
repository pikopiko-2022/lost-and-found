# JV Review
- 2 linter warnings, not too bad.
- wow, that is a lot of tests. the location tests will fail if a user doesn't have a .env file with GOOGLE_API_KEY which would be good to mention in the readme
- component coverage needs a bit of work, but this is a very good start.
- 
# Lost and Found

Lost and found is an app where users can come to look for and make a post about items they have lost or found. Users can then comment on a post to make a connection and get back their item.

User Stories:

- User can login and create a profile
- User can make a post if they found or lost an item
- User can upload a photo with the post
- User can add a location using google api

- User can see all posts of items that have been found or lost(only if logged in)
- User can comment on a post if they think the item is theirs

- Posts should expire if not found within a certain time frame
- A user can delete a post that they have created


Enjoy the app, feel free to give suggestions for improvements
## Setup

### What's included

This repo includes:


### Installation

#### **From the Github UI**

See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use Github's feature to create a new repo from a template.

#### **From the command line**

```
npm install # to install dependencies
npm run knex migrate:latest
npm run knex seed:run
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:2000](http://localhost:2000).

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=boilerplate-fullstack)


