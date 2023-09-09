Build a website/app for staff at the [Barbican](https://barbican.org.uk) to see which spaces are available to book.

---

# Organising Spaces with GraphQL

### What's the Project?

Build a website/app for staff at the [Barbican](https://barbican.org.uk) to see which spaces are available to book.

### Can I see it?

Unfortunately not, it's only available for Barbican staff at [dev.event.barbican.org.uk](https://dev.event.barbican.org.uk)

The code is in a private [Barbican](https://barbican.org.uk) [Bitbucket](https://bitbucket.org) repository sadly.

I have started writing about [this project](https://blog.paulh.biz/organising-spaces-with-graphql-1) on [my blog](https://blog.paulh.biz).

### How much did you do?

Most things on the frontend, which includes:

- 💻 Building the app in [Vue 3](https://vuejs.org)
- 🎨 Designing the user journey with [Figma](https://figma.com)
- 💾 Consuming data from the [Barbican](https://barbican.org.uk) [GraphQL](https://graphql.org) feed.
- 📝 Writing the [SCSS](https://sass-lang.com)

### What are the interesting parts?

This project is all about democratising information. There is already an event management system in place, but only a few staff members know how to use it. The original system is very technical and has been manipulated/misused over time. Our task is to build a more intuitive/accessible front end for anyone at the [Barbican](https://barbican.org.uk) to use.

We're using [GraphQL](https://graphql.org) to pull data from the original system, and are using [Vue.js](https://vuejs.org) to present a more intuitive view of everything that is happening at the centre.

### What needs improving?

- **Documentation** 😥 It really should include [JSDoc](https://jsdoc.app) and [SassDoc](https://sassdoc.com). The code is well structured but will be tricky to maintain without notes.
