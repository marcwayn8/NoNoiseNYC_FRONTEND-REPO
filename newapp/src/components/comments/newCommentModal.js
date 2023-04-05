import { Tab } from '@headlessui/react'
import {  CodeBracketIcon } from '@heroicons/react/20/solid'
import {  useState,useContext } from 'react'
import AppContext from "../../context/appContext.jsx";
import React from 'react'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NewCommentModal({ postId }) {
    const [content, setContent] = useState('')
      const {  user } = useContext(AppContext);
     

    function createComment() {
        const userId = user.id
        console.log(postId, userId)
        console.log(content)
        fetch(`http://localhost:4005/comment/${postId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
               
                commentary: content,
                likes:0
            })
        }).then(setContent(''))
    }

    return (
        <form action="#">
            <Tab.Group>
                {({ selectedIndex }) => (
                    <>
                        <Tab.List className="flex items-center">
                           
                          
                            {/* These buttons are here simply as examples and don't actually do anything. */}
                            {selectedIndex === 0 ? (
                                <div className="ml-auto flex items-center space-x-5">
                                    <div className="flex items-center">
                                    </div>
                                    <div className="flex items-center">
                                        
                                    </div>
                                    <div className="flex items-center">
                                    </div>
                                </div>
                            ) : null}
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                                <label htmlFor="comment" className="sr-only">
                                    Comment
                                </label>
                                <div>
                                    <input
                                        rows={5}
                                        name="comment"
                                        id="comment"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Add your comment..."
                                        value={content}
                                        onChange={(e) => { setContent(e.target.value)}}
                                    />
                                </div>
                            </Tab.Panel>
                           
                        </Tab.Panels>
                    </>
                )}
            </Tab.Group>
            <div className="mt-2 flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={(e) => { e.preventDefault(); createComment() }}
                >
                    Comment
                </button>
            </div>
        </form>
    )
}