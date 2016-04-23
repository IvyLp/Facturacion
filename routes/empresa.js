var express = require('express');
var crypto = require('crypto'),hash;
var router = express.Router();
var pg = require('pg');
var conString = require('../connect');
var informacion,acueducto,representante,departamento,municipio;
var ciudad;

router.get('/viewEmpresa',nocache,muestraInformacion,muestraInformacionAcueducto,muestraInformacionRepresentante,traeDepartamentos,traeMunicipios,function(req,res){
	if(req.session.name)
  {
    ciudad = req.query.Dep;// Atrapa la peticion ajax
    res.render('viewEmpresa/empresa',{
  	   Session:informacion,
       Empresa:acueducto,
       Representante:representante,
       Departamento:departamento,
       Municipio:municipio
  	});
  }
  else res.redirect('/');
});

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*METHOD POST*/
router.post('/viewEmpresa',nocache,function(req,res){
  if(req.body.tb_elige == 1)
  {
    var paramAcueducto = 
    [
      req.body.tb_ideEA,
      req.body.tb_ideE,
      req.body.tb_nomE,
      req.body.ddl_ciudad,
      req.body.tb_dirE,
      req.body.tb_telE
    ];
    pg.connect(conString,function(err,client,done){
      client.query('SELECT sp_actulizar_acueducto($1,$2,$3,$4,$5,$6)',paramAcueducto,function(err,result){
        try{console.log(result);}
        catch(e){console.error(e);}
        finally{res.redirect('/viewEmpresa');}
      });
    });
  }
  else
  {
    var paramRepresentante = 
    [
      req.body.tb_ideRA,
      req.body.tb_ideR,
      hash = crypto.createHmac('sha1', 'iwil2015').update(req.body.tb_ideR).digest('hex'),
      req.body.tb_nomR,
      req.body.tb_apeR,
      req.body.tb_telR,
      req.body.tb_corR
    ];
     pg.connect(conString,function(err,client,done){
      client.query('SELECT sp_actulizar_representante($1,$2,$3,$4,$5,$6,$7)',paramRepresentante,function(err,result){
        try{console.log(result);}
        catch(e){console.error(e);}
        finally{res.redirect('/viewEmpresa');}
      });
    });
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

function muestraInformacionAcueducto(req,res,next)
{
   pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM view_acueducto',function(err,result){
      try{acueducto = result.rows[0];}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}

function muestraInformacionRepresentante(req,res,next)
{
   pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM view_representante',function(err,result){
      try{representante = result.rows[0];}
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