import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import { onChange } from 'app/helpers/events';
import { useInstantSearchMutation } from '../services/NutritionixAPI';
import { useSelector } from 'react-redux';

export default function Nutrition() {
  const [search, setSeach] = useState('');
  const [instantSearch] = useInstantSearchMutation({fixedCacheKey: 'nutritionix-instant-search'});

  const nutritionix = useSelector(({nutritionix}) => nutritionix);
  const searchResults = nutritionix?.instantSearch ?? [];

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
        onChange={onChange(searchNow)}
        disablePortal
        options={searchResults}
        getOptionLabel={(option) => option.food_name}
        sx={{width: 400}}
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
    </div>
  );
}
