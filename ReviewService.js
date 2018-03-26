import axios from 'axios';

const svc = {}
svc.getProductReviews = getProductReviews;
svc.validateReview =  validateReview;
svc.createReview = createReview;

// returns a list of all reviews about a product
function getProductReviews(productId) {
	return Promise.resolve(axios.get(process.env.API_URL + 'get-product-reviews/' + String(productId)))
}

// use to determine weather customer has previously purchased item and is allowed to create a review.
// NOTE create review will also validate customers, but this can be used to alert customer they cannot write a review before they create one.

function validateReview(customerEmail, productId){
    return Promise.resolve(axios.post(process.env.API_URL + 'validate-review/', {customer_email: customerEmail ,product_id: productId}))
}

function createReview(review){

// Sample review below
// const review = {prodct_id: "prod_CCDBCRzlKEEp7V",
// 	              star_rating: 3.5,
// 	              review_title: "LOVE THIS WATCH",
// 	              review_message: "message about how great this f'in watch is ",
// 								customer_email: "greg711millers@gmail.com",
// 								friend_recommendation: true,
// 								friend_recommendation_rating: 1,
// 								friend_recommendation_message: "I would recommend this to my friend becasue it is awesome"
//             }
 return Promise.resolve(axios.post(process.env.API_URL + 'create-review/', {product_id: review.prodct_id, star_rating: review.star_rating, review_title: review.review_title, review_message: review.review_message, customer_email: review.customer_email,friend_recommendation: review.friend_recommendation, friend_recommendation_rating: review.friend_recommendation_rating, friend_recommendation_message: review.friend_recommendation_message }))
}


export default svc
