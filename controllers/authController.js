const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const db =require('../database/db');

const {promisify}=require('util');
const conexion = require('../database/db');
const { Console } = require('console');
const { data } = require('jquery');


exports.register=async(req,res)=>{
    const nombre=req.body.nombre;
    const username=req.body.nombreUsuario;
    db.query('INSERT INTO  usuarios set ?',{   nombre_usuario:nombre ,  user_usuario:username ,  pass_usuario:'uwu'},(error,results)=>{
        if (error) {console.log(error)};
    })
    console.log(nombre+'-'+username);
}


exports.login=async(req,res)=>{

    try {
        const username=req.body.user;
        const pass=req.body.pass;
        const validate=false;
        if (!username||!pass) {
        res.send({
            state:validate,
            mensaje:'datos no ingresados',
            err:404
        });
            
        }else{
            var sql = 'SELECT * FROM estudiantes WHERE usuario  = ? AND contrasena= ? ';
            //Send an array with value(s) to replace the escaped values:
            db.query(sql, [username, pass], function (err, result) {
              if (err) throw err;
              if (result==""||result==null) {
                res.send({
                    state:validate,
                    mensaje:'no se encontro el usuario',
                    err:400
                });
              }else{
                const id_user=result[0].id_usuario;
                const token=jwt.sign({
                    id:id_user,
                    data:result
                },process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_TIME_END
                })
                res.send({
                    state:validate,
                    token:token,
                    err:204,
                    conectado:'conectado',
                    data:result
                });
            
             /* 
                validate=true;
                console.log('token:'+token+'para el usuario'+result[0].nombre_usuario)
                const cookieOptions={
                    httpOnly:true
                }
                res.cookie('jwt',token,cookieOptions); */
              };
            });
        };
    } catch (error) {
        console.log('r'+error);
    };

};



/* exports.isauth=async(req,res,next)=>{

        if (req.cookies.jwt) {
            try {
                const decodificada=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)
                db.query('SELECT * FROM usuarios WHERE id_usuario = ?',[decodificada.id_usuario],(error,result)=>{
                    if (!result) {return next()
                    };
                    req.user=result[0];
                    return next();
                })
            } catch (error) {
                console.log(error)
               
            }

        }else{
            res.redirect('/login')
        }

} */


exports.logout=async(req,res)=>{
    res.clearCookie('jwt');
    return res.redirect('/login')
}