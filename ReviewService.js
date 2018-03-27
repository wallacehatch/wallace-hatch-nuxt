import axios from 'axios';

const svc = {}
svc.getProductReviews = getProductReviews;
svc.validateReview =  validateReview;
svc.createReview = createReview;

// returns a list of all reviews about a product
function getProductReviews(productId) {
	return Promise.resolve(axios.get(process.env.API_URL + 'get-product-reviews/' + String(productId)))
}

// use to determine weather customer has previously purchased item and is allowed to create a review
function validateReview(customerId, productId){
    return Promise.resolve(axios.post(process.env.API_URL + 'validate-review/', {customerId, productId}))
}

function createReview(review){
// Sample review below
// const review = {prodct_id: "prod_CCDBCRzlKEEp7V",
//               star_rating: 3.5,
//               review_title: "LOVE THIS WATCH",
//               review_message: "message about how great this f'in watch is ",
//               customer_id: "cus_CLeyoSgOmQdiDf",
//             }
 return Promise.resolve(axios.post(process.env.API_URL + 'create-review/', review))
}

export default svc
