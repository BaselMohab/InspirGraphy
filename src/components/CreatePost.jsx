import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../config/firebase.config';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import PostList from './PostList';

export default function PostManager() {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const postsSnapshot = await getDocs(collection(db, "posts"));
            const postsList = postsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsList);
        } catch (error) {
            console.error("Error fetching posts: ", error);
        }
    };

    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const createPost = async () => {
        try {
            let imageUrl = '';

            if (image) {
                const imageRef = ref(storage, `images/${Date.now()}_${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }


            await addDoc(collection(db, "posts"), {
                title: newTitle,
                content: newContent,
                imageUrl,
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid, profileImg: auth.currentUser.photoURL},
            });

            setNewTitle("");
            setNewContent("");
            setImage(null);
            setIsModalOpen(false);
            fetchPosts();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const editPost = async () => {
        try {
            const postDoc = doc(db, "posts", editingPost.id);
            let updatedData = {
                title: newTitle,
                content: newContent,
                LikesNum: 109,
                CommentsNum: 22,
                ...(image ? { imageUrl: await getDownloadURL(ref(storage, `images/${Date.now()}_${image.name}`)) } : {})
            };

            await updateDoc(postDoc, updatedData);

            setNewTitle("");
            setNewContent("");
            setImage(null);
            setEditingPost(null);
            setIsModalOpen(false);
            fetchPosts();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const deletePost = async (id) => {
        try {
            await deleteDoc(doc(db, "posts", id));
            fetchPosts();
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const handleAddPostClick = () => {
        if (auth.currentUser) {
            setIsModalOpen(true);
            setEditingPost(null);
            setNewTitle('');
            setNewContent('');
            setImage(null);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mb-6">
                <Button
                    onClick={handleAddPostClick}
                    color="blue"
                    className="post-icon text-white"
                >
                    Add Post
                </Button>
            </div>

            <PostList 
                posts={posts} 
                onEdit={(post) => {
                    setEditingPost(post);
                    setNewTitle(post.title);
                    setNewContent(post.content);
                    setIsModalOpen(true);
                }} 
                onDelete={deletePost}
            />

            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                size="sm"
                className="bg-white rounded-lg"
            >
                <DialogHeader className="rounded-lg text-light-blue-300">
                    {editingPost ? 'Edit Post' : 'Add Post'}
                </DialogHeader>
                <DialogBody>
                    <div className="mb-4">
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="border border-light-blue-300 p-2 mb-2 w-full rounded"
                        />
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="w-full h-auto mt-2"
                            />
                        )}
                        <input
                            type="text"
                            placeholder="Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="border border-light-blue-300 p-2 mb-2 w-full rounded"
                        />
                        <textarea
                            placeholder="Content"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            className="border border-light-blue-300 p-2 mb-2 w-full rounded"
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        color="light-blue"
                        onClick={() => {
                            if (editingPost) {
                                editPost();
                            } else {
                                createPost();
                            }
                        }}
                        className="bg-light-blue-500 hover:bg-light-blue-600"
                    >
                        {editingPost ? 'Save Changes' : 'Add Post'}
                    </Button>
                    <Button
                        color="red"
                        onClick={() => setIsModalOpen(false)}
                        variant="text"
                        className="text-light-blue-500 hover:text-light-blue-700"
                    >
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
