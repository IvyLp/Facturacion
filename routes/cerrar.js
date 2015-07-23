var express = require('express');
var router = express.Router();

router.get('/Logoff',nocache,function(req,res,next){
	console.log('muestra error');
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
function nocache(req, res, next) 
{
   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
   res.header('Expires', '-1');
   res.header('Pragma', 'no-cache');
   next();
}