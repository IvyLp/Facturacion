var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = require('../connect');
var informacion,suscriptor,documento,viewRegiones,tarifa,infotitular,infonuid,infocontrato,infoigac,infosuscriptor;
var ciudad;
var tar;
var cedula;
var nuid;
var contrato;
var ZonI, SecI, ManI, ConI, NopI;


router.get('/viewSuscriptor',nocache,muestraInformacion,muestraSuscriptores,function(req,res,next){
	if(req.session.name)
    {
       res.render('viewSuscriptor/suscriptor',{
  	     Session:informacion,
         Suscriptor:suscriptor,        
  	   });
  	}
  else res.redirect('/');
});

router.get('/viewSuscriptor/addSuscriptor',nocache,muestraInformacion,traeDocumentos,traeDepartamentos,traeMunicipios,traeViewRegiones,mostrarTarifa,existeSuscriptor,existeNuid,existeContrato,existeIgac,function(req,res,next){
  if(req.session.name)
  {
    ciudad = req.query.Dep;// Atrapa la peticion ajax
    tar = req.query.Tar;
    cedula = req.query.Tit;
    nuid = req.query.Sus;
    contrato = req.query.Sus;
    ZonI = req.query.Zi;
    SecI = req.query.Si;
    ManI = req.query.Mi;
    ConI = req.query.Ci;
    NopI = req.query.Ni;
    res.render('viewSuscriptor/addsuscriptor',{
      Session:informacion,
      Documento:documento,
      Departamento:departamento,
      Municipio:municipio,
      Region:viewRegiones,
      Tarifa:tarifa,
      Titular: infotitular,
      Nuid: infonuid,
      Contrato:infocontrato,
      Igac: infoigac
    });
  }
  else res.redirect('/');
});

router.get('/details/:id/suscriptor',nocache,muestraInformacion,muestraSuscripcion,function(req,res,next){
  if(req.session.name)
  { 
    res.render('viewSuscriptor/detailsSuscriptor',
    {
     Session:informacion,
     Suscripcion:infosuscriptor
    });
  }
  else res.redirect('/');
});

router.get('/edit/:id/titular',nocache,muestraInformacion,muestraSuscripcion,traeDocumentos,traeDepartamentos,traeMunicipios,function(req,res, next){
  if(req.session.name)
  {
    ciudad = req.query.Dep;// Atrapa la peticion ajax
    res.render('viewSuscriptor/editTitular',{
      Session:informacion,
      Suscripcion:infosuscriptor,
      Documento:documento,
      Departamento:departamento,
      Municipio:municipio
    });
  }
  else res.redirect('/');
});

router.get('/edit/:id/nuid',nocache,muestraInformacion,muestraSuscripcion,traeViewRegiones,mostrarTarifa,existeNuid,existeContrato,existeIgac,function(req,res, next){
  nuid = req.query.Sus;
  contrato = req.query.Sus;
  ZonI = req.query.Zi;
  SecI = req.query.Si;
  ManI = req.query.Mi;
  ConI = req.query.Ci;
  NopI = req.query.Ni;
  if(req.session.name)
  {
    tar = req.query.Tar;
    res.render('viewSuscriptor/editNuid',{
      Session:informacion,
      Suscripcion:infosuscriptor,
      Region:viewRegiones,
      Tarifa:tarifa,
      Nuid: infonuid,
      Contrato:infocontrato,
      Igac: infoigac
    });
    console.log(infosuscriptor);
  }
  else res.redirect('/');
});
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*METHOD POST*/

router.post('/viewSuscriptor/addsuscriptor',function(req,res){
  var medidor = '';
  if(req.body.Ch_mdd)
  {
    medidor = 'SELECT sp_agregar_suscriptor($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)';
    var paramSuscriptor = 
    [
      req.body.tb_identificacions,
      parseInt(req.body.ddl_tipodocs),
      req.body.tb_nombres,
      req.body.tb_apellidos,
      req.body.tb_fechas,
      req.body.ddl_ciudads,
      req.body.tb_direccions,
      req.body.tb_telefonos,
      req.body.tb_correos,
      req.body.tb_nuid,
      req.body.tb_contrato,
      parseInt(req.body.tb_zonI),
      parseInt(req.body.tb_secI),
      parseInt(req.body.tb_manI),
      parseInt(req.body.tb_npredial),
      parseInt(req.body.tb_conI),
      parseInt(req.body.tb_urm),
      parseInt(req.body.tb_unrm),
      parseInt(req.body.rd_h),
      parseInt(req.body.ddl_region),
      req.body.tb_direccions2,
      parseInt(req.body.ddl_tarifa),
      req.body.tb_fecha,
      req.body.tb_medidor,
      req.body.tb_marca,
      req.body.tb_finstalacion
    ];
  }
  else
  {
    medidor = 'SELECT sp_agregar_suscriptor2($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)';
    var paramSuscriptor = 
    [
      req.body.tb_identificacions,
      parseInt(req.body.ddl_tipodocs),
      req.body.tb_nombres,
      req.body.tb_apellidos,
      req.body.tb_fechas,
      req.body.ddl_ciudads,
      req.body.tb_direccions,
      req.body.tb_telefonos,
      req.body.tb_correos,
      req.body.tb_nuid,
      req.body.tb_contrato,
      parseInt(req.body.tb_zonI),
      parseInt(req.body.tb_secI),
      parseInt(req.body.tb_manI),
      parseInt(req.body.tb_npredial),
      parseInt(req.body.tb_conI),
      parseInt(req.body.tb_urm),
      parseInt(req.body.tb_unrm),
      parseInt(req.body.rd_h),
      parseInt(req.body.ddl_region),
      req.body.tb_direccions2,
      parseInt(req.body.ddl_tarifa),
      req.body.tb_fecha
    ];
  }
  console.log(paramSuscriptor);
  pg.connect(conString,function(err,client,done){
    client.query(medidor,paramSuscriptor,function(err,result){
      try{console.log(result.rows);}
      catch(err){console.log(err);}
      finally
      {
        done();
        res.redirect('/viewSuscriptor');
      }
    })
  });
});


