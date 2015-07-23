var express = require('express');
var crypto = require('crypto'),hash;
var router = express.Router();
var pg = require('pg');
var conString = require('../connect');
var rol,acueducto,usuario,departamento,documento,municipio;
var ciudad;


/* GET home page. */
router.get('/',nocache,existeAcueducto,existeUsuario,traeRoles,traeDocumentos,traeDepartamentos,traeMunicipios,function(req, res, next) {
  if(acueducto === 0 || acueducto === "0")
  {
  	ciudad = req.query.Dep;// Atrapa la peticion ajax
   	res.render('viewRegistro/registro',{Departamento:departamento,Municipio:municipio,Documento:documento});
  }
  else
  { 
  	if(usuario === 0 || usuario === "0")
  	{
  		res.render('viewRegistro/registro2',{Rol:rol,Documento:documento});
  	}
  	else
  	{
  		if(req.session.name)res.redirect('/user');
  		else res.render('viewRegistro/registro', { Rol: rol });			
  	}
  }
});

router.post('/',nocache,function(req,res){
	if(acueducto == 0)
	{
		var paramAcueducto = 
		 [
		 	req.body.tb_nit,
		 	parseInt(req.body.ddl_tipodoc),
		 	req.body.tb_nombreacu,
		 	req.body.ddl_ciudad,
		 	req.body.tb_dir,
		 	req.body.tb_tel
		 ];
		pg.connect(conString,function(err,client,done){
			client.query('SELECT SP_AGREGAR_ACUEDUCTO($1,$2, $3 ,$4 ,$5 ,$6)',paramAcueducto,function(err,result){
				if(err) console.error(err);
				else console.log(result);
				res.redirect('/');
			});
		});
	}
	else
	{
		if(usuario == 0 )
		{	
			hash = crypto.createHmac('sha1','iwil2015').update(req.body.tb_pass).digest('hex');
			var paramUsuario = 
			[
				req.body.tb_ide,
				req.body.ddl_tipodoc,
				req.body.tb_nomu,
				req.body.tb_apeu,
				req.body.tb_tel,
				req.body.tb_email,
				hash,
				req.body.ddl_rol,
				true
			];
			pg.connect(conString,function(err,client,done){
				client.query('SELECT SP_AGREGAR_USUARIOI($1,$2,$3,$4,$5,$6,$7,$8,$9)',paramUsuario,function(err,result){
					if(err) console.log(err);
					else console.log(result);
					res.redirect('/');
				});
			});
		}
		else
		{
			pg.connect(conString,function(err,client,done){
				console.log(req.body.tb_pass);
				hash = crypto.createHmac('sha1', 'iwil2015').update(req.body.tb_clave).digest('hex');
				client.query('SELECT * FROM SP_LOGIN($1,$2,$3)',[req.body.tb_usuario,hash,req.body.ddl_rol],function(err,result){
					try
					{	
						req.session.name = result.rows[0].idp;
						if(result.rows[0].rl != undefined )	res.redirect('/user');
						else res.redirect('/');
					}
					catch(e)
					{
						console.error(e.message);
						res.redirect('/');
					}
					finally
					{
						done();
					}
					
				});
			});	
		}
	}
});


module.exports = router;

//-------------------------------------------------------------------------------------------------------------------------------//
// MODEL
//-------------------------------------------------------------------------------------------------------------------------------//

function mostrarPeticion(req,res,next)
{
	console.log(req.query.Dep);
	next();
}

function existeAcueducto(req,res,next)
{
	pg.connect(conString,function(err,client,done){
		client.query('SELECT * FROM SP_EXISTE_ACUEDUCTO()',function(err,result){
			try{acueducto = result.rows[0].existe;}
			catch(e){console.error(e);}
			finally{done();next();}
		});
	});
}

function existeUsuario(req,res,next)
{
	pg.connect(conString,function(err,client,done){
		client.query('SELECT * FROM SP_EXISTE_USUARIO()',function(err,result){
			try{usuario = result.rows[0].existe;}
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

function nocache(req, res, next) 
{
   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
   res.header('Expires', '-1');
   res.header('Pragma', 'no-cache');
   next();
}