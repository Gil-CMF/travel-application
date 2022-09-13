 
	const express = require('express')
	const router = express.Router();
	const authenticateUsers = require('../../middlewares');
	const hotel = require('../../controllers/hotel')
	

	/// public endpoints
	router.get('/', hotel.listAllHotels);
	router.get('/:hotelId', hotel.getHotelDetailInformation);

	/// private endpoints
	router.use(authenticateUsers);

	router.post('/', hotel.createHotelInformation);
	router.put('/:hotelId', hotel.updateHotelInformation);
	router.patch('/:hotelId', hotel.publishHotelInformation);
	router.delete('/:hotelId', hotel.removeHotelInformation);

	module.exports = router;
   