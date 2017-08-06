# nodejs-mysql-login-and-signup
nodejs and mysql login and signup project 
<h2>install</h2>

<h3>config/database.js</h3>
<pre>
module.exports = {
    'connection': {
        'host': '127.0.0.1', // local or ip adress .
        'user': 'root', // mysql user name
        'password': 'password', // password 
        'database': 'dbname'// database name .
    },
	'database': 'dbname',
    
};
</pre>


<pre>npm install </pre>
<pre>node server.js</pre>

<h2>How is running</h2>

<h4>click localhost:300/signup</h4>
<pre>
app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/login',
        failureRedirect: '/signup',
        failureFlash : true 
}));
</pre>
<h4>sign up </h4>
<pre>
passport.use(
        'local-signup',
        new LocalStrategy({

            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) {

            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {

                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)
                    };

                    var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
 );
</pre>
<h4>Sign in</h4>
<pre>
passport.use(
        'local-login',
        new LocalStrategy({
            
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) { 
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'bulunamadi.')); 
                }

           
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'yanlis parola.'));

          
                return done(null, rows[0]);
            });
        })
    );
</pre>
