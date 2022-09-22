# Insight project

In this project I learned about scraping and proxy server.
We dug through the dark web and scrapped a specific
page.

How to access the tor network using docker (the command below opens an http proxy on port 8118 and a socks proxy on port 9050):

```
docker run -it -p 8118:8118 -p 9050:9050 -d dperson/torproxy
```

In order to run the project you'll need to do this first steps:

First: start the server, you'll need
to do that inside the Insight project in the terminal.

```
npm ci
npm start
```

Secondly: start the client, you'll need
to do the same commands but firstly you'll need
to change the directory to the needed page.

```
cd /src/client
npm ci
npm start
```

and enjoy

## the tools I used here

- mongo db
- React => javascript for front end
- axios for backend communication