router.post('/edit/:id/titular',function(req,res, next){
  var paramsTitular =
      [
          req.body.identificacionActual,
          req.body.identificacionNueva,
          parseInt(req.body.ddl_tipodocs),
          req.body.nombre,
          req.body.apellido,
          req.body.fechaN,
          req.body.ddl_ciudads,
          req.body.direccion,
          req.body.telefono,
          req.body.correo
      ];

  pg.connect(conString,function(err,client,done){
    client.query('SELECT sp_actualizar_titular($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',paramsTitular,function(err,result){
      try{console.log(result.rows);}
      catch(err){console.log(err);}
      finally
      {
        done();
        res.redirect('/details/'+req.params.id+'/suscriptor');
      }
    })
  });
});

router.post('/edit/:id/nuid',function(req,res, next){
  var paramsNuid =
      [
        req.body.tb_nuida,
        req.body.tb_nuid,
        req.body.tb_contrato,
        parseInt(req.body.tb_zonI),
        parseInt(req.body.tb_secI),
        parseInt(req.body.tb_manI),
        parseInt(req.body.tb_npredial),
        parseInt(req.body.tb_conI),
        req.body.tb_direccions2,
        parseInt(req.body.tb_urm),
        parseInt(req.body.tb_unrm),
        parseInt(req.body.rd_h),
        parseInt(req.body.ddl_region),
        parseInt(req.body.ddl_tarifa),
        req.body.tb_fecha
      ];
  pg.connect(conString,function(err,client,done){
    client.query('SELECT sp_actualizar_nuid($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)',paramsNuid,function(err,result){
      try{console.log(result.rows);}
      catch(err){console.log(err);}
      finally
      {
        done();
        res.redirect('/details/'+req.body.tb_nuid+'/suscriptor');
      }
    })
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
      catch(e){console.error(e.message);}
      finally{done();next();}
    });
  });
}

function muestraSuscriptores(req,res,next)
{
	pg.connect(conString,function(err,client,done){
		client.query('SELECT * FROM view_suscriptores',function(err,result){
			try{suscriptor= result.rows;}
			catch(e){console.error(e.message);}
			finally{done();next();}
		});
	});
}


function traeDocumentos(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_TIPOS()',function(err,result){
      try{documento = result.rows;}
      catch(e){console.error(e.message);}
      finally{done();next();}
    });
  });
}

function traeDepartamentos(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_DEPARTAMENTO()',function(err,result){
      try{departamento = result.rows;}
      catch(e){console.error(e.message);}
      finally{done();next();}
    });
  });
}

function traeMunicipios(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_MUNICIPIO($1)',[ciudad],function(err,result){
      try{municipio = result.rows;}
      catch(e){console.error(e.message);}
      finally{done();next();}
    });
  });
}

function traeViewRegiones(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM view_regionales',function(err,result){      
      try{viewRegiones= result.rows;}
      catch(e){console.error(e.message);}
      finally{done();next();}
    });
  });
}

function mostrarTarifa(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_TARIFAS($1)',[tar],function(err,result){
      try{tarifa = result.rows;}
      catch(e){console.error(e.message);}
      finally{done();next();}
    });
  });
}

function existeSuscriptor(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_TITULAR($1)',[cedula],function(err,result){
      try{infotitular = result.rows[0];}
      catch(e){console.error(e.message);}
      finally{done();next();}
    });
  });
}

function existeNuid(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_EXISTE_NUID($1)',[nuid],function(err,result){
      try{infonuid = result.rows[0];}
      catch(e){console.error(e.message);}
      finally{done();next();}
    });
  });
}

function existeContrato(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_EXISTE_CONTRATO($1)',[contrato],function(err,result){
      try{infocontrato = result.rows[0];}
      catch(e){console.error(e.message);}
      finally{done();next();}
    });
  });
}

function existeIgac(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query(' SELECT * FROM sp_existe_igac($1,$2,$3,$4,$5)',[ZonI, SecI, ManI,NopI,ConI],function(err,result){
      try{infoigac = result.rows[0];}
      catch(e){console.error(e.message);}
      finally{done();next();}
    });
  });
}

function muestraSuscripcion(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM view_suscriptores_detallada WHERE nuid = $1',[req.params.id],function(err,result){
      try{infosuscriptor = result.rows[0];}
      catch(e){console.error(e.message);}
      finally{done();next();}  
    });  
  });
}