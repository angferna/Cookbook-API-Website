use blogger

db.articles.insert({
    author:"Kate Harris",
    email:"kateharris@examplemail.com",
    creationDate:"02-02-2022",
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et netus et malesuada fames ac turpis. A erat nam at lectus urna. Tempus imperdiet nulla malesuada pellentesque. Orci sagittis eu volutpat odio facilisis mauris sit. Malesuada nunc vel risus commodo viverra maecenas. Ut tristique et egestas quis ipsum suspendisse ultrices. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Tincidunt id aliquet risus feugiat in ante metus dictum. Sed faucibus turpis in eu mi bibendum neque egestas congue."
});

db.articles.find().pretty();
