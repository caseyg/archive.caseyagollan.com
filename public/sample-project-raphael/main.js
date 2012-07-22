//
//  main.js
//
//  A project template for using arbor.js
//

(function($){

  var Renderer = function(r){
    var r = Raphael("viewport", $(window).width(), $(window).height());
    var particleSystem

    var that = {
      init:function(system){
        //
        // the particle system will call the init function once, right before the
        // first frame is to be drawn. it's a good place to set up the canvas and
        // to pass the canvas size to the particle system
        //
        // save a reference to the particle system for use in the .redraw() loop
        particleSystem = system

        // inform the system of the screen dimensions so it can map coords for us.
        // if the canvas is ever resized, screenSize should be called again with
        // the new dimensions
        particleSystem.screenSize(r.width, r.height) 
        particleSystem.screenPadding(80) // leave an extra 80px of whitespace per side

        // Put everything in the DOM and draw it

        particleSystem.eachEdge(function(edge, pt1, pt2){
          // edge: {source:Node, target:Node, length:#, data:{}}
          // pt1:  {x:#, y:#}  source position in screen coords
          // pt2:  {x:#, y:#}  target position in screen coords

          // draw a line from pt1 to pt2
          var line = r.path("M" + pt1.x + " " + pt1.y + "L" + pt2.x + " " + pt2.y)
                      .attr({"stroke-width": 2, "stroke": "darkgray"})

          line.hover(function () {
              line.attr({"stroke": "blue"})
                  .toFront();
            },
            function () {
              line.attr({"stroke": "darkgray"})
                  .toBack();
            }
          );
        })

        particleSystem.eachNode(function(node, pt){
          // node: {mass:#, p:{x,y}, name:"", data:{}}
          // pt:   {x:#, y:#}  node position in screen coords

          // draw a rectangle centered at pt
          var w = 10;
          var dot = r.circle(pt.x-w/2, pt.y-w/2, w, w)
                     .attr({"fill":"gray", "stroke": "darkgray", "stroke-width": 2});

          dot.data({"class": "node"});

          dot.hover(function () {
              dot.attr({"stroke": "blue"})
                  .toFront();
            },
            function () {
              dot.attr({"stroke": "darkgray"})
                  .toBack();
            }
          );
        })          

        // set up some event handlers to allow for node-dragging
//      that.initMouseHandling()
      },
      
      redraw:function(){
        // 
        // redraw will be called repeatedly during the run whenever the node positions
        // change. the new positions for the nodes can be accessed by looking at the
        // .p attribute of a given node. however the p.x & p.y values are in the coordinates
        // of the particle system rather than the screen. you can either map them to
        // the screen yourself, or use the convenience iterators .eachNode (and .eachEdge)
        // which allow you to step through the actual node objects but also pass an
        // x,y point in the screen's coordinate system
        // 

      },
      /*
      initMouseHandling:function(){
        // no-nonsense drag and drop (thanks springy.js)
        var dragged = null;

        // set up a handler object that will initially listen for mousedowns then
        // for moves and mouseups while dragging
        var handler = {
          clicked:function(e){
            var pos = $(r).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            dragged = particleSystem.nearest(_mouseP);

            if (dragged && dragged.node !== null){
              // while we're dragging, don't let physics move the node
              dragged.node.fixed = true
            }

            $(r).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)

            return false
          },
          dragged:function(e){
            var pos = $(r).offset();
            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

            if (dragged && dragged.node !== null){
              var p = particleSystem.fromScreen(s)
              dragged.node.p = p
            }

            return false
          },

          dropped:function(e){
            if (dragged===null || dragged.node===undefined) return
            if (dragged.node !== null) dragged.node.fixed = false
            dragged.node.tempMass = 1000
            dragged = null
            $(r).unbind('mousemove', handler.dragged)
            $(window).unbind('mouseup', handler.dropped)
            _mouseP = null
            return false
          }
        }
        
        // start listening
        $(r).mousedown(handler.clicked);

      },*/
      
    }

    return that
  }    

  $(document).ready(function(){
    var sys = arbor.ParticleSystem(1000, 600, 0.5) // create the system with sensible repulsion/stiffness/friction
    sys.parameters({gravity:true}) // use center-gravity to make the graph settle nicely (ymmv)
    sys.renderer = Renderer("#viewport") // our newly created renderer will have its .init() method called shortly by sys...

    // add some nodes to the graph and watch it go...
var CLR = { tag:"gray", project:"blue" }; sys.addNode("Archives", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Blog Highlights", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Books", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Boston", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("California", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Charlottesville", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Client Work", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Coding", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Color", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Conversational", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Cooper Union", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Design", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Design Thinking", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Drawing", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Editing", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Education", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Essay", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Family", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Finland", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Foundation Year Prompts", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Fun", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("High School", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Hometest", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Iceland", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Installation", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Massachusetts", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Meme Generator", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Messy", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Middle School", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Napa", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("New York", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Notes", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Organizing", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Oxbow School", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Painting", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Participatory", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Performative", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Philosophising", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Photography", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Politics", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Pool", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Printmaking", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Processing", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Providence", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Publications", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Publishing", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Reading", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Reykjavik", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Rhizome", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Rhode Island", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("RISD Pre-College", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Rye", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Rye High School", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("San Francisco", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Sculpture", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Sexy", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Skeuomorphism", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("SMFA Pre-College", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Social Practice", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Sound", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Systems", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Technology", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("The Problem Is The Content", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Thinking", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Time", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Trolling", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Video", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Virginia", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Website", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Workspace", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Writing", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Über Conceptual", {color:CLR.tag, shape:"dot", alpha:1}); sys.addNode("Weeknotes", {link:"../../weeknotes/",color:CLR.project, alpha:1}); sys.addNode("If We Are Digital", {link:"../../if-we-are-digital/",color:CLR.project, alpha:1}); sys.addNode("Pool", {link:"../../pool/",color:CLR.project, alpha:1}); sys.addNode("Two Apologies President Bharucha Must Make", {link:"../../two-apologies-president-bharucha-must-make/",color:CLR.project, alpha:1}); sys.addNode("Sweaty Tube", {link:"../../sweatytube/",color:CLR.project, alpha:1}); sys.addNode("You Can't Fuck the System If You've Never Met One", {link:"../../systems/",color:CLR.project, alpha:1}); sys.addNode("Programmed Visions Book Review", {link:"../../book-review-programmed-visions/",color:CLR.project, alpha:1}); sys.addNode("CooperUnion.biz", {link:"../../cooper-union-dot-biz/",color:CLR.project, alpha:1}); sys.addNode("Between the Spreadsheets", {link:"../../between-the-spreadsheets/",color:CLR.project, alpha:1}); sys.addNode("Girl Walk // All Day Website", {link:"../../girl-walk-all-day-website/",color:CLR.project, alpha:1}); sys.addNode("Hula", {link:"../../hula/",color:CLR.project, alpha:1}); sys.addNode("Studio", {link:"../../studio/",color:CLR.project, alpha:1}); sys.addNode("User-Generated Content", {link:"../../user-generated-content/",color:CLR.project, alpha:1}); sys.addNode("Until I get better at coding, there will be no...", {link:"../../until-i-get-better-at-coding/",color:CLR.project, alpha:1}); sys.addNode("20x200 (Design)", {link:"../../20x200/",color:CLR.project, alpha:1}); sys.addNode("New Works", {link:"../../new-works/",color:CLR.project, alpha:1}); sys.addNode("Mixing Metaphors: Skeuomorphic, Hyper, and...", {link:"../../mixing-metaphors/",color:CLR.project, alpha:1}); sys.addNode("Notes on Forgetting, Archiving, and Existing on...", {link:"../../notes-on-forgetting-archiving-and-existing-on-the-internet/",color:CLR.project, alpha:1}); sys.addNode("CooperUnion.net", {link:"../../cooper-union-dot-net/",color:CLR.project, alpha:1}); sys.addNode("SensitivePhotoGeneration.com", {link:"../../sensitive-photo-generation/",color:CLR.project, alpha:1}); sys.addNode("Studio Bed", {link:"../../studio-bed/",color:CLR.project, alpha:1}); sys.addNode("Timeline of Timelines", {link:"../../timeline-timeline/",color:CLR.project, alpha:1}); sys.addNode("Attempted Conversation", {link:"../../attempted-conversation/",color:CLR.project, alpha:1}); sys.addNode("Casey, Runner", {link:"../../casey-runner/",color:CLR.project, alpha:1}); sys.addNode("Sexy Studio Self-Portraits", {link:"../../sexy-studio-self-portraits/",color:CLR.project, alpha:1}); sys.addNode("Photography Thought Web", {link:"../../photography-thought-web/",color:CLR.project, alpha:1}); sys.addNode("Built to Last, Built to Decay: Authentic,...", {link:"../../built-to-last-built-to-decay/",color:CLR.project, alpha:1}); sys.addNode("Soundline", {link:"../../soundline/",color:CLR.project, alpha:1}); sys.addNode("Albers-o-Matic", {link:"../../albers-o-matic/",color:CLR.project, alpha:1}); sys.addNode("Gradient Bookshelf", {link:"../../bookshelf/",color:CLR.project, alpha:1}); sys.addNode("Cake", {link:"../../cake/",color:CLR.project, alpha:1}); sys.addNode("Scattered Notes on the Blog as a Curated...", {link:"../../scattered-notes-on-the-blog-as-a-curated-experience/",color:CLR.project, alpha:1}); sys.addNode("I Don't Sketch Book", {link:"../../sketch-book/",color:CLR.project, alpha:1}); sys.addNode("Public Apology Project", {link:"../../public-apology/",color:CLR.project, alpha:1}); sys.addNode("Activate: Context", {link:"../../activate-context/",color:CLR.project, alpha:1}); sys.addNode("Process Magazine", {link:"../../process-magazine/",color:CLR.project, alpha:1}); sys.addNode("Wearable Sculptures", {link:"../../wearable-sculptures/",color:CLR.project, alpha:1}); sys.addNode("Polaroids", {link:"../../polaroids/",color:CLR.project, alpha:1}); sys.addNode("Summer 2008", {link:"../../summer-photography/",color:CLR.project, alpha:1}); sys.addNode("Finger Paintings", {link:"../../finger-paintings/",color:CLR.project, alpha:1}); sys.addNode("Thought Webs", {link:"../../thought-webs/",color:CLR.project, alpha:1}); sys.addNode("Small Sculptures", {link:"../../small-sculptures/",color:CLR.project, alpha:1}); sys.addNode("Ceramic Experiments", {link:"../../ceramics/",color:CLR.project, alpha:1}); sys.addNode("Zephyr Art + Lit Magazine", {link:"../../zephyr-magazine/",color:CLR.project, alpha:1}); sys.addNode("Oxbow Final Project", {link:"../../oxbow-project/",color:CLR.project, alpha:1}); sys.addNode("Self-Portrait (Spinning)", {link:"../../self-portrait-spinning/",color:CLR.project, alpha:1}); sys.addNode("Awkward Laughter Paintings", {link:"../../awkward-laughter-paintings/",color:CLR.project, alpha:1}); sys.addNode("Intaglio Printmaking", {link:"../../printmaking/",color:CLR.project, alpha:1}); sys.addNode("Teepee", {link:"../../teepee/",color:CLR.project, alpha:1}); sys.addNode("Reciprocal", {link:"../../reciprocal/",color:CLR.project, alpha:1}); sys.addNode("Cones", {link:"../../cones/",color:CLR.project, alpha:1}); sys.addNode("Graphic Design", {link:"../../graphic-design-risd/",color:CLR.project, alpha:1}); sys.addNode("Drawings", {link:"../../figure-drawings/",color:CLR.project, alpha:1}); sys.addNode("Family Photos", {link:"../../family-photos/",color:CLR.project, alpha:1}); sys.addNode("Digital Photography", {link:"../../digital-photography/",color:CLR.project, alpha:1}); sys.addEdge("Writing", "Weeknotes"); sys.addEdge("Notes", "Weeknotes"); sys.addEdge("Workspace", "Weeknotes"); sys.addEdge("Website", "If We Are Digital"); sys.addEdge("Coding", "If We Are Digital"); sys.addEdge("Design", "If We Are Digital"); sys.addEdge("Website", "Pool"); sys.addEdge("Coding", "Pool"); sys.addEdge("Publications", "Pool"); sys.addEdge("Cooper Union", "Two Apologies President Bharucha Must Make"); sys.addEdge("Writing", "Two Apologies President Bharucha Must Make"); sys.addEdge("Politics", "Two Apologies President Bharucha Must Make"); sys.addEdge("Meme Generator", "Sweaty Tube"); sys.addEdge("Website", "Sweaty Tube"); sys.addEdge("Coding", "Sweaty Tube"); sys.addEdge("New York", "Sweaty Tube"); sys.addEdge("Writing", "You Can't Fuck the System If You've Never Met One"); sys.addEdge("Cooper Union", "You Can't Fuck the System If You've Never Met One"); sys.addEdge("Systems", "You Can't Fuck the System If You've Never Met One"); sys.addEdge("Design Thinking", "You Can't Fuck the System If You've Never Met One"); sys.addEdge("New York", "You Can't Fuck the System If You've Never Met One"); sys.addEdge("Reading", "Programmed Visions Book Review"); sys.addEdge("Writing", "Programmed Visions Book Review"); sys.addEdge("Rhizome", "Programmed Visions Book Review"); sys.addEdge("Technology", "Programmed Visions Book Review"); sys.addEdge("New York", "Programmed Visions Book Review"); sys.addEdge("Cooper Union", "CooperUnion.biz"); sys.addEdge("Trolling", "CooperUnion.biz"); sys.addEdge("Fun", "CooperUnion.biz"); sys.addEdge("Website", "CooperUnion.biz"); sys.addEdge("New York", "CooperUnion.biz"); sys.addEdge("Cooper Union", "Between the Spreadsheets"); sys.addEdge("Fun", "Between the Spreadsheets"); sys.addEdge("Performative", "Between the Spreadsheets"); sys.addEdge("Sexy", "Between the Spreadsheets"); sys.addEdge("Trolling", "Between the Spreadsheets"); sys.addEdge("New York", "Between the Spreadsheets"); sys.addEdge("Video", "Between the Spreadsheets"); sys.addEdge("Client Work", "Girl Walk // All Day Website"); sys.addEdge("Website", "Girl Walk // All Day Website"); sys.addEdge("Coding", "Girl Walk // All Day Website"); sys.addEdge("Fun", "Girl Walk // All Day Website"); sys.addEdge("Design", "Girl Walk // All Day Website"); sys.addEdge("New York", "Girl Walk // All Day Website"); sys.addEdge("Cooper Union", "Hula"); sys.addEdge("Performative", "Hula"); sys.addEdge("Participatory", "Hula"); sys.addEdge("Conversational", "Hula"); sys.addEdge("Fun", "Hula"); sys.addEdge("New York", "Hula"); sys.addEdge("Workspace", "Studio"); sys.addEdge("Cooper Union", "Studio"); sys.addEdge("Messy", "Studio"); sys.addEdge("New York", "Studio"); sys.addEdge("Writing", "User-Generated Content"); sys.addEdge("Essay", "User-Generated Content"); sys.addEdge("Design Thinking", "User-Generated Content"); sys.addEdge("Pool", "User-Generated Content"); sys.addEdge("New York", "User-Generated Content"); sys.addEdge("Iceland", "User-Generated Content"); sys.addEdge("Reykjavik", "User-Generated Content"); sys.addEdge("Writing", "Until I get better at coding, there will be no..."); sys.addEdge("Blog Highlights", "Until I get better at coding, there will be no..."); sys.addEdge("Technology", "Until I get better at coding, there will be no..."); sys.addEdge("Design Thinking", "Until I get better at coding, there will be no..."); sys.addEdge("Client Work", "20x200 (Design)"); sys.addEdge("Website", "20x200 (Design)"); sys.addEdge("Coding", "20x200 (Design)"); sys.addEdge("Design", "20x200 (Design)"); sys.addEdge("New York", "20x200 (Design)"); sys.addEdge("Sculpture", "New Works"); sys.addEdge("The Problem Is The Content", "New Works"); sys.addEdge("Cooper Union", "New Works"); sys.addEdge("New York", "New Works"); sys.addEdge("Writing", "Mixing Metaphors: Skeuomorphic, Hyper, and..."); sys.addEdge("Blog Highlights", "Mixing Metaphors: Skeuomorphic, Hyper, and..."); sys.addEdge("Skeuomorphism", "Mixing Metaphors: Skeuomorphic, Hyper, and..."); sys.addEdge("Design Thinking", "Mixing Metaphors: Skeuomorphic, Hyper, and..."); sys.addEdge("New York", "Mixing Metaphors: Skeuomorphic, Hyper, and..."); sys.addEdge("Notes", "Notes on Forgetting, Archiving, and Existing on..."); sys.addEdge("Writing", "Notes on Forgetting, Archiving, and Existing on..."); sys.addEdge("Technology", "Notes on Forgetting, Archiving, and Existing on..."); sys.addEdge("Archives", "Notes on Forgetting, Archiving, and Existing on..."); sys.addEdge("Design", "Notes on Forgetting, Archiving, and Existing on..."); sys.addEdge("Thinking", "Notes on Forgetting, Archiving, and Existing on..."); sys.addEdge("New York", "Notes on Forgetting, Archiving, and Existing on..."); sys.addEdge("Website", "CooperUnion.net"); sys.addEdge("Writing", "CooperUnion.net"); sys.addEdge("Cooper Union", "CooperUnion.net"); sys.addEdge("Archives", "CooperUnion.net"); sys.addEdge("New York", "CooperUnion.net"); sys.addEdge("Education", "CooperUnion.net"); sys.addEdge("Photography", "SensitivePhotoGeneration.com"); sys.addEdge("Website", "SensitivePhotoGeneration.com"); sys.addEdge("Meme Generator", "SensitivePhotoGeneration.com"); sys.addEdge("Trolling", "SensitivePhotoGeneration.com"); sys.addEdge("New York", "SensitivePhotoGeneration.com"); sys.addEdge("Workspace", "Studio Bed"); sys.addEdge("Cooper Union", "Studio Bed"); sys.addEdge("New York", "Studio Bed"); sys.addEdge("Design Thinking", "Timeline of Timelines"); sys.addEdge("Archives", "Timeline of Timelines"); sys.addEdge("Time", "Timeline of Timelines"); sys.addEdge("Cooper Union", "Timeline of Timelines"); sys.addEdge("New York", "Timeline of Timelines"); sys.addEdge("Writing", "Attempted Conversation"); sys.addEdge("Conversational", "Attempted Conversation"); sys.addEdge("Sculpture", "Attempted Conversation"); sys.addEdge("Cooper Union", "Attempted Conversation"); sys.addEdge("New York", "Attempted Conversation"); sys.addEdge("Performative", "Casey, Runner"); sys.addEdge("Social Practice", "Casey, Runner"); sys.addEdge("Participatory", "Casey, Runner"); sys.addEdge("Cooper Union", "Casey, Runner"); sys.addEdge("New York", "Casey, Runner"); sys.addEdge("Sexy", "Sexy Studio Self-Portraits"); sys.addEdge("Performative", "Sexy Studio Self-Portraits"); sys.addEdge("Photography", "Sexy Studio Self-Portraits"); sys.addEdge("Cooper Union", "Sexy Studio Self-Portraits"); sys.addEdge("New York", "Sexy Studio Self-Portraits"); sys.addEdge("Trolling", "Sexy Studio Self-Portraits"); sys.addEdge("Notes", "Photography Thought Web"); sys.addEdge("Photography", "Photography Thought Web"); sys.addEdge("New York", "Photography Thought Web"); sys.addEdge("Writing", "Built to Last, Built to Decay: Authentic,..."); sys.addEdge("Blog Highlights", "Built to Last, Built to Decay: Authentic,..."); sys.addEdge("Design Thinking", "Built to Last, Built to Decay: Authentic,..."); sys.addEdge("Publications", "Built to Last, Built to Decay: Authentic,..."); sys.addEdge("Technology", "Built to Last, Built to Decay: Authentic,..."); sys.addEdge("New York", "Built to Last, Built to Decay: Authentic,..."); sys.addEdge("Cooper Union", "Soundline"); sys.addEdge("Foundation Year Prompts", "Soundline"); sys.addEdge("Processing", "Soundline"); sys.addEdge("Coding", "Soundline"); sys.addEdge("Drawing", "Soundline"); sys.addEdge("Notes", "Soundline"); sys.addEdge("Design Thinking", "Soundline"); sys.addEdge("Color", "Soundline"); sys.addEdge("Sound", "Soundline"); sys.addEdge("New York", "Soundline"); sys.addEdge("Cooper Union", "Albers-o-Matic"); sys.addEdge("Foundation Year Prompts", "Albers-o-Matic"); sys.addEdge("Color", "Albers-o-Matic"); sys.addEdge("Processing", "Albers-o-Matic"); sys.addEdge("Coding", "Albers-o-Matic"); sys.addEdge("Meme Generator", "Albers-o-Matic"); sys.addEdge("New York", "Albers-o-Matic"); sys.addEdge("Cooper Union", "Gradient Bookshelf"); sys.addEdge("Foundation Year Prompts", "Gradient Bookshelf"); sys.addEdge("Color", "Gradient Bookshelf"); sys.addEdge("Books", "Gradient Bookshelf"); sys.addEdge("New York", "Gradient Bookshelf"); sys.addEdge("Organizing", "Gradient Bookshelf"); sys.addEdge("Cooper Union", "Cake"); sys.addEdge("Foundation Year Prompts", "Cake"); sys.addEdge("Sculpture", "Cake"); sys.addEdge("Performative", "Cake"); sys.addEdge("Notes", "Cake"); sys.addEdge("Writing", "Cake"); sys.addEdge("Messy", "Cake"); sys.addEdge("Fun", "Cake"); sys.addEdge("New York", "Cake"); sys.addEdge("Writing", "Scattered Notes on the Blog as a Curated..."); sys.addEdge("Notes", "Scattered Notes on the Blog as a Curated..."); sys.addEdge("Archives", "Scattered Notes on the Blog as a Curated..."); sys.addEdge("Blog Highlights", "Scattered Notes on the Blog as a Curated..."); sys.addEdge("Design Thinking", "Scattered Notes on the Blog as a Curated..."); sys.addEdge("New York", "Scattered Notes on the Blog as a Curated..."); sys.addEdge("Cooper Union", "I Don't Sketch Book"); sys.addEdge("Hometest", "I Don't Sketch Book"); sys.addEdge("Design", "I Don't Sketch Book"); sys.addEdge("Notes", "I Don't Sketch Book"); sys.addEdge("Drawing", "I Don't Sketch Book"); sys.addEdge("Publishing", "I Don't Sketch Book"); sys.addEdge("New York", "I Don't Sketch Book"); sys.addEdge("Rye", "I Don't Sketch Book"); sys.addEdge("Cooper Union", "Public Apology Project"); sys.addEdge("Hometest", "Public Apology Project"); sys.addEdge("Participatory", "Public Apology Project"); sys.addEdge("Performative", "Public Apology Project"); sys.addEdge("Über Conceptual", "Public Apology Project"); sys.addEdge("Design Thinking", "Public Apology Project"); sys.addEdge("New York", "Public Apology Project"); sys.addEdge("Rye", "Public Apology Project"); sys.addEdge("Cooper Union", "Activate: Context"); sys.addEdge("Hometest", "Activate: Context"); sys.addEdge("Writing", "Activate: Context"); sys.addEdge("Über Conceptual", "Activate: Context"); sys.addEdge("Rye", "Activate: Context"); sys.addEdge("New York", "Activate: Context"); sys.addEdge("Conversational", "Process Magazine"); sys.addEdge("Publishing", "Process Magazine"); sys.addEdge("Archives", "Process Magazine"); sys.addEdge("New York", "Process Magazine"); sys.addEdge("Rye", "Process Magazine"); sys.addEdge("Rye High School", "Wearable Sculptures"); sys.addEdge("Sculpture", "Wearable Sculptures"); sys.addEdge("Photography", "Wearable Sculptures"); sys.addEdge("New York", "Wearable Sculptures"); sys.addEdge("Rye", "Wearable Sculptures"); sys.addEdge("Photography", "Polaroids"); sys.addEdge("San Francisco", "Polaroids"); sys.addEdge("California", "Polaroids"); sys.addEdge("Family", "Polaroids"); sys.addEdge("SMFA Pre-College", "Summer 2008"); sys.addEdge("Photography", "Summer 2008"); sys.addEdge("Boston", "Summer 2008"); sys.addEdge("Massachusetts", "Summer 2008"); sys.addEdge("Painting", "Finger Paintings"); sys.addEdge("SMFA Pre-College", "Finger Paintings"); sys.addEdge("Boston", "Finger Paintings"); sys.addEdge("Massachusetts", "Finger Paintings"); sys.addEdge("Drawing", "Thought Webs"); sys.addEdge("Notes", "Thought Webs"); sys.addEdge("Design Thinking", "Thought Webs"); sys.addEdge("Systems", "Thought Webs"); sys.addEdge("SMFA Pre-College", "Thought Webs"); sys.addEdge("Boston", "Thought Webs"); sys.addEdge("Massachusetts", "Thought Webs"); sys.addEdge("Rye High School", "Small Sculptures"); sys.addEdge("Sculpture", "Small Sculptures"); sys.addEdge("Rye", "Small Sculptures"); sys.addEdge("New York", "Small Sculptures"); sys.addEdge("Sculpture", "Ceramic Experiments"); sys.addEdge("Rye High School", "Ceramic Experiments"); sys.addEdge("Rye", "Ceramic Experiments"); sys.addEdge("New York", "Ceramic Experiments"); sys.addEdge("Publishing", "Zephyr Art + Lit Magazine"); sys.addEdge("Design", "Zephyr Art + Lit Magazine"); sys.addEdge("Editing", "Zephyr Art + Lit Magazine"); sys.addEdge("Rye High School", "Zephyr Art + Lit Magazine"); sys.addEdge("Rye", "Zephyr Art + Lit Magazine"); sys.addEdge("New York", "Zephyr Art + Lit Magazine"); sys.addEdge("Sculpture", "Oxbow Final Project"); sys.addEdge("Installation", "Oxbow Final Project"); sys.addEdge("Oxbow School", "Oxbow Final Project"); sys.addEdge("Philosophising", "Oxbow Final Project"); sys.addEdge("Workspace", "Oxbow Final Project"); sys.addEdge("Napa", "Oxbow Final Project"); sys.addEdge("California", "Oxbow Final Project"); sys.addEdge("Video", "Self-Portrait (Spinning)"); sys.addEdge("Performative", "Self-Portrait (Spinning)"); sys.addEdge("Oxbow School", "Self-Portrait (Spinning)"); sys.addEdge("Napa", "Self-Portrait (Spinning)"); sys.addEdge("California", "Self-Portrait (Spinning)"); sys.addEdge("Oxbow School", "Awkward Laughter Paintings"); sys.addEdge("Painting", "Awkward Laughter Paintings"); sys.addEdge("Napa", "Awkward Laughter Paintings"); sys.addEdge("California", "Awkward Laughter Paintings"); sys.addEdge("Printmaking", "Intaglio Printmaking"); sys.addEdge("Oxbow School", "Intaglio Printmaking"); sys.addEdge("Napa", "Intaglio Printmaking"); sys.addEdge("California", "Intaglio Printmaking"); sys.addEdge("Sculpture", "Teepee"); sys.addEdge("Oxbow School", "Teepee"); sys.addEdge("Installation", "Teepee"); sys.addEdge("Workspace", "Teepee"); sys.addEdge("Napa", "Teepee"); sys.addEdge("California", "Teepee"); sys.addEdge("Oxbow School", "Reciprocal"); sys.addEdge("Installation", "Reciprocal"); sys.addEdge("Napa", "Reciprocal"); sys.addEdge("California", "Reciprocal"); sys.addEdge("Oxbow School", "Cones"); sys.addEdge("Sculpture", "Cones"); sys.addEdge("Napa", "Cones"); sys.addEdge("California", "Cones"); sys.addEdge("RISD Pre-College", "Graphic Design"); sys.addEdge("Design", "Graphic Design"); sys.addEdge("Providence", "Graphic Design"); sys.addEdge("Rhode Island", "Graphic Design"); sys.addEdge("High School", "Graphic Design"); sys.addEdge("Drawing", "Drawings"); sys.addEdge("RISD Pre-College", "Drawings"); sys.addEdge("Providence", "Drawings"); sys.addEdge("Rhode Island", "Drawings"); sys.addEdge("High School", "Drawings"); sys.addEdge("Photography", "Family Photos"); sys.addEdge("Rye", "Family Photos"); sys.addEdge("New York", "Family Photos"); sys.addEdge("Charlottesville", "Family Photos"); sys.addEdge("Virginia", "Family Photos"); sys.addEdge("Finland", "Family Photos"); sys.addEdge("High School", "Family Photos"); sys.addEdge("Middle School", "Family Photos"); sys.addEdge("Photography", "Digital Photography"); sys.addEdge("Rye", "Digital Photography"); sys.addEdge("New York", "Digital Photography"); sys.addEdge("Boston", "Digital Photography"); sys.addEdge("Massachusetts", "Digital Photography"); sys.addEdge("High School", "Digital Photography");     // or, equivalently:

    // or, equivalently:
    //
    // sys.graft({
    //   nodes:{
    //     f:{alone:true, mass:.25}
    //   }, 
    //   edges:{
    //     a:{ b:{},
    //         c:{},
    //         d:{},
    //         e:{}
    //     }
    //   }
    // })
    
  })

})(this.jQuery)