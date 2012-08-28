# Yes to Everything

![](http://caseyagollan.com/content/about/this-site.png)

Sometime after rejiggering my website for the hundredth time, I got tired of _wanting_ to change it so often. 

Instead of perpetually seeking a tighter edit of my work, this site aims to be the most complete database of Casey Gollan things out there. (There are @siblings_count pages on this site.)

A database doesn't tell a story, it only helps with one. What is a database good for? Visualization.

What you're first greeted with when you load this site is not a list or a grid, but a [Graph](/graph). Each project on this site is tagged with people, places, and concepts, which tie it (literally) to other projects. A [force-directed graph](http://en.wikipedia.org/wiki/Force-based_algorithms_(graph_drawing)) is not the simplest way to look at things, but it is the most evocative of everything's connectedness.

The idea of jumping through a body of work along threads that run through it (rather than in a smooth chronological procession) was important in the design of this site. (Even the more list-like [Archive](/archive) view allows you to search out and visualize these connections.)

## Git and Github

Building this site is my first attempt in earnest at using Git. In conclusion, I will never not use it again! Git is a lifesaver while working [EXPAND ON THIS], and it also allows for lots of cool benefits.

- You can browse [the source code for this entire website at Github](https://github.com/caseyg/caseyagollan.com). 

- You can see a detailed log of changes to this site by looking at the [commit history](https://github.com/caseyg/caseyagollan.com/commits/master).

- You can browse every version of every single file on this site and [compare revisions](https://github.com/caseyg/caseyagollan.com/commit/21b598146d7480cc98419bfbb2f6bdb304b3b73b#diff-5).

- You can see my [plans for new features and progress squashing bugs](https://github.com/caseyg/caseyagollan.com/issues)

- You can fork this site (make a copy of the entire codebase) and use it as a template for your own site or change a few words and images to make a full-featured parody in five minutes. 

- If you know how to do something better than I do (which is likely) you can submit a pull-request on Github, then I can merge your code into this site with one click.

## URL Structure

This site's url hierarchy is largely flat. 

## No Analytics

After installing [Ghostery](http://ghostery.com) and seeing how many sites include upwards of ten tracking scripts, I decided to stop collecting analytics on my personal sites entirely. When I visit a website and see that Ghostery has nothing to report, it feels like an electric shock of not-giving-a-fuck! Statistics are closed is the new comments are closed. It just feels useless and sometimes stifling to think about my personal site in terms of numbers. I wasn't really doing anything with said numbers except committing them to memory and worrying about them a little. I will miss seeing referrers (who is linking to my website) but I will not miss wondering why nobody is visiting my website.

My dream personal website statistics application would collect specific kinds of information intentionally. It would ask users if they want to identify themselves with a name and a home url. It would show them their own tracks across my site as I am collecting them, and they could comment on how it went. Maybe that's a stupid idea. But as far as I know this type of explicit, friendly collection of visitor information doesn't yet exist. 

Typekit may embed a kind of analytics, but it's not one I have access to.

## Stacey

This site is built with [Stacey](http://staceyapp.com), a content management system built by [Anthony Kolber](http://aestheticallyloyal.com/), that is so wonderfully simple I have not changed my mind about using it for all this site's various incarnations since 2010.

The biggest reason I like Stacey is that it uses no database or backend interface. This means that instead of logging in to a web interface (like with Wordpress or Indexhibit) to add new projects or update existing ones, I just throw text files, images, and other media into [neatly organized folders](https://github.com/caseyg/caseyagollan.com/tree/master/content). Stacey slurps up everything in these folders and runs it through [templates](https://github.com/caseyg/caseyagollan.com/tree/master/templates) to spit out a website.

I don't like using most web interfaces because I start to obsess over how bloated, ugly, and distracting they are. With Stacey I can just use any text editor. Because my content and templates are just files in folders, I don't feel locked into a particular system. The big databases spun up by sites run on a CMS like Wordpress make me feel like I have no exit (or, a painful one).

That said, for this iteration of my site I wanted to treat the site more like a database than ever before. This required some Javascript wrangling.

## Javascript

This site also represents my first real attempt at writing Javascript. [The file](https://github.com/caseyg/caseyagollan.com/blob/master/public/docs/js/sneezeburg.js) is named after [my dog](https://www.facebook.com/sneezeburg) because he is also cute but also hideously ugly and unkempt. There is a metaphor there somewhere I think. I am embarrassed by this code, but it works (KIND OF) and I want to get better at it over time.

The [Graph](http://caseyagollan.com/graph) is powered by [D3.js](http://d3js.org) by [Mike Bostock](http://bost.ocks.org/mike/). In trying to make an interactive force-directed graph I also dragged myself through experiments with [Arbor.js](http://arborjs.org) by [Christian Swinehart](http://samizdat.cc) whose work I very much admire, [Raphael](http://raphaeljs.com), and [Kinetic.js](http://www.kineticjs.com) before landing on D3. I am very happy here.

The [Archive](http://caseyagollan.com/archive) relies on [Isotope](http://isotope.metafizzy.co) by [David Desandro](desandro.com).

## Other Tools

Most of the code was written in SublimeText 2 with [Solarized](http://ethanschoonover.com/solarized) syntax highlighting. I had Codekit running in the background to compile SCSS into CSS, and minify both CSS and JS as I worked. Fonts are served from Typekit.

## How it All Began

In April 2012 I realized my website [had been hacked](https://twitter.com/caseyg/status/209773035539013633) and for some time had been been redirecting visitors to a set of shady Russian domains. After finding out that this obfuscated line of bullshit had inserted itself into 6561 different PHP files on my server, I backed everything up and hit Delete All. 

I thought I would put everything back up in a few days, but found myself sucked into a never-ending secret project to make the new website of my dreams (mostly as an excuse to learn more about things I'd been meaning to, like Git and Javascript). I started tinkering in Brooklyn, New York in May 2012 and finally launched the first iteration of the site in Espoo, Finland in late August.