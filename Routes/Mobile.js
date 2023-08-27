const routers=require('express').Router();
const mobilecontroller= require('../Controller/mobilecontroller')

routers.post('/mobiles',mobilecontroller.mobileadd);

routers.get('/mobiles',mobilecontroller.mobilelist);

routers.get('/mobiles/:id',mobilecontroller.mobileget);


routers.put('/mobiles/:id',mobilecontroller.mobileupdate);

routers.delete('/mobiles/:id',mobilecontroller.mobiledelte)






module.exports = routers