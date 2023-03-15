import React from 'react'
import {Container, Grow , Grid, Paper} from "@material-ui/core";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import {useDispatch} from "react-redux";
import { useState, useEffect } from 'react';
import { getPosts } from '../../actions/posts';
import useStyles from "./styles"
import PaginationComponent from '../Pagination/Pagination';

function Home() {

    const [currentId,setCurrentId] = useState(null)

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    },[dispatch])

  return (
    <Grow in>
                <Container>
                    <Grid className={classes.postsContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            <Paper className={classes.pagination} elevation={6}>
                                <PaginationComponent/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
  )
}

export default Home