Make a browser-based app for people who work at the [Barbican](https://en.wikipedia.org/wiki/Barbican_Centre) and want to book/see available spaces in the centre.

---

> I’m a web designer and developer whose learning to write more interesting stories and less complex code. I work for the [Barbican](http://barbican.org.uk/), an arts centre in London.

<br>

### **The Project**

Make a browser-based app for people who work at the [Barbican](https://en.wikipedia.org/wiki/Barbican_Centre) and want to book/see available spaces in the centre.

**Why?** The current events system is too inaccessible for most users. It’s not intuitive to use and requires training to understand. Most users just need an easy way to view which spaces are available, and which are not.

**How?** Create an [API](https://en.wikipedia.org/wiki/API#Web_APIs) which makes data available from the current events system. We’ll then feed that data into a new [Vue 3](https://vuejs.org/) app via [GraphQL](https://graphql.org/).

> This project has already taken 2 years to reach the first round of testing. I’m going to write a series of posts about it. This is part one.

The current events system (let's call it Filofax) does a decent job of organising events, but is now old and faces some problems:

- **It’s generic.** It’s not designed for the very unique spaces and systems at the Barbican.
- **It’s technical.** Some staff use **Filofax** daily and have a good understanding of its features. Most do not.
- **It’s old.** Solutions have been created by users over time in ways that were never intended. The system is no longer intuitive.
- **It’s ugly.** The interface lacks direction and clarity. There’s no curation of information and no sense of priority.
- **It’s inaccessible.** You need server access and specific training just to get started. That’s a major barrier to entry.

<br>

### Our Response

We’re a small team, so we use [Agile](https://www.apm.org.uk/resources/find-a-resource/agile-project-management/) project management. The idea is to achieve maximum impact as quickly as possible. We break up work into very specific “tickets” and prioritise those tickets according to the goals of the project. Every 2 weeks, we assess how the project is going, and then create more tickets.

Our priority [user story](https://www.atlassian.com/agile/project-management/user-stories) was “_I want to easily view event data in an intuitive and useful way_”. Therefore, we didn’t focus on themes such as event management/creation quite yet. Also, **Filofax** already provides this functionality for more advanced users.

We articulated several user stories from our initial brief, and so I began responding to these by creating wireframes in [Figma](https://www.figma.com/).

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1687194758654/a6a5c0be-dc5f-40c4-a272-5981eb1cdc16.jpeg">

I decided there were 3 simple steps necessary to build a view of the event data. The first one was date selection. At this stage, the user can only choose a single-day view. Ranges are not available.

> Users needed to have quick entry into the app, so we implemented Office365 authentication. This is the same way we authenticate users' email or website access, so often the login happened without their knowledge.

There is also a sidebar included in the wireframes. It’s not currently included in the build but is the plan for developing app functionality. It contains potential features such as:

- **Alerts:** Users could “watch” events and receive notifications when those events change
- **Search:** A dedicated search area
- **Snapshots:** A collection of saved event data “views”. Useful for repetitive searches, such as: “all confirmed events in the Theatre and Concert Hall every Thursday”

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1687194715184/ac870b72-cfdd-4e37-8c06-5b1d8b15bf2a.jpeg">

This step was inspired by functionality included in the excellent [Advanced Custom Fields](https://www.advancedcustomfields.com/resources/creating-a-field-group/) [WordPress](https://wordpress.com/) plugin. I love how the elegant interface allows users to build pretty complex queries.

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1687194645337/c4921fd3-752b-4e09-b3af-0b150d15c93c.jpeg">

We had 3 ideas for useful ways to show our event data:

- **Map View:** Groups spaces into levels. This helps users understand which spaces are close together, and where noisy performances may affect your booking. This view is not yet available.
- **Gantt View:** The “Garageband” view collects event bookings into groups and displays them as a single bar on a chart. This helps users understand which bookings clash and overlap.
- **List View:** The most basic view. It displays a paginated list of results, but data has been grouped into collections of related events. You’re also able to sort the data by various categories.

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1687194902839/ffd0bdba-f40d-4a68-b0c2-5a9e4bcfdd63.jpeg">

In **Map View**, live performances pulsate to denote the noise around them

Both Map and Gantt views contain several similarities:

- An extra sidebar (in this case, denoting each level)
- A horizontally scrolling timeline (with a marker to denote the time of day)

Each view also contains navigation for:

- switching between day views
- switching between view modes
- editing filter settings
- viewing the additional event information

> This article is still being written. If you want to stay updated or have some suggestions, then please email [hello@paul.ly](mailto:hello@paul.ly)