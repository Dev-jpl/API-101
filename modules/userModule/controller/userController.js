const DB            = require('../../../config/database'); // import database config
const bcrypt        = require('bcrypt'); // import bcrypt package
const jwt           = require('jsonwebtoken'); // import jsonwebtoken package
const date_and_time = require('date-and-time');
const now           = new Date();
const method        = {};

/**
 * How to use BCRYPT
 */
// const password = "pass1234";
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync(password, salt);
// const compare = bcrypt.compareSync(password, hash);

// console.log({
//     password,
//     salt,
//     hash,
//     compare
// });

const users_payload = [
    {
        user_id: "UUID1234",
        email: "xampp@gmail.com",
        password: "pass1234",
        username: "Xampp",
        contact_no: "2543",
        status: "1",   
    },
    {
        user_id: "UUID8888",
        email: "lamp@gmail.com",
        password: "pass1234",
        username: "Lamp",
        contact_no: "2543",
        status: "1",   
    },
    {
        user_id: "UUID4444",
        email: "wamp@gmail.com",
        password: "pass1234",
        username: "Wamp",
        contact_no: "2543",
        status: "0",   
    }
 ];

//@route GET http://localhost:5001/api/generate_token
method.generate_token = (req, res) => {
    const user_id = 'UUID09876';
    const accessToken = jwt.sign({user_id: user_id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
    res.json({ accessToken });
}   

//@route GET http://localhost:5001/api/get_all_users
method.get_all_users = (req, res) => {
    try{
        const query = `SELECT * FROM users`;

        DB.localDB.query(query, (err, results)=>{
            if(err){
                res.json({ err });
                throw err;
            }else{
                res.json({ results });
            }
        });
    }catch(err){
        res.json({ err });
        throw err;
    }
};

//@route GET http://localhost:5001/api/find_user
method.find_user = (req, res) => {
    try {
        const query = `SELECT * FROM users
                        WHERE user_id = ?`;
            
        var values = [req.body.user_id];

        DB.localDB.query(query, values, (err, results)=>{
            if(err){
                res.json({ message: err});
                throw err;
            }else{
                res.json({ message: results });
            }
        });
    } catch (err) {
        res.status(500).json({ message: err});
        throw err;
    }
};

//@route POST http://localhost:5001/api/create_user
method.create_user = (req, res) => {
    try{
        const salt = bcrypt.genSaltSync(10);

        const query = `INSERT INTO users
                        (user_id, email, password, username, contact_no, status)
                        VALUES (?, ?, ?, ?, ?, ?)`;

        const values = [
            req.body.user_id,
            req.body.email,
            bcrypt.hashSync(req.body.password, salt),
            req.body.username,
            req.body.contact_no,
            req.body.status
        ];

        DB.localDB.query(query, values, (err, results)=>{
            if(err){
                res.json({ err });
            }else{
                res.json({ results });
            }
        });

        /**
         * If you want to use Bulk data to be insert to database
         */
        // const query = `INSERT INTO users
        //                 (user_id, email, password, username, contact_no, status)
        //                 VALUES ?`;

        // const values = users_payload.map(data => [
        //     data.user_id,
        //     data.email,
        //     data.password,
        //     data.username,
        //     data.contact_no,
        //     data.status
        // ]);

        // DB.localDB.query(query, [values], (err, results)=>{
        //     if(err){
        //         res.json({ err });
        //     }else{
        //         res.json({ results });
        //     }
        // });
    }catch(err){
        console.log(err);
        res.json({ err });
    }
};

//@route PUT http://localhost:5001/api/update_user
method.update_user = (req, res) => {
    try {
        const query = `UPDATE users
                       SET status = ?, updated_at = ?
                       WHERE user_id = ?`;
                    
        const values = [
                            req.body.status,
                            date_and_time.format(now, 'YYYY-MM-DD HH:mm:ss'),
                            req.body.user_id // or you can used req.query.user_id if you want to get the data through URL parameter
                        ];

        DB.localDB.query(query, values, (err, results) => {
            if(err){
                res.json({ message: err });
                throw err;
            }else{
                res.status(200).json({ message: results });
            }
        })
    } catch (err) {
        res.json({ message: err });
        throw err;
    }

};

//@route DELETE http://localhost:5001/api/delete_user
method.delete_user = (req, res) => {
    try {
        const query = `DELETE
                       FROM users
                       WHERE user_id = ?`;

        const values = [req.body.user_id];
        
        DB.localDB.query(query, values, (err, results) => {
            if(err){
                res.json({ message: err });
                throw err;
            }else{
                res.status(200).json({ message: results });
            }
        })
    } catch (err) {
        res.json({ message: err });
        throw err;
    }
};

module.exports = method;