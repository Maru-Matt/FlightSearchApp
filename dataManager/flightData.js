import express from 'express';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://cluster0:matt@cluster0.aqcg8oz.mongodb.net/FlightDB", {useNewUrlParser: true});

const flightSchema = {
    cityFrom: String, 
    cityTo: String, 
    dateFrom: String, 
    dateTo: String, 
    flightPrice: Number,
    link: String,
    ID: String
}
const Flight = mongoose.model("Flight", flightSchema);

// Page for user input
export const getUserData = function(req, res){
    res.render('userInput');
};

// Flight Information
export const addFlightInfo = function(req, res){

    // Find Flight Price 
    const option = 
    {
        method: 'GET', 
        url: 'https://api.tequila.kiwi.com/v2/search?',
        params: {
            fly_from: req.body.cityFrom,
            fly_to: req.body.cityTo,
            date_from:(`${(req.body.dateFrom).toString().split('-')[2]}/${(req.body.dateFrom).toString().split('-')[1]}/${(req.body.dateFrom).toString().split('-')[0]}`),
            date_to: (`${(req.body.dateTo).toString().split('-')[2]}/${(req.body.dateTo).toString().split('-')[1]}/${(req.body.dateTo).toString().split('-')[0]}`),
            curr: "USD",
            price_to: req.body.maxPrice,
            limit: 2
        },

        headers: 
        { 
            "apikey": 'pILSQEtm8ntNLtu1LbAAoi5HWJYUdL1K'} 
        };
        
    // Store User Input and Flight Price to Database
    axios.request(option).then(function (response) {
        const cityFrom = response.data.data[0].cityFrom;
        const cityTo = response.data.data[0].cityTo;
        const dateFrom = req.body.dateFrom;
        const dateTo = req.body.dateTo;
        const flightPrice = response.data.data[0].price;
        const link = response.data.data[0].deep_link;

        const newFlight = new Flight({
        cityFrom: cityFrom,
        cityTo: cityTo,
        dateFrom: dateFrom,
        dateTo: dateTo,
        flightPrice: flightPrice, 
        ID: uuidv4()
    })
    newFlight.save();
    res.render('display', {cityFrom: cityFrom, cityTo: cityTo, dateFrom: dateFrom, dateTo: dateTo, flightPrice: flightPrice, link: link})
    
    }).catch(function (error) {
        console.error(error);
    });
}




