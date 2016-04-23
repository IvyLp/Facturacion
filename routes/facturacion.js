var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = require('../connect');
var informacion,regional,facturar,determinador,emedidor,facturas;
var mes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
var d = new Date();
var n = d.getMonth();

router.get('/viewConsumos',nocache,muestraInformacion,muestraSuscriptores,muestraDeterminador,muestraMedidor,function(req,res,next){
  if(req.session.name)
	{
		res.render('viewFacturacion/consumo',{
			Session: informacion,
      Periodo: [mes[n-2],mes[n-1]],
      Facturar:facturar,
      Determinador:determinador,
      Medidor:emedidor
		});
	}
	else res.redirect('/');
});

router.get('/viewFacturas',nocache,muestraInformacion,muestraFactura,function(req,res,next){
  if(req.session.name)
  {
    res.render('viewFacturacion/factura',{
      Session: informacion,
      Factura: facturas
    });
  }
  else res.redirect('/');
});


/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*METHODO POST*/
router.post('/add/:id/factura',function(req,res,next){
  var paramsFactura = 
  [
    req.params.id,
    parseInt(req.body.ddl_medidorestado),
    parseInt(req.body.ddl_determinador),
    parseInt(req.body.tb_lectura),
    parseInt(req.body.tb_lecturaA),
    parseInt(req.body.tb_conexion),
    parseInt(req.body.tb_reconexion),
    parseInt(req.body.tb_reinstalacion),
    parseInt(req.body.tb_suspension),
    parseInt(req.body.tb_corte),
    parseInt(req.body.tb_dias)
  ];
  console.log(paramsFactura);
  pg.connect(conString,function(err,client,done){
    client.query('SELECT sp_generar_factura($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',paramsFactura,function(err,result){
      try{console.log(result);}
      catch(e){console.error(e);}
      finally{res.redirect('/viewConsumos');}
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

function muestraSuscriptores(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_FACTURACION_SUSCRIPTORES()',function(err,result){
      try{facturar = result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}

function muestraDeterminador(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query ('SELECT * FROM SP_MOSTRAR_DETERMINADOR()',function(err,result){
      try{determinador = result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}

function muestraMedidor(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRADOR_ESTADOMEDIDOR()', function(err,result){
      try{emedidor = result.rows;}
      catch(e){console.log(e);}
      finally{done();next();}
    });
  });
}

function muestraFactura(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM view_factura',function(err,result){
      try{facturas = result.rows;}
      catch(e){console.log(e);}
      finally{done();next();}
    });
  });
}