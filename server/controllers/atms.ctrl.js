const fetch = require('isomorphic-unfetch')

module.exports = {
    getAtmsWithinRadius: (req, res) => {
        const long = req.params.longitude
        const lat = req.params.latitude
        const radius = req.params.radius

        fetch("https://api.hsbc.com/x-open-banking/v2.2/atms/geo-location/lat/" + lat + "/long/" + long + "?radius=" + radius, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then((atmResponse) => {
            if (atmResponse.ok) {
                atmResponse.json().then(atmResponseBody => {
                    console.log(atmResponseBody)
                    res.send(atmResponseBody)
                });
            } else {
                console.log("Failed to fetch atms")
            }
        })


    }
};