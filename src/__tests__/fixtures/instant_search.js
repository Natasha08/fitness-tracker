export const appleSearchResults = {
  'common': [
    {
      'food_name': 'apple',
      'serving_unit': 'medium (3\' dia)',
      'tag_name': 'apple',
      'serving_qty': 1,
      'common_type': null,
      'tag_id': '384',
      'photo': {
        'thumb': 'https://nix-tag-images.s3.amazonaws.com/384_thumb.jpg'
      },
      'locale': 'en_US'
    },
    {
      'food_name': 'apricot',
      'serving_unit': 'apricot',
      'tag_name': 'apricot',
      'serving_qty': 1,
      'common_type': null,
      'tag_id': '388',
      'photo': {
        'thumb': 'https://nix-tag-images.s3.amazonaws.com/388_thumb.jpg'
      },
      'locale': 'en_US'
    },
    {
      'food_name': 'appletini',
      'serving_unit': 'cocktail',
      'tag_name': 'appletini',
      'serving_qty': 1,
      'common_type': null,
      'tag_id': '5031',
      'photo': {
        'thumb': 'https://nix-tag-images.s3.amazonaws.com/5031_thumb.jpg'
      },
      'locale': 'en_US'
    },
    {
      'food_name': 'apple pie',
      'serving_unit': 'piece (1/8 of 9\' dia)',
      'tag_name': 'Apple pie',
      'serving_qty': 1,
      'common_type': null,
      'tag_id': '15060',
      'photo': {
        'thumb': 'https://nix-tag-images.s3.amazonaws.com/1291_thumb.jpg'
      },
      'locale': 'en_US'
    },
    {
      'food_name': 'applejuice',
      'serving_unit': 'cup',
      'tag_name': 'apple juice',
      'serving_qty': 1,
      'common_type': null,
      'tag_id': '385',
      'photo': {
        'thumb': 'https://nix-tag-images.s3.amazonaws.com/385_thumb.jpg'
      },
      'locale': 'en_US'
    },
  ],
  'branded': [
    {
      'food_name': 'Rice Cakes, Apple Cinnamon',
      'serving_unit': 'cake',
      'nix_brand_id': '51db37b5176fe9790a898851',
      'brand_name_item_name': 'Quaker Rice Cakes, Apple Cinnamon',
      'serving_qty': 1,
      'nf_calories': 50,
      'photo': {
        'thumb': 'https://nutritionix-api.s3.amazonaws.com/6071aebc34e85a0008ed52a2.jpeg'
      },
      'brand_name': 'Quaker',
      'region': 1,
      'brand_type': 2,
      'nix_item_id': '51c36eaf97c3e69de4b09495',
      'locale': 'en_US'
    },
    {
      'food_name': 'Chicken & Maple Breakfast Sausage',
      'serving_unit': 'links',
      'nix_brand_id': '51db37b5176fe9790a8988b3',
      'brand_name_item_name': 'Applegate Chicken & Maple Breakfast Sausage',
      'serving_qty': 3,
      'nf_calories': 110,
      'photo': {
        'thumb': 'https://nutritionix-api.s3.amazonaws.com/53fb42bff41721ed4d485eb2.jpeg'
      },
      'brand_name': 'Applegate',
      'region': 1,
      'brand_type': 2,
      'nix_item_id': '51c36af597c3e69de4b07630',
      'locale': 'en_US'
    },
    {
      'food_name': 'Caramel Apple Pie Greek Yogurt',
      'serving_unit': 'container',
      'nix_brand_id': '54de6c551e0d973c7da3c5b9',
      'brand_name_item_name': 'Dannon Light & Fit Caramel Apple Pie Greek Yogurt',
      'serving_qty': 1,
      'nf_calories': 80,
      'photo': {
        'thumb': 'https://nutritionix-api.s3.amazonaws.com/578706f4e0e3cf6c5c20d2d9.jpeg'
      },
      'brand_name': 'Dannon Light & Fit',
      'region': 1,
      'brand_type': 2,
      'nix_item_id': '578707998eb128fc315a5be2',
      'locale': 'en_US'
    }
  ]
};

export const expectedResults = _.flatten([...appleSearchResults.common, ...appleSearchResults.branded]);
