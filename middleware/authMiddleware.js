const jwt = require('jsonwebtoken');

global.authorize = (req, res, next) => {
    // console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;

    if(typeof authHeader !== 'undefined'){
        jwt.verify(authHeader, process.env.ACCESS_TOKEN, (err, results) => {
            if(err){
                // console.log(err);
                return res.json({ message: "Authorization has been expired!" });
                // return res.sendStatus(403);
            }else{
                // console.log(results);
                next();
            }
        })
    }else{
        return res.json({ message: "Not Authorize" });
        // return res.sendStatus(401);
    }
}