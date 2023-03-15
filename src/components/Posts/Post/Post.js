import React from 'react'
import { Card , CardActions , CardContent , CardMedia , Button , Typography } from '@material-ui/core';
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./styles"
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import jwtDecode from 'jwt-decode';

function Post({post,setCurrentId}) {

    const classes = useStyles(); 

    const dispatch = useDispatch();

    const credentials = (localStorage.getItem("profile"))
    let user = {};
    if(credentials !== null){
        if(JSON.parse(credentials).token){
            user = { name : JSON.parse(credentials).result.name , id : JSON.parse(credentials).result._id}
        }else{
            console.log(jwtDecode(credentials))
            user = {name : jwtDecode(credentials).name , id : jwtDecode(credentials).sub}
        }
    }

    // Likes Logic 
    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

    
    
  return (
    <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} component="div"/>
        <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {
            (user?.id ===post.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{color:"white"}} size="small" onClick={() => {setCurrentId(post._id)}}>
                    <MoreHorizIcon fontSize="medium"/>
                    </Button>
                </div>
            )
        }
        
        <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
        <CardContent>
            <Typography variant="body2" component="p" color="textSecondary">{post.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" disabled={!user?.name} onClick={() => {dispatch(likePost(post._id))}}>
                <Likes/>
            </Button>
            {
                (user?.id ===post.creator) && (
                    <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                    </Button>)
            }
            
        </CardActions>
    </Card>
  )
}

export default Post