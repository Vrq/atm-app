const fetch = require('isomorphic-unfetch')

module.exports = {
    getAtmsWithinRadius: async (req, res) => {
        const METERS_IN_MILE = 1609.34
        const long = req.params.longitude
        const lat = req.params.latitude
        const radiusInMeters = req.params.radius
        const radiusInFullMiles = Math.floor(radiusInMeters / METERS_IN_MILE)
        
        const HSBC_API_URI = "https://api.hsbc.com/x-open-banking/v2.1/atms/geo-location/lat/" + lat + "/long/" + long + "?radius=" + radiusInFullMiles

        const atmResponse = await fetch(HSBC_API_URI)
        if (atmResponse.ok) {
            const atmResponseBody = await atmResponse.json()
            res.status(200).send(atmResponseBody)
        } else {
            console.log("Failed to ATM data")
            res.status(500).send("Problem with fetching ATM data")
        }
    }
};