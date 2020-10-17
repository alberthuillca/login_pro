const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://srromario:richetiprotege@bdlogin.n2kw7.mongodb.net/db_users?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is conected'))