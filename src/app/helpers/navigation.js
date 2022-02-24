import FoodBank from '@mui/icons-material/FoodBank';
import DirectionsRun from '@mui/icons-material/DirectionsRun';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';

export const navigationList = [
  {
    name: 'Home',
    path: '/',
    Icon: Home
  },
  {
    name: 'Nutrition',
    path: '/nutrition',
    Icon: FoodBank
  },
  {
    name: 'Workouts',
    path: '/workouts',
    Icon: DirectionsRun
  },
  {
    name: 'Daily',
    path: '/daily',
    Icon: CalendarToday
  },
  {
    name: 'Settings',
    path: '/settings',
    Icon: Settings
  },
];
