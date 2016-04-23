var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = require('../connect');
var dPerfil,informacion,grafico1;
/* GET users listing. */

router.get('/user',direccionaPerfil,function(req,res,next){
  if(dPerfil == 1) res.redirect('/user/admin');
  else if(dPerfil == 2) res.redirect('/user/edit');
  else if(dPerfil == 3) res.redirect('/user/consult');
  else if(dPerfil == 4) res.redirect('/user/client');
  else res.redirect('/');
});

router.get('/user/Admin',nocache,muestraInformacion,muestraGrafico1, function(req, res, next) {
  if(req.session.name)
  {
  	res.render('viewUser/admin',{
      Session:informacion,
      Grafico1:grafico1
    });
  }
  else
  {
  	res.redirect('/');
  }
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

function direccionaPerfil(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_TRAE_RPERFIL($1)',[req.session.name],function(err,result){
      try{dPerfil= result.rows[0].sp_trae_rperfil;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
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

function muestraGrafico1(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT *  FROM sp_grafica1()',function(err,result){
      try{grafico1 = result.rows;}
      catch(e){console.error(e);}
      finally{done;next();}
    });
  });
}