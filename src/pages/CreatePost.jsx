import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { db, auth } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CreatePost = () => {
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        name: 'Current User', // In a real app, this would come from auth
        location: '',
        content: '',
        images: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) {
            alert("You must be logged in to post");
            return;
        }
        setIsSubmitting(true);

        try {
            await addDoc(collection(db, 'community_posts'), {
                userId: auth.currentUser.uid,
                name: auth.currentUser.displayName || 'Anonymous',
                avatar: auth.currentUser.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-O7APKyYdplwuyxI7pFW8BipHU1XgI8zVXdR4RHgI4DIaWgyHyXNyr_21U64ZUPMN307RjdfvxEg_2YPwVpRsDdbcLEQNgJy-j9MT7ZO6BiYcDjJJz3SYIwOcG5RAipyY7FwIHit5fePFyNjZVamNP5bVTO1AS1O3cH1jJzbTCIr_JM219rdw4V3XmHGCzuDlHELYmWC0N2t89gCvWYeuaiUL0VsGCUz5kbwgnZBfLIgMIYGIXJVcZWlDnZQTZD6clWgBPy-vP5YD',
                location: postData.location,
                content: postData.content,
                images: postData.images,
                likes: [],
                comments: 0,
                timestamp: serverTimestamp()
            });
            setIsSubmitting(false);
            navigate('/community');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to create post. Please try again.");
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden">
                <div className="p-6 border-b border-border-light dark:border-border-dark bg-indigo-50/50 dark:bg-indigo-900/10">
                    <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-2">
                        <span className="material-icons-outlined text-primary">edit_note</span>
                        Share Your Experience
                    </h1>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
                        Inspire the community with your latest adventure.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark">
                            Where did you go?
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted-light dark:text-text-muted-dark">
                                <span className="material-icons-outlined text-sm">location_on</span>
                            </span>
                            <input
                                required
                                type="text"
                                name="location"
                                value={postData.location}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-border-light dark:border-border-dark dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="e.g. Kyoto, Japan"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark">
                            Tell your story
                        </label>
                        <textarea
                            required
                            name="content"
                            rows={6}
                            value={postData.content}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 border border-border-light dark:border-border-dark dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                            placeholder="What made this trip special? Any hidden gems or pro tips?"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark">
                            Add some photos (URL)
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="block w-full px-4 py-3 border border-border-light dark:border-border-dark dark:bg-gray-800 rounded-xl outline-none"
                                placeholder="Paste an image URL here..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (e.target.value) {
                                            setPostData(prev => ({ ...prev, images: [...prev.images, e.target.value] }));
                                            e.target.value = '';
                                        }
                                    }
                                }}
                            />
                            <Button type="button" variant="outline" onClick={() => { }}>
                                <span className="material-icons-outlined">add_photo_alternate</span>
                            </Button>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => navigate('/community')}
                            className="px-6"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 bg-primary hover:bg-indigo-600 shadow-lg shadow-indigo-500/20"
                        >
                            {isSubmitting ? 'Posting...' : 'Post to Feed'}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CreatePost;
