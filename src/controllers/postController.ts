import { RequestHandler } from "express";
import { Post } from "../models/post";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllPost: RequestHandler = async (req, res, next) => {
    let posts = await Post.findAll();
    res.status(200).json(posts);
}

export const createPost: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }
    
    let newPost: Post = req.body;
    newPost.userId = user.userId;
    
    if (newPost.post) {
        let created = await Post.create(newPost);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const getPost: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let postId = req.params.postId;
    let postFound = await Post.findByPk(postId);
    if (postFound) {
        res.status(200).json(postFound);
    }
    else {
        res.status(404).json({});
    }
}

export const updatePost: RequestHandler = async (req, res, next) => {
    let postId = req.params.postId;
    let newPost: Post = req.body;
    
    let postFound = await Post.findByPk(postId);
    
    if (postFound && postFound.postId == newPost.postId
        && newPost.post && newPost.userId && newPost.title) {
            await Post.update(newPost, {
                where: { postId: postId}
            });
            res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}

export const deletePost: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let postId = req.params.postId;
    let postFound = await Post.findByPk(postId);
    
    if (postFound) {
        await Post.destroy({
                where: { postId: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}