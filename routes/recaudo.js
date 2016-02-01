var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = require('../connect');
var informacion,entidad;

router.get('/viewRecaudo',nocache,muestraInformacion,muestraEntidad,function(req,res,next){
	if(req.session.name)
	{
		res.render('viewRecaudo/entidad',{
			Session:informacion,
      Entidad:entidad
		});
	}
	else res.redirect('/');
});

router.post('/viewRecaudo',nocache,function(req,res){
  var paramRecaudo = 
  [
    req.body.tb_nombree,
    req.body.rd_tipcuenta,
    req.body.tb_numerocuenta,
    parseFloat(req.body.tb_saldo)
  ];
  console.log(paramRecaudo);
  pg.connect(conString,function(err,client,done){
    client.query('SELECT SP_AGREGAR_PUNTO($1,$2,$3,$4)',paramRecaudo,function(err,result){
      try{console.log('result');}
      catch(e){console.error(e.message);}
      finally{res.redirect('/viewRecaudo');}
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

function muestraEntidad(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM sp_mostrar_entidadr()',function(err,result){
      try{entidad = result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}