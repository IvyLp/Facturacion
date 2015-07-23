var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = require('../connect');
var informacion,regional;

router.get('/viewConsumos',nocache,muestraInformacion,function(req,res,next){
	if(req.session.name)
	{
		res.render('viewFacturacion/consumo',{
			Nombre:informacion._nomu,
      		Apellido:informacion._apeu,
      		Acueducto:informacion._noma
		});
	}
	else res.redirect('/');
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

