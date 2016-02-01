var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = require('../connect');
var informacion,departamento,municipio,acueducto1,viewRegiones;
var ciudad;

router.get('/viewRegion/region',nocache,muestraInformacion,traeAcueductos,traeDepartamentos,traeMunicipios,traeViewRegiones, function(req, res, next) {
  if(req.session.name)
  {
    ciudad = req.query.Dep;// Atrapa la peticion ajax
  	res.render('viewRegion/region',{
      Session:informacion,
      Acueducto1:acueducto1,
      Departamento:departamento,
      Municipio:municipio,
      Regiones:viewRegiones
    });
  }
  else
  {
  	res.redirect('/');
  }
});


/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*METHOD POST*/

router.post('/viewRegion/region',nocache,function(req,res){
  var paramRegional = [
   req.body.ddl_acueducto, 
   req.body.ddl_ciudad,
   parseInt(req.body.Tb_conf),
   parseInt(req.body.ciclo),
   parseInt(req.body.vencimiento)
   ];

 pg.connect(conString,function(err,client,done){
  client.query('SELECT SP_AGREGAR_REGIONAL($1,$2,$3,$4,$5)',paramRegional,function(err,result){
      try{console.log(result.SP_AGREGAR_REGIONAL);}
      catch(e){console.error(e);}
      finally{res.redirect('/viewRegion/region');}
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


function traeDepartamentos(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_DEPARTAMENTO()',function(err,result){
      try{departamento = result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}

function traeMunicipios(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_MUNICIPIO($1)',[ciudad],function(err,result){
      try{municipio = result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}

function traeAcueductos(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_ACUEDUCTO()',function(err,result){
      try{acueducto1 = result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}
function traeViewRegiones(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM view_regionales',function(err,result){      
      try{viewRegiones= result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}