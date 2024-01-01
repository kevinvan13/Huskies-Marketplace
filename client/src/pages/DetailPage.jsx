
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationMap from "../components/LocationMap";
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import PriceIcon from "@mui/icons-material/AttachMoney";
import ConditionIcon from "@mui/icons-material/NewReleases";
import CategoryIcon from "@mui/icons-material/Category";
import EmailIcon from "@mui/icons-material/Email";
import LocationIcon from "@mui/icons-material/LocationOn";

const DetailPage = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/post/${id}`
                );
                if (response.ok) {
                    const postData = await response.json();
                    setPost(postData);
                } else {
                    console.error("Failed to fetch post");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        fetchPost();
    }, [id]);


    if (!post) {
        return <div>Loading...</div>;
    }


    return (
        <Box sx={{ padding: 3 }}>
            <Card elevation={0} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Grid container>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <CardMedia
                                component="img"
                                image={post.images || "/logo-removebg-preview.png"}
                                alt={post.title}
                                sx={{ width: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h3" gutterBottom component="div">
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" mb={2}>
                                {post.description}
                            </Typography>
                            <Box display="flex" alignItems="center" mb={1}>
                                <PriceIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                                <Typography variant="h5" color="orange" gutterBottom>
                                    {post.price}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <ConditionIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                                <Typography variant="h6" gutterBottom>
                                    {post.condition}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <CategoryIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                                <Typography variant="h6" gutterBottom>
                                    {post.category}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <EmailIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                                <Typography variant="h6" gutterBottom>
                                    {post.email}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <LocationIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                                <Typography variant="h6" gutterBottom>
                                    {post.location}
                                </Typography>
                            </Box>
                        </CardContent>
                        <Box mt={2} sx={{ p: 2 }}>
                            <LocationMap location={post.location} />
                        </Box>
                    </Grid>
                </Grid>
            </Card>

        </Box>
    );
};

export default DetailPage;
