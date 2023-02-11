const asyncHandler = require('express-async-handler');
const User = require('../models/user-model')
const Website = require('../models/website-model')
const axios = require("axios");
const updateCarbonEmission = asyncHandler(async (req, res) => {
    const { url } = req.body;
    console.log(url)
    axios.get(`https://api.websitecarbon.com/site?url=${url}`)
        .then(async function (response) {
            // handle success
            const data = response.data
            console.log(data)
            const mainUrl = new URL(url).hostname
            let website = await Website.findOne({ url: mainUrl })
            if (!website) {
                website = await Website.create({
                    url: mainUrl,
                    carbonEmitted: data.statistics.co2.grid.grams,
                    energyUsed: data.statistics.energy
                })
            } else {
                website.carbonEmitted += data.statistics.co2.grid.grams
                website.energyUsed += data.statistics.energy
                await website.save()
            }
            res.send(website)
        })
        .catch(function (error) {
            // handle error
            res.send(error)
        })
})

module.exports = { updateCarbonEmission }