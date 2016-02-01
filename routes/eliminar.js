var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = require('../connect');

router.get('/delete/:id/region',function(req,res,next){
	pg.connect(conString,function(err,client,done){
		client.query('DELETE FROM region_servicio WHERE id_region = $1',[req.params.id],function(err,result){
			if(err) console.error(err);
			else console.log(result);
			res.redirect('/viewRegion/region');
		});
	});
});

router.get('/delete/:id/tarifa',function(req,res,next){
	pg.connect(conString,function(err,client,done){
		client.query('DELETE FROM tarifa WHERE id_tarifa = $1',[req.params.id],function(err,result){
			if(err) console.error(err);
			else console.log(result);
			res.redirect('/viewRegion/region');
		});
	});
});

router.get('/delete/:id/perfil',function(req,res,next){
	pg.connect(conString,function(err,client,done){
		client.query('DELETE FROM perfil WHERE id_perfil = $1',[req.params.id],function(err,result){
			if(err) console.error(err);
			else console.log(result);
			res.redirect('/viewUser');
		});
	});
});

router.get('/delete/:id/usuario',function(req,res,next){
	pg.connect(conString,function(err,client,done){
		client.query('DELETE FROM usuario WHERE identificacion = $1',[req.params.id],function(err,result){
			if(err) console.error(err);
			else console.log(result);
			res.redirect('/viewUser');
		});
	});
});

router.get('/delete/:id/titular',function(req,res,next){
	pg.connect(conString,function(err,client,done){
		client.query('DELETE FROM titular WHERE identificacion = $1', [req.params.id],function(err,result){
			if(err) console.error(err);
			else console.log(result);
			res.redirect('/viewSuscriptor/addSuscriptor');
		});
	});
});

router.get('/delete/:id/suscripcion',function(req,res,next){
	pg.connect(conString,function(err,client,done){
		client.query('DELETE FROM suscripcion WHERE nuid = $1',[req.params.id],function(err,result){
			if(err) conString.error(err.message);
			else console.log(result);
			res.redirect('/viewSuscriptor');
		});	
	});
});

router.get('/delete/:id/entidad',function(req,res,next){
	pg.connect(conString,function(err,client,done){
		client.query('DELETE FROM entidad WHERE id_entidad = $1',[req.params.id],function(err,result){
			if(err) conString.error(err.message);
			else console.log(result);
			res.redirect('/viewRecaudo');
		});	
	});
});

router.get('/delete/:id/factura',function(req,res,next){
	pg.connect(conString,function(err,client,done){
		client.query('DELETE FROM facturacion WHERE no_factura = $1',[req.params.id],function(err,result){
			if(err) conString.error(err.message);
			else console.log(result);
			res.redirect('/viewFacturas');
		});
	});
});

router.get('/delete/:id/concepto',function(req,res,next){
	pg.connect(conString,function(err,client,done){
		client.query('SELECT sp_eliminar_concepto($1)',[req.params.id],function(err,result){
			if(err) conString.error(err.message);
			else console.log(result);
			res.redirect('/viewFacturas');
		});
	});
});

module.exports = router;