import React from 'react';
import { Breadcrumbs, Link } from '@mui/material';

export default function Header() {
  return (
    <Breadcrumbs aria-label="breadcrumb" className="Header">
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href="/nutrition"
      >
        Nutrition
      </Link>
    </Breadcrumbs>
  );
}
