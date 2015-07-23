var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = require('../connect');
var informacion,viewRegiones,clases,tarifas;

router.get('/add/:id/tarifa',nocache,muestraInformacion,traeViewRegiones,traeClases,mostrarTarifas,function(req,res,next){
  if(req.session.name)
  {
    res.render('viewTarifa/tarifa',{
		  Nombre:informacion._nomu,
      Apellido:informacion._apeu,
      Acueducto:informacion._noma,
		  Region:viewRegiones,
      Clase:clases,
      Tarifa:tarifas
		});
  }
  else res.redirect('/');
});
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*METHOD POST*/

router.post('/add/:id/tarifa',function(req,res){
 var paramsTarifa = 
 [
   parseInt(req.body.ddl_claseu),
   req.body.tb_cf,
   req.body.tb_bs,
   req.body.tb_com,
   req.body.tb_sun,
   parseFloat(req.body.tb_fact),
   // parseFloat(req.body.tb_mora),
   parseFloat(req.body.tb_intm),
   parseFloat(req.body.tb_cta),
   parseInt(req.params.id)
 ];
 pg.connect(conString,function(err,client,done){
      client.query('SELECT SP_AGREGAR_TARIFA($1,$2,$3,$4,$5,$6,$7,$8,$9);',paramsTarifa,function(err,result){
        try{console.log(result)}
        catch(e){console.error(e);}
        finally{res.redirect('/add/'+req.params.id+'/tarifa?_method=ADDTARIFA');}
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

function traeViewRegiones(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM view_regionales WHERE id_region = $1',[req.params.id],function(err,result){      
      try{viewRegiones= result.rows[0];}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}

function traeClases(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_CLASE()',function(err,result){      
      try{clases= result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}

function mostrarTarifas(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_TARIFAS($1)',[req.params.id],function(err,result){
      try{tarifas= result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}