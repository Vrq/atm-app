const fetch = require('isomorphic-unfetch')

module.exports = {
    getAtmsWithinRadius: (req, res) => {
        const METERS_IN_MILE = 1609.34
        const long = req.params.longitude
        const lat = req.params.latitude
        const radiusInMeters = req.params.radius
        const radiusInFullMiles = Math.floor(radiusInMeters/METERS_IN_MILE)
        console.log("full miles" + radiusInFullMiles)
        fetch("https://api.hsbc.com/x-open-banking/v2.1/atms/geo-location/lat/" + lat + "/long/" + long + "?radius=" + radiusInFullMiles, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then((atmResponse) => {
            if (atmResponse.ok) {
                atmResponse.json().then(atmResponseBody => {
                    res.send(atmResponseBody)
                });
            } else {
                console.log("Failed to fetch atms")
            }
        })


    }
};