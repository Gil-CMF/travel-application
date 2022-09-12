
	const express = require('express')
	const router = express.Router({ mergeParams: true });
	const room = require('../../controllers/room')

	router.get('/', room.getAllRooms);


	router.post('/', room.createRoom);


	router.get('/:roomId', room.getRoomDetailInformation);

	const updateRoomInformation = (req, res) => {
	    res.json({
	        message: 'Updating room information of hotel'
	    })
	}
	router.put('/:roomId', updateRoomInformation);

	const deleteRoom = (req, res) => {
	    res.json({
	        message: 'Removing room of hotel'
	    })
	}
	router.delete('/:roomId', deleteRoom);

	module.exports = router;

