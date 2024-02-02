# Rock Solid Static Data

### What's the issue?

I'm using data to generate my static site (built with Next.js). This data would fetch fine in development, but the results would be totally unpredictable in production. Sometimes the site would build on first deploy, sometimes 3rd, sometimes 6th...

It was creating a totally unsustainable workflow. A complete waste of my time and all those repeated data requests are just gross for the planet. Yuk!

### What's the solution?

I started out by refactoring my code and reducing the number of calls I was making. However, this made little difference in production.

All I wanted was stable access to some predictable data! It was time to go back to basics.

I figured out that I must have been maxing out Trello's API call limit. It seemed nuts, but Next.js was fetching data on each page refresh in development and then again on production build. It did seem fairly excessive. What I really needed was to collect my own data and give it to Next.js locally.
