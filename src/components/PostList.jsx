import React from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import { useAuth } from '../components/AuthContext/authContext'; 
import { Spinner } from '@material-tailwind/react';

const PostList = ({ posts, onEdit, onDelete }) => {
    const { currentUser } = useAuth(); 

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {posts.length > 0 && <h1 className='text-3xl sm:text-4xl lg:text-5xl text-center font-extrabold text-light-blue-800 mb-8'>Recent Posts</h1>}
            <div className="grid grid-cols-1 gap-24 py-10">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <Card
                            key={post.id}
                            className="post-card hover:shadow-lg transition-shadow duration-200 border border-light-blue-300 rounded-lg"
                            style={{ width: '100%', maxWidth: '35rem', height: 'auto' }}
                        >
                            <CardHeader color="blue-gray" className="relative h-48 md:h-56 lg:h-64">
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
                            <CardBody className="p-4">
                                <div className="flex flex-col sm:flex-row justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.author?.profileImg }
                                            alt={post.author?.displayName || 'User'}
                                            className="w-12 h-12 rounded-full bg-gray-300"
                                        />
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                                            {post.author.name}
                                        </h3>
                                    </div>
                                    <div className="flex gap-4 items-center text-gray-500">
                                        <p className="mb-1 text-sm sm:text-base">
                                            <i className="fa-regular fa-heart"></i> {post.likesNum || 109}
                                        </p>
                                        <p className="mb-1 text-sm sm:text-base">
                                            <i className="fa-regular fa-comments"></i> {post.commentsNum || 32}
                                        </p>
                                    </div>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                                <p className="text-gray-800 text-sm sm:text-base">{post.content}</p>
                            </CardBody>
                            {currentUser && currentUser.uid === post.author.id && (
                                <CardFooter className="flex justify-between border-t border-light-blue-300 p-4">
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
