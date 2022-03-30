import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import { onChange } from 'app/components/helpers/events';
import { useInstantSearchMutation, useNaturalSearchMutation } from 'app/services/NutritionixAPI';
import { useSelector } from 'react-redux';

export default function Nutrition() {
  const [search, setSeach] = useState('');
  const [foodItem, setFoodItem] = useState({});
  const [instantSearch] = useInstantSearchMutation({fixedCacheKey: 'nutritionix-instant-search'});
  const [naturalSearch] = useNaturalSearchMutation({fixedCacheKey: 'nutritionix-natural-search'});

  const nutritionix = useSelector(({nutritionix}) => nutritionix);
  const instantSearchResults = nutritionix?.instantSearch ?? [];
  const selectedFood = _.first(nutritionix?.naturalSearch) ?? [];

  const searchNow = (searchTerm) => {
    if (!_.isEmpty(searchTerm)) {
      setSeach(searchTerm);
      instantSearch(searchTerm);
    }
  };

  return (
    <div>
      <h2>Nutrition Page</h2>

      <Autocomplete
        disablePortal
        options={instantSearchResults}
        getOptionLabel={(option) => option?.food_name ?? ''}
        isOptionEqualToValue={(option, value) => option.tag_id === value.tag_id}
        sx={{width: 400}}
        value={foodItem}
        onChange={(event, newValue) => {
          setFoodItem(newValue);

          if (!_.isEmpty(newValue)) {
            naturalSearch({query: newValue.food_name});
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={search}
            label="Search for Foods"
            onChange={onChange(searchNow)}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
            <img width="20" src={option.photo.thumb} alt={option.food_name}/>
            {option.brand_name} {option.food_name}
          </Box>
        )}
      />

      {!_.isEmpty(selectedFood) && (
        <div>
          <span>Name: {selectedFood.food_name}</span><img src={selectedFood.photo.thumb} alt={selectedFood.food_name}></img>
          <div>Total Calories: {selectedFood.nf_calories}</div>
          <div>Total Fat: {selectedFood.nf_total_fat}</div>
          <div>Total Protein: {selectedFood.nf_total_fat}</div>
          <div>Total Carbohydrates: {selectedFood.nf_total_carbohydrate}</div>
        </div>
      )}
    </div>
  );
}
