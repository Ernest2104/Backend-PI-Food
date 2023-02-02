const { Router } = require('express');
const { Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
//const json = require('./recipes.json')

const router = Router();

router.get('/', async (req, res) => {
    await Diet.findOrCreate({where: { name: 'All' }});
    const dietsApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&offset=0&number=100`);
    const diets = await dietsApi.data.results.map(d => d.diets)
    //const diets = json.results.map(r => r.diets)
    const arrayDiets = diets.join().split(',');
    const filteredDiets = [...new Set(arrayDiets)]

    filteredDiets.forEach(d => {
        if(d !== ""){
            Diet.findOrCreate({
                where: { name: d.replace(/\b\w/g, l => l.toUpperCase()) }
            })
        }
    })
    const allDiets = await Diet.findAll();
    res.send(allDiets);
});

// router.get('/', async (req,res) => {
//     const diets = ['All', 'Gluten Free', 'Ketogenic','Vegetarian','Lacto Vegetarian','Lacto Ovo Vegetarian',
//     'Vegan', 'Pescatarian', 'Paleolithic', 'Primal', 'Whole 30'];
//         diets.forEach(d => {
//             Diet.findOrCreate({
//                 where: { name: d }
//             })
//         })
//         const allDiets = await Diet.findAll();
//         res.send(allDiets);
// });

module.exports = router;
