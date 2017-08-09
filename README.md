# The Binary Cheatsheet

This is the repository for [The Binary Cheatsheet](https://timseverien.github.io/binary-cheatsheet/), a cheatsheet of the basics of writing and manipulating binary data in modern programming languages.

## Contribution

Got a suggestion? I’m happy to accept pull requests!

When writing texts, please obey the following criteria:

- Stick to facts
- Avoid he/she (use [singular they](https://en.wikipedia.org/wiki/Singular_they) instead)
- No insults
- Avoid words like easy, just, etc.
- Simple words are the best words
- Add jokes and smart references, because I’m super dull and stuff


### Installation

After cloning the repository, open the project directory in terminal, and execute `npm install`. After installation, run `npm start` to start a Browsersync session.

### Altering Content

The content can be found in `src/views/partials`. Just write some good old HTML, and you’re good to go.

### Adding a Section

I deliberately split up the content into sections, to make it slightly easier to maintain. If you wish to add a section, note that `src/vies/index.html` has some Mustache/Handlebars-like syntax to inline the style and include the partials.

The file `bin/build/views.js` will reveal that I’ve written a poor parser to parse the views. Until I replace the parser with Handlebars, please use `{{ partialFileName }}` to add a partial.
