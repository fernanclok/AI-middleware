const http = require('http');

//function to create and start the server
function startServer(app, port) {
    http.
    createServer(app)
    .listen(port, () =>{
        console.log(`Server is running at port: ${port}`);
    });
};

module.exports = startServer;