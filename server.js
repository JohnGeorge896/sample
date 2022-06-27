const express = require ('express');

const mysql = require('mysql');

const cors = require('cors');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

const { v4: uuidv4 } = require('uuid');

//app.use(bodyParser.json({type:'application/json'}));

//app.use(bodyParser.urlencoded({extended:true}));

const con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user:'root',
    password:'password',
    database:'testing'

});

const app = express();
app.use(cors());
app.use(express.json());

// con.connect(error=>{
//     if(error) console.log(error);
//     else console.log('connected');
// });


app.listen(4545,()=>{
    // const host = server.address().address;
    // const port = server.address().port;
    console.log('started')
});

app.post(`/api/createcustomers`, (req,res)=> {
    const id = uuidv4();
    const name = req.body.name;
    const city = req.body.city;
    const state = req.body.state;
    const phoneno = req.body.phoneno;

    console.log(name);
    console.log(state);
    con.query("INSERT INTO customers (id, name, city, state, phoneno) VALUES (?,?,?,?,?)",[id,name,city,state,phoneno], (err,result)=>{
        if(err) {
        console.log(err)
        } 
        res.send('ok')
     });   
});   


app.post(`/api/createusers/`, async(req,res)=> {

    const email = req.body.email;
    let password = req.body.password;
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    
    con.query("SELECT * from users WHERE email = ?",email,(err,result)=>{
        console.log(result.length);
        if(result.length==0){
            con.query("INSERT INTO users (email, password) VALUES (?,?)",[email,password], (err,result)=>{
                if(err) {
                console.log(err)
                } 
               res.send('ok')
             });
        }else{
            res.send('email already in use')
            console.log(result)
        }

    })
});  

app.post('/checkuser',async (req,res)=>{
    const email = req.body.email;
    var password = req.body.password;
    //const salt = await bcrypt.genSalt(10);
    //password = await bcrypt.hash(password, salt);
    con.query("SELECT * from users WHERE email = ?",[email],(err,result)=>{
        console.log(result.length);
        if(result.length==0){
            res.send('Given email is not registered');
        }else{
            bcrypt.compare(req.body.password,result[0].password,(err,result)=>{
                    if(result){
                        res.send(result);
                    }
                    else{
                        res.send('password wrong')
                    }
            })
        }    
    });    

});

app.get('/cus',(req,res)=>{
    con.query('select * from customers',(err,rows,fields)=>{
        if(err) console.log(error);
        else{
           // console.log(rows);
            res.send(rows);
        }
});
});

app.delete('/del/:id',(req,res)=>{
    const id = req.params.id
    con.query(`DELETE FROM customers WHERE id=?`,id,(err)=>{
        if(err) console.log(err);
        else {
            res.send('deleted')
        }    
    })
});

app.post('/api/update',(req,res)=>{

    const id = req.body.id;
    const name = req.body.name;
    const city = req.body.city;
    const state = req.body.state;
    const phoneno = req.body.phoneno;

    //console.log(phoneno)

    con.query(`UPDATE customers SET name= ?, city= ?, state= ?, phoneno= ? WHERE id= ? `,[name,city,state,phoneno,id], (err,result)=>{
       if(err) {
            console.log(err)   
       } 
       else{
            res.send('updated')
       }
 
        });    
    });
    