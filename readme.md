# streetfighters secret santa
quick and dirty express app for taking down peoples deets for secret santa. database is gonna be deleted shortly after the game is done.

requires postgres and node js. cp config-example.js to config.js, fill it out with db connection details and a port to listen on for incoming requests, then you can run npm install.

# todo
- [ ] write matchup script that parses db and randomly picks a user and updates their recipient in the db
- [ ] change success endpoint to do the db lookup for their recipient and pass along that name/address pair to the requestor
