/**
 * Script to generate and insert test data into the given database.
 */

// Change to get the intended number of documents
var documents = Math.random() * 100000;

// Change to get the intended number of documents
var comments = Math.random() * 300000;

// A rather long text simulating the blog post, the same for all posts
var text = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." +
     "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." +
     "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." +
     "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat." +
     "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi." +
     "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer";

// Generate and insert the blog posts
for(i = 0; i < documents; i++) {

     // Set some author names
     var name = "anonymous";
     if(i % 7 === 0) {
          name = "philipp";
     } else if(i % 3 === 0) {
          name = "annika";
     } else if(i % 5 === 0) {
          name = "markus";
     } else if(i % 2 === 0) {
          name = "lisa";
     }

     // Generate a random string for the URL
     var url = "http://test.com/" + new Array(10).join().replace(/(.|$)/g, function(){
          return ((Math.random()*36)|0).toString(36)[Math.random()<.5?"toString":"toUpperCase"]();
     });

     // Generate a random date
     var posted = new Date(ISODate().getTime() - 1000 * 60 * 60 * (ISODate().getTime() % 300));

     // Insert the data
     db.blogposts.insert({ "number": i, "name": name, "url": url, "posted": posted, "text": text });
}

// Generate and insert the comments
for(i = 0; i < comments; i++) {

     // Generate a random rating
     var rating = Math.floor(Math.random() * 6);

     // Set it for a random blog post
     var post = Math.floor(Math.random() * documents);

     // Insert the data
     db.comments.insert({ "blogpost_number": post, "rating": rating })
}

print("Blog posts inserted: " + db.blogposts.count());
print("Comments inserted: " + db.comments.count());