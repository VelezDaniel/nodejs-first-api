import app from './app.js';

app.listen(app.get('port'), () => {
    console.log("Server On, Listen in port: ", app.get("port"));
});