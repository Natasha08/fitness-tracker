export const appleResults = {
  "foods": [{
    'food_name': 'apple',
    'brand_name': null,
    'serving_qty': 1,
    'serving_unit': 'medium (3" dia)',
    'serving_weight_grams': 182,
    'nf_calories': 94.64,
    'nf_total_fat': 0.31,
    'nf_saturated_fat': 0.05,
    'nf_cholesterol': 0,
    'nf_sodium': 1.82,
    'nf_total_carbohydrate': 25.13,
    'nf_dietary_fiber': 4.37,
    'nf_sugars': 18.91,
    'nf_protein': 0.47,
    'nf_potassium': 194.74,
    'nf_p': 20.02,
    'nix_brand_name': null,
    'nix_brand_id': null,
    'nix_item_name': null,
    'nix_item_id': null,
    'upc': null,
    'metadata': {is_raw_food: false},
    'source': 1,
    'ndb_no': 9003,
    'tags': {
      'item': 'apple',
      'measure': null,
      'quantity': '1.0',
      'food_group': 3,
      'tag_id': 384
    },
    'lat': null,
    'lng': null,
    'meal_type': 3,
    'photo': {
      'thumb': 'https://nix-tag-images.s3.amazonaws.com/384_thumb.jpg',
      'highres': 'https://nix-tag-images.s3.amazonaws.com/384_highres.jpg',
      'is_user_uploaded': false
    },
    'tag_id': null
  }]
};

export const naturalSearchExpectedResults = appleResults.foods;
export const appleFoodItem = _.first(appleResults.foods);
