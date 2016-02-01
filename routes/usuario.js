var express = require('express');
var crypto = require('crypto'),hash;
var router = express.Router();
var pg = require('pg');
var conString = require('../connect');
var informacion,usuario,rol,documento,infousuario;
var cedula='';


router.get('/viewUser',nocache,muestraInformacion,muestraUsuario,function(req,res,next){
	if(req.session.name)
  {
    res.render('viewUsuario/users',{
  	   Session:informacion,
       Usuario:usuario
  	});
  }
  else res.redirect('/');
});



router.get('/viewUser/addUsers',nocache,muestraInformacion,traeDocumentos,traeRoles,traeUsuario,function(req,res,next){
  if(req.session.name)
  {
    cedula = req.query.Usr;// Atrapa la peticion ajax
    res.render('viewUsuario/adduser',{
      Session:informacion,
      Documento:documento,
      Rol:rol,
      User:infousuario
    });
  }
  else res.redirect('/');
});

router.post('/viewUser/addUsers',nocache,function(req,res){
  hash = crypto.createHmac('sha1','iwil2015').update(req.body.tb_identificacion).digest('hex');
  var paramUsuario =
  [
   req.body.tb_identificacion,
   parseInt(req.body.ddl_tipodoc),
   req.body.tb_nombre,
   req.body.tb_apellido,
   req.body.tb_telefono,
   req.body.tb_correo,
   parseInt(req.body.ddl_rol),
   hash 
  ];
  pg.connect(conString,function(err,client,done){
    client.query('SELECT SP_AGREGAR_USER($1,$2,$3,$4,$5,$6,$7,$8)',paramUsuario,function(err,result){
      try{console.log(result);}
      catch(err){console.log(err);}
      finally
      {
        done();
        res.redirect('/viewUser');
      }     
    });
  });
});

module.exports = router;

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function nocache(req, res, next) 
{
   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
   res.header('Expires', '-1');
   res.header('Pragma', 'no-cache');
   next();
}

function muestraInformacion(req,res,next)
{
   pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_TRAE_INFO1($1)',[req.session.name],function(err,result){
      try{informacion = result.rows[0];}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}

function muestraUsuario(req,res,next)
{
   pg.connect(conString,function(err,client,done){
    client.query('SELECT *FROM view_usuario',function(err,result){
      try{usuario = result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
   });
}

function traeDocumentos(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_TIPOS()',function(err,result){
      try{documento = result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}


function traeRoles(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_ROL()',function(err,result){
      try{rol = result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}

function traeUsuario(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_USUARIO($1)',[cedula],function(err,result){
      try{infousuario = result.rows[0];}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}