import React from 'react'
import Pagination from '@mui/material/Pagination';
import PaginationItem from "@mui/material/PaginationItem"
import {} from "@material-ui/core"
import useStyles from './styles'
import { Link } from 'react-router-dom';

const PaginationComponent = () => {

  const classes = useStyles();

  return (
    <Pagination
    classes={{ul : classes.ul}}
    count = {5}
    page = {1}
    variant = "outlined"
    color="primary"
    renderItem={(item) => (
      <PaginationItem 
      {...item}
      component={Link}
      to={`/posts?page=${1}`}
      />
    )}
    />
  )
}

export default PaginationComponent