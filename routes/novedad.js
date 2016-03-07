var express = require('express');
var router = express.Router();
var pg = require('pg');
//--------------------------------------
var PDFDocument = require('pdfkit');
var blobStream = require('blob-stream');
var fs = require('fs');
//--------------------------------------
var conString = require('../connect');
var informacion,detalleFactura,concepto;


router.get('/add/:id/novedad',nocache,muestraInformacion,muestraDetallada,muestraConceptos,function(req,res,next){
   
  if(req.session.name)
  {
    try
    {  
      
      var doc = new PDFDocument({margin:0});                
      //doc.addPage({margin:0});
      doc.pipe(fs.createWriteStream('facturas/'+detalleFactura.no_factura+'.pdf')); 
      doc.image('public/images/logomazatas1.jpg',15,5,{width:110});
      doc.image('public/images/LOGOBB.jpg',10,200,{width:130});
       // Modificar william
      doc.lineCap('butt').moveTo(5,5).lineTo(610,5).stroke();
      doc.lineCap('butt').moveTo(5,5).lineTo(5,270).stroke();
      doc.lineCap('butt').moveTo(5,245).lineTo(430,245).stroke();
      doc.lineCap('butt').moveTo(160,5).lineTo(160,245).stroke();
      doc.lineCap('butt').moveTo(5,125).lineTo(610,125).stroke();
      doc.lineCap('butt').moveTo(5,80).lineTo(610,80).stroke();
      doc.lineCap('butt').moveTo(160,50).lineTo(610,50).stroke();
      doc.lineCap('butt').moveTo(160,65).lineTo(610,65).stroke();
      doc.lineCap('butt').moveTo(5,95).lineTo(610,95).stroke();
      doc.lineCap('butt').moveTo(5,110).lineTo(430,110).stroke();
      doc.lineCap('butt').moveTo(5,140).lineTo(610,140).stroke();
      doc.lineCap('butt').moveTo(5,155).lineTo(610,155).stroke();
      doc.lineCap('butt').moveTo(5,170).lineTo(160,170).stroke();
      doc.lineCap('butt').moveTo(5,185).lineTo(160,185).stroke();
      doc.lineCap('butt').moveTo(5,200).lineTo(160,200).stroke();
      doc.lineCap('butt').moveTo(160,225).lineTo(430,225).stroke();
      doc.lineCap('butt').moveTo(430,20).lineTo(610,20).stroke();
      doc.lineCap('butt').moveTo(430,35).lineTo(610,35).stroke();
      doc.lineCap('butt').moveTo(430,170).lineTo(610,170).stroke();
      doc.lineCap('butt').moveTo(430,185).lineTo(610,185).stroke();
      doc.lineCap('butt').moveTo(430,200).lineTo(610,200).stroke();
      doc.lineTo('butt').moveTo(430,215).lineTo(610,215).stroke();
      doc.lineCap('butt').moveTo(130,140).lineTo(130,185).stroke();
      doc.lineCap('butt').moveTo(325,95).lineTo(325,155).stroke();
      doc.lineCap('butt').moveTo(305,110).lineTo(305,140).stroke();
      doc.lineCap('butt').moveTo(400,95).lineTo(400,140).stroke();
      doc.lineCap('butt').moveTo(510,80).lineTo(510,95).stroke();
      doc.lineCap('butt').moveTo(510,200).lineTo(510,215).stroke();
      doc.lineCap('butt').moveTo(5,265).lineTo(610,265).stroke();
      doc.lineCap('butt').moveTo(235,80).lineTo(235,95).stroke();
      doc.lineCap('butt').moveTo(325,80).lineTo(325,95).stroke();
      doc.lineCap('butt').moveTo(610,5).lineTo(610,265).stroke();
      doc.lineCap('butt').moveTo(430,5).lineTo(430,265).dash(5).stroke();

      // Modificar william            
      //BASE DE DATOS
      doc.text(detalleFactura.total_consumo,285,233);
      doc.text(detalleFactura.total_consumo,285,233);
      doc.text(detalleFactura.total_consumo,432,113);
      doc.text(detalleFactura.total_consumo,432,238);
      doc.text(detalleFactura.no_factura,90,83);
      doc.text(detalleFactura.no_factura,540,84);
      doc.text(detalleFactura.no_factura,540,203);
      doc.text(detalleFactura.nuid,190,87);
      doc.text(detalleFactura.nuid,454,84);
      doc.text(detalleFactura.nuid,454,203);
      doc.text(detalleFactura.codigo_medidor,386,87);
      doc.text(detalleFactura.nombre_titular,210,53);
      doc.text(detalleFactura.nombre_titular,454,158);
      doc.text(detalleFactura.nombre_titular,454,38);
      doc.text(detalleFactura.direccion,214,68);
      doc.text(detalleFactura.direccion,460,53);
      doc.text(detalleFactura.direccion,460,175);
      doc.text(detalleFactura.periodo_facturacion,80,98);
      doc.text(detalleFactura.periodo_facturacion,475,189);
      doc.text(detalleFactura.periodo_facturacion,475,69);
      doc.text(detalleFactura.cargo_fijo,75,129);
      doc.text(detalleFactura.cargo_fijo,325,160);
      doc.text(detalleFactura.cargo_basico,132,145);
      doc.text(detalleFactura.cargo_complementario,132,160);
      doc.text(detalleFactura.cargo_suntuario,132,175);
      doc.text(detalleFactura.lectura_anterior,402,100);
      doc.text(detalleFactura.lectura_actual,402,115);
      doc.text(detalleFactura.consumo,402,130);
      doc.text(detalleFactura.valor_consumo,325,175);
      doc.text(detalleFactura.fecha_vencimiento,98,189);
      doc.text(detalleFactura.numero_estrato,300,83);


            // TITULOS
      doc.fontSize(12);
      doc.text('BANCO',445,9);
      doc.text('ACUEDUCTO',440,128);
      doc.fontSize(9);
      doc.text('FACTURA No:',12,86);
      doc.text('NUID:',164,85);
      doc.text('ESTRATO:',237,86),
      doc.text('N.MEDIDOR:',329,85); 
      doc.fontSize(7);  
      doc.text('NUID:',432,87);
      doc.text('factura:',511,87);
      doc.fontSize(7);
      doc.text('MES FACTURADO:',12,100);
      doc.font('Times-Roman',9);
      doc.text('DATOS DEL CONSUMO',200,100);
      doc.fontSize(9);
      doc.text('LEC.ANTERIOR:',327,100);
      doc.font('Times-Roman',10);
      doc.text('TARIFAS GENERALES',30,115);
      doc.fontSize(9);
      doc.text('MEDICION POR CONSUMO',162,115);
      doc.text('LEC.ACTUAL',327,115);
      doc.fontSize(11);
      doc.text('TOTAL A PAGAR',433,98);
      doc.fontSize(9);
      doc.text('CARGO FIJO:',12,130);
      doc.text('MEDICION POR PROMEDIO',162,130);
      doc.text('CONSUMO M3',327,130);
      doc.text('ACUEDUCTO MAZATAS',435,145);
      doc.fontSize(7);
      doc.text('C.BASICO=0 a 20 m3',12,145);
      doc.fontSize(10);
      doc.text('CONCEPTO',210,145);
      doc.text('VALOR',340,145);
      doc.fontSize(7);
      doc.text('nombre',432,160);
      doc.fontSize(7);
      doc.text('C.COMPLEMENTARIO=21 a 40 m3',12,160);
      doc.fontSize(10);
      doc.text('CARGO FIJO',165,160);
      doc.fontSize(7);
      doc.text('direccion',432,175);
      doc.fontSize(7);
      doc.text('C.SUNTUARIO=41 m3 hacia adelante',12,175);
      doc.fontSize(10);
      doc.text('VALOR CONSUMO',165,175);
      doc.fontSize(7);
      doc.text('mes facturado:',432,190);
      doc.fontSize(7);
      doc.text('FECHA LIMITE DE PAGO',12,190);
      doc.fontSize(10);
      doc.text('OTROS COBROS',165,190);
      doc.fontSize(7);
      doc.text('NUID:',432,207);
      doc.text('factura:',511,207);
      doc.fontSize(10);
      doc.text('TOTAL A PAGAR:',162,233);
      doc.fontSize(11);
      doc.text('TOTAL A PAGAR',433,218);
      doc.fontSize(9);
      doc.text('NOMBRE:',162,55);
      doc.text('DIRECCION:',162,70);
      doc.text('ACUEDUCTO MAZATAS',435,25);
      doc.fontSize(7);
      doc.text('nombre',432,40);
      doc.text('direccion',432,55);
      doc.text('mes facturado',432,70);
      doc.font('Times-Roman',13);
      doc.text('ASOCIACION DE USUARIOS DE SERVICIOS',164,15);
      doc.text('PUBLICOS DOMICILIARIOS DE MAZATAS',166,28);
      //
      doc.end();
    }
    catch(e)
    {
      console.error(e.message());
    }
    res.render('viewFacturacion/novedad',{
      Session:informacion,
      Detalle:detalleFactura,
      Concepto:concepto
    });
  }
  else res.redirect('/');
});
/*
router.get('/print/:id',muestraInformacion,muestraDetallada,muestraConceptos,function(req,res,next){
  var doc = new PDFDocument({margin:0});
  var stream = doc.pipe(blobStream());
    // Modificar william
    doc.lineCap('butt').moveTo(5,5).lineTo(610,5).stroke();
    doc.lineCap('butt').moveTo(5,5).lineTo(5,270).stroke();
    doc.lineCap('butt').moveTo(5,245).lineTo(430,245).stroke();
    doc.lineCap('butt').moveTo(160,5).lineTo(160,245).stroke();
    doc.lineCap('butt').moveTo(5,125).lineTo(610,125).stroke();
    doc.lineCap('butt').moveTo(5,80).lineTo(610,80).stroke();
    doc.lineCap('butt').moveTo(160,50).lineTo(610,50).stroke();
    doc.lineCap('butt').moveTo(160,65).lineTo(610,65).stroke();
    doc.lineCap('butt').moveTo(5,95).lineTo(610,95).stroke();
    doc.lineCap('butt').moveTo(5,110).lineTo(430,110).stroke();
    doc.lineCap('butt').moveTo(5,140).lineTo(610,140).stroke();
    doc.lineCap('butt').moveTo(5,155).lineTo(610,155).stroke();
    doc.lineCap('butt').moveTo(5,170).lineTo(160,170).stroke();
    doc.lineCap('butt').moveTo(5,185).lineTo(160,185).stroke();
    doc.lineCap('butt').moveTo(5,200).lineTo(160,200).stroke();
    doc.lineCap('butt').moveTo(160,225).lineTo(430,225).stroke();
    doc.lineCap('butt').moveTo(430,20).lineTo(610,20).stroke();
    doc.lineCap('butt').moveTo(430,35).lineTo(610,35).stroke();
    doc.lineCap('butt').moveTo(430,170).lineTo(610,170).stroke();
    doc.lineCap('butt').moveTo(430,185).lineTo(610,185).stroke();
    doc.lineCap('butt').moveTo(430,200).lineTo(610,200).stroke();
    doc.lineTo('butt').moveTo(430,215).lineTo(610,215).stroke();
    doc.lineCap('butt').moveTo(130,140).lineTo(130,185).stroke();
    doc.lineCap('butt').moveTo(325,95).lineTo(325,155).stroke();
    doc.lineCap('butt').moveTo(305,110).lineTo(305,140).stroke();
    doc.lineCap('butt').moveTo(400,95).lineTo(400,140).stroke();
    doc.lineCap('butt').moveTo(510,80).lineTo(510,95).stroke();
    doc.lineCap('butt').moveTo(510,200).lineTo(510,215).stroke();
    doc.lineCap('butt').moveTo(5,265).lineTo(610,265).stroke();
    doc.lineCap('butt').moveTo(235,80).lineTo(235,95).stroke();
    doc.lineCap('butt').moveTo(325,80).lineTo(325,95).stroke();
    doc.lineCap('butt').moveTo(610,5).lineTo(610,265).stroke();
    doc.lineCap('butt').moveTo(430,5).lineTo(430,265).dash(5).stroke();
    // Modificar william
    //BASE DE DATOS
    doc.text(detalleFactura.total_consumo,285,233);
    doc.text(detalleFactura.total_consumo,285,233);
    doc.text(detalleFactura.total_consumo,432,113);
    doc.text(detalleFactura.total_consumo,432,238);
    doc.text(detalleFactura.no_factura,90,83);
    doc.text(detalleFactura.no_factura,540,84);
    doc.text(detalleFactura.no_factura,540,203);
    doc.text(detalleFactura.nuid,184,83);
    doc.text(detalleFactura.nuid,454,84);
    doc.text(detalleFactura.nuid,454,203);
    doc.text(detalleFactura.codigo_medidor,380,83);
    doc.text(detalleFactura.nombre_titular,210,53);
    doc.text(detalleFactura.nombre_titular,454,158);
    doc.text(detalleFactura.nombre_titular,454,38);
    doc.text(detalleFactura.direccion,214,68);
    doc.text(detalleFactura.direccion,460,53);
    doc.text(detalleFactura.direccion,460,175);
    doc.text(detalleFactura.periodo_facturacion,80,98);
    doc.text(detalleFactura.periodo_facturacion,475,189);
    doc.text(detalleFactura.periodo_facturacion,475,69);
    doc.text(detalleFactura.cargo_fijo,75,129);
    doc.text(detalleFactura.cargo_fijo,325,160);
    doc.text(detalleFactura.cargo_basico,132,145);
    doc.text(detalleFactura.cargo_complementario,132,160);
    doc.text(detalleFactura.cargo_suntuario,132,175);
    doc.text(detalleFactura.lectura_anterior,402,100);
    doc.text(detalleFactura.lectura_actual,402,115);
    doc.text(detalleFactura.consumo,402,130);
    doc.text(detalleFactura.valor_consumo,325,180);
    doc.text(detalleFactura.fecha_vencimiento,98,189);
    doc.text(detalleFactura.numero_estrato,300,83);


    // TITULOS
    doc.fontSize(12);
    doc.text('BANCO',445,9);
    doc.text('ACUEDUCTO',440,128);
    doc.fontSize(9);
    doc.text('FACTURA No:',12,85);
    doc.text('NUID:',162,85);
    doc.text('ESTRATO:',237,85),
        doc.text('N.MEDIDOR:',327,85);
    doc.fontSize(7);
    doc.text('NUID:',432,87);
    doc.text('factura:',511,87);
    doc.fontSize(7);
    doc.text('MES FACTURADO:',12,100);
    doc.font('Times-Roman',9);
    doc.text('DATOS DEL CONSUMO',200,100);
    doc.fontSize(9);
    doc.text('LEC.ANTERIOR:',327,100);
    doc.font('Times-Roman',10);
    doc.text('TARIFAS GENERALES',30,115);
    doc.fontSize(9);
    doc.text('MEDICION POR CONSUMO',162,115);
    doc.text('LEC.ACTUAL',327,115);
    doc.fontSize(11);
    doc.text('TOTAL A PAGAR',433,98);
    doc.fontSize(9);
    doc.text('CARGO FIJO:',12,130);
    doc.text('MEDICION POR PROMEDIO',162,130);
    doc.text('CONSUMO M3',327,130);
    doc.text('ACUEDUCTO MAZATAS',435,145);
    doc.fontSize(7);
    doc.text('C.BASICO=0 a 20 m3',12,145);
    doc.fontSize(10);
    doc.text('CONCEPTO',210,145);
    doc.text('VALOR',340,145);
    doc.fontSize(7);
    doc.text('nombre',432,160);
    doc.fontSize(7);
    doc.text('C.COMPLEMENTARIO=21 a 40 m3',12,160);
    doc.fontSize(10);
    doc.text('CARGO FIJO',165,160);
    doc.fontSize(7);
    doc.text('direccion',432,175);
    doc.fontSize(7);
    doc.text('C.SUNTUARIO=41 m3 hacia adelante',12,175);
    doc.fontSize(10);
    doc.text('VALOR CONSUMO',165,175);
    doc.fontSize(7);
    doc.text('mes facturado:',432,190);
    doc.fontSize(7);
    doc.text('FECHA LIMITE DE PAGO',12,190);
    doc.fontSize(10);
    doc.text('OTROS COBROS',165,190);
    doc.fontSize(7);
    doc.text('NUID:',432,207);
    doc.text('factura:',511,207);
    doc.fontSize(10);
    doc.text('TOTAL A PAGAR:',162,233);
    doc.fontSize(11);
    doc.text('TOTAL A PAGAR',433,218);
    doc.fontSize(9);
    doc.text('NOMBRE:',162,55);
    doc.text('DIRECCION:',162,70);
    doc.text('ACUEDUCTO MAZATAS',435,25);
    doc.fontSize(7);
    doc.text('nombre',432,40);
    doc.text('direccion',432,55);
    doc.text('mes facturado',432,70);
    doc.font('Times-Roman',13);
    doc.text('ASOCIACION DE USUARIOS DE SERVICIOS',164,15);
    doc.text('PUBLICOS DOMICILIARIOS DE MAZATAS',166,28);
    //
    stream.on('finish', function() {
      // get a blob
      var blob = stream.toBlob('application/pdf');
      // or get a blob URL
      var url = stream.toBlobURL('application/pdf');
      iframe.src= url;
      window.open(url);
    });
});
*/
router.get('/pdf/:id', function(req,res,next){
  var tempFile='facturas/'+req.params.id+'.pdf';
  fs.readFile(tempFile, function (err,data){
    res.contentType("application/pdf");
    res.send(data);
  });
  //fs.unlinkSync(tempFile);
});


/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*METHOD POST*/
router.post('/add/:id/novedad',function(req,res)
{
  var paramasNovedad =
  [
    req.body.tb_concepto,
    parseInt(req.body.tb_valor),
    parseInt(req.params.id)
  ];
  pg.connect(conString,function(err,client,done)
  {
    client.query('SELECT SP_AGREGAR_CONCEPTO($1,$2,$3)',paramasNovedad,function(err,result){
      try{console.log(result);}
      catch(e){console.error(e);}
      finally{res.redirect('/add/'+req.params.id+'/novedad?_method=ADDNOVEDAD');}
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

function muestraDetallada(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_DETALLE_FACTURA($1)',[req.params.id],function(err,result){
      try{detalleFactura = result.rows[0];}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}

function muestraConceptos(req,res,next)
{
  pg.connect(conString,function(err,client,done){
    client.query('SELECT * FROM SP_MOSTRAR_CONCEPTOS($1)',[req.params.id],function(err,result){
      try{concepto = result.rows;}
      catch(e){console.error(e);}
      finally{done();next();}
    });
  });
}