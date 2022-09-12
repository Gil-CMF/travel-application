
	const express = require('express')
	const router = express.Router({ mergeParams: true });

	const getAllRooms = (req, res) => {
	    res.json({
	        message: 'Fetching all the rooms of a hotel'
	    })
	}


	const createRoom = (req, res) => {
	    res.json({
	        message: 'Creating a room of hotel'
	    })
	}
	

	const getRoomDetailInformation = (req, res) => {
		console.log('#################################', req.params)
	    res.json({
	        message: 'Fetching a detail information about room of hotel'
	    })
	}


	const updateRoomInformation = (req, res) => {
	    res.json({
	        message: 'Updating room information of hotel'
	    })
	}
	

	const deleteRoom = (req, res) => {
	    res.json({
	        message: 'Removing room of hotel'
	    })
	}

	module.exports = {
        getAllRooms,
        createRoom,
        getRoomDetailInformation,
        updateRoomInformation,
        deleteRoom
    };

