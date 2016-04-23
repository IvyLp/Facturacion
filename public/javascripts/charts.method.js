var column = function()
{
	return {
		chart: {
	     type: 'column',
	     options3d: {
	      enabled: true,
	      alpha: 0,
	      beta: 0,
	      depth: 20
	     }
	    },
	    title: {
	     text: 'Consumos en metros cubicos'
	    },
	    subtitle: {
	     text: 'Año 2016'
	    },
	    plotOptions: {
	     column: {
	      depth: 25
	     }
	    },
	    xAxis: {
	     categories: []
	    },
	    yAxis: {
	     title: {
	      text: null
	     }
	    },
	    series: [{
	     name: 'Consumos',
	     data: []
	    }]
	}
};