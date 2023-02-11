const asyncHandler = require('express-async-handler');
const User = require('../models/user-model')
const Website = require('../models/website-model')
const axios = require("axios");
const updateCarbonEmission = asyncHandler(async (req, res) => {
    const { url, user } = req.body;
    if (url.length > 30) {
        return
    }
    axios.get(`https://api.websitecarbon.com/site?url=${url}`)
        .then(async function (response) {
            // handle success
            const data = response.data
            // console.log(data)
            const mainUrl = new URL(url).hostname
            let website = await Website.findOne({ url: mainUrl, userid: user.userId })
            if (website === null) {
                website = await Website.create({
                    userid: user.userId,
                    url: mainUrl,
                    carbonEmitted: data.statistics.co2.grid.grams,
                    energyUsed: data.statistics.energy
                })
            } else {
                website.carbonEmitted += data.statistics.co2.grid.grams
                website.energyUsed += data.statistics.energy
                await website.save()
            }
            console.log(website)
            res.send(website)
        })
        .catch(function (error) {
            // handle error
            console.log(error)
            res.send(error)
        })
})

const myCarbon = asyncHandler(async (req, res) => {
    const { user } = req.body
    console.log(req.body)
    const mySites = await Website.find({
        userid: user.userId
    })
    res.send(mySites)
})

module.exports = { updateCarbonEmission, myCarbon }