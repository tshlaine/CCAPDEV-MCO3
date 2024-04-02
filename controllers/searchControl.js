import Review from "../models/Review.js";
import Restaurant from "../models/Restaurant.js";

const searchControl = {
    async showSearch(req, res) {
        const search = req.body.search;
        var queryForResto = {};
        var queryForRev = {};

        if (search) {
            // RESTAURANT QUERY
            queryForResto.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];

            // REVIEW QUERY
            queryForRev.$or = [
                { postTitle: { $regex: search, $options: 'i' }},
                { description: { $regex: search, $options: 'i' }},
            ];
        }

        try{
            const restoResult = await Restaurant.find(queryForResto);
            const revResult = await Review.find(queryForRev);
            res.render('search-result', {restaurants: JSON.stringify(restoResult), reviews: JSON.stringify(revResult), search: search});
        } catch(err){
            console.log(err);
        }
    },

    async filterControl (req, res){
        const selectedOption = parseFloat(req.body.filterText);
        const search = req.body.searchQuery;

        var queryForResto = {};
        var queryForFilter = {};
        if (search) {
            queryForResto.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
            queryForFilter.$and = [
                queryForResto,
                { aveRating: { $gte: selectedOption } },
            ];
        }
        else{
            queryForFilter = { aveRating: { $gte: selectedOption } };
        }
        
        try {
            const filteredRestaurants = await Restaurant.find(queryForFilter);
            console.log(filteredRestaurants);
            res.json(filteredRestaurants);
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to retrieve filtered restaurants.');
        }
    }


}

export default searchControl;