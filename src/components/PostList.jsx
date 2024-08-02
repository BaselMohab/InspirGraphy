import React from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import { useAuth } from '../components/AuthContext/authContext'; 
import { Spinner } from '@material-tailwind/react';

const PostList = ({ posts, onEdit, onDelete }) => {
    const { currentUser } = useAuth(); 

    return (
        <div>
            {posts.length > 0 && <h1 className='text-4xl text-center font-extrabold text-light-blue-800'>Recent Posts</h1>}
            <div className="grid grid-cols-1 gap-10 py-10">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <Card
                            key={post.id}
                            className="post-card m-6 hover:shadow-lg transition-shadow duration-200 border border-light-blue-300 rounded-lg"
                            style={{ width: '35rem', height: '30rem' }}
                        >
                            <CardHeader color="blue-gray" className="relative h-3/5">
                                {post.imageUrl ? (
                                    <img
                                        src={post.imageUrl}
                                        alt="Post"
                                        className="w-full h-full object-cover rounded-t-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        No Image
                                    </div>
                                )}
                            </CardHeader>
                            <CardBody className="h-2/5">
                                <div className="flex justify-between mb-4">
                                    <div className="flex gap-2 items-center">
                                        <img
                                            src={post.author?.profileImg }
                                            alt={post.author?.displayName || 'User'}
                                            className="w-10 h-10 rounded-full bg-gray-300"
                                        />
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {post.author.name}
                                        </h3>
                                    </div>
                                    <div className="flex gap-4 items-center text-gray-500">
                                        <p className="mb-1">
                                            <i className="fa-regular fa-heart"></i> {post.likesNum || 109}
                                        </p>
                                        <p className="mb-1">
                                            <i className="fa-regular fa-comments"></i> {post.commentsNum || 32}
                                        </p>
                                    </div>
                                </div>
                                <h3 className="text-gray-800 mb-4">{post.title}</h3>
                                <p className="text-gray-800 mb-4">{post.content}</p>
                            </CardBody>
                            {currentUser && currentUser.uid === post.author.id && (
                                <CardFooter className="flex justify-between border-t border-light-blue-300">
                                    <Button
                                        onClick={() => onEdit(post)}
                                        className="btn transition duration-200"
                                    >
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </Button>
                                    <Button
                                        onClick={() => onDelete(post.id)}
                                        className="bg-red-500 hover:bg-red-600 transition duration-200"
                                    >
                                        <i className="fa-regular fa-trash-can"></i>
                                    </Button>
                                </CardFooter>
                            )}
                        </Card>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-screen">
                        <Spinner className="h-20 w-20 text-light-blue-700" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostList;
