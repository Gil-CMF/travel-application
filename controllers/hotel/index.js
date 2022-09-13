const { v4: uuidv4 } = require('uuid');
const dbConnection = require('../../helpers/database');
let hotels = {}

const listAllHotels = async (req, res) => {
    try {
        req.logger.debug('Fetching all the hotel information');
        const db = await dbConnection;
        const result = await db.execute('SELECT * FROM hotels;');
        res
          .status(200)
          .json({
              data: result[0]
          })
    } catch (err) {
        req.logger.error('Error fetching hotels ', err);
        throw err;
    }
}
   
   
const getHotelDetailInformation = async (req, res) => {
    let hotelId = '';
    try {
        const hotelId = req.params.hotelId;
        req.logger.debug('Fetching detailed information about the hotel for id ', hotelId);
        const db = await dbConnection;
        const result = await db.execute(`SELECT * FROM hotels WHERE hotel_id = ?`, [hotelId]);
        res
          .status(200)
          .json({
              data: result[0]
          });
    } catch (err) {
        req.logger.error(`Error fetching hotel detail info with id ${hotelId}`, err);
        throw err;
    }
}
    
const createHotelInformation = async (req, res) => {
    try {
        const hotelId = uuidv4();
        const hotelObj = {
            hotel_id: hotelId,
            name: req.body.name,
            description: req.body.description,
            cover_image_url: '',
            amenities: req.body.amenities,
            address: req.body.address,
            is_published: false,
            guest_capacity: req.body.guest_capacity,
            hotel_type: req.body.hotel_type,
            added_by: '056a3ce0-dc51-4c26-88fe-809a5a7a48b4'
        };

        const dataArr = [
          hotelObj.hotel_id,
          hotelObj.name,
          hotelObj.description,
          hotelObj.cover_image_url,
          hotelObj.amenities,
          hotelObj.address,
          hotelObj.is_published,
          hotelObj.guest_capacity,
          hotelObj.hotel_type,
          hotelObj.added_by
        ];

        req.logger.debug('Creating hotel with info ', hotelObj);
        const db = await dbConnection;
        const result = await db.execute(
          `INSERT INTO hotels(hotel_id, name, description, cover_image_url, amenities, address, is_published, guest_capacity, hotel_type, added_by)
          VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          dataArr);

        if (result[0].affectedRows > 0) {
          req.logger.debug('Hotel created successfully ');
          res
          .status(200)
          .json({
              message: 'Hotel created successfully',
              data: hotelObj
          });
        } else {
          throw new Error(`Unable to create hotel information `)
        }
    } catch (err) {
        req.logger.error('Error: ', err);
        throw err;
    }
}

const updateHotelInformation = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
        const hotelObj = {
            name: req.body.name,
            description: req.body.description,
            amenities: req.body.amenities,
            guest_capacity: req.body.guest_capacity,
            hotel_type: req.body.hotel_type,
            address: req.body.address
        };
        req.logger.debug('Updating hotel with info ', hotelObj);

        const db = await dbConnection;
        const result = await db.execute(
          'UPDATE hotels SET name = ?, description = ?, amenities = ?, guest_capacity = ?, hotel_type = ?, address = ? WHERE hotel_id = ?',
          [hotelObj.name, hotelObj.description, hotelObj.amenities, hotelObj.guest_capacity, hotelObj.hotel_type, hotelObj.address, hotelId]);

        if (result[0].affectedRows > 0) {
          req.logger.debug('Hotel updated successfully ');
          res
          .status(200)
          .json({
              message: 'Hotel updated successfully',
          });
        } else {
          throw new Error(`Unable to update hotel information for id ${hotelId}`)
        }
    } catch (err) {
        req.logger.error(`Error: `, err);
        throw err;
    }
}


   
const publishHotelInformation = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
        req.logger.debug('Publishing hotel info for id ', hotelId);

        const db = await dbConnection;
        const result = await db.execute('UPDATE hotels SET is_published = true WHERE hotel_id = ?', [hotelId]);
        if (result[0].affectedRows > 0) {
          req.logger.debug('Hotel published successfully ');
          res
          .status(200)
          .json({
              message: 'Hotel published successfully'
          });
        } else {
          throw new Error(`Unable to publish hotel information for id ${hotelId}`)
        }
    } catch (err) {
        req.logger.error(`Error: `, err);
        throw err;
    }
}
   

   
const removeHotelInformation = async (req, res) => {
    let hotelId = '';
    try {
        hotelId = req.params.hotelId;
        req.logger.debug('Deleting hotel info with id ', hotelId);

        const db = await dbConnection;
        const result = await db.execute('DELETE FROM hotels WHERE hotel_id = ?', [hotelId]);
        if (result[0].affectedRows > 0) {
          req.logger.debug('Hotel deleted successfully ');
          return res
          .status(200)
          .json({
              message: 'Hotel deleted successfully'
          });
        } else {
          throw new Error(`Unable to remove hotel information for id ${hotelId}`)
        }
    } catch (err) {
        req.logger.error(`Error: `, err);
        throw err;
    }
}

const internalHelperFunc = (req, res) => {
    res.json({
        message: 'Sensitive info'
    })
}

module.exports = {
    listAllHotels,
    getHotelDetailInformation,
    createHotelInformation,
    updateHotelInformation,
    publishHotelInformation,
    removeHotelInformation
};