import React, { Fragment, useContext, useState } from 'react';
import NotificationContext from '../context/NotificationContext';
import { emitToastNotification } from '../utils/notificationUtils';
import { INotification } from '../types/notification';
import { Application, NotificationType } from '../constants';
import { SpeakerphoneOutline } from 'heroicons-react';

const FeedbackModal = ({ display = true, callback }) => {

    const { state: notification, dispatch } = useContext(NotificationContext);
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        e.target.name === 'email' ? setEmail(e.target.value) : setFeedback(e.target.value);
    };

    const handleSubmit = async () => {

        if (!feedback) {
            emitToastNotification(dispatch, {
                title: 'Feedback required',
                message: 'Please provide feedback in order to submit this form.',
                type: NotificationType.ERROR
            });
        }

        const payload = {
            email,
            feedback
        };

        const res = await fetch(Application.FEEDBACK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            const notification: INotification = {
                title: 'Feedback Received',
                message: 'Thank you for submitting feedback. We read every single suggestion and aim to bring you a better product with every release.',
                type: NotificationType.SUCCESS
            };
            callback();
            return emitToastNotification(dispatch, notification, 7500);
        }
    };


    return (
        <Fragment>
            <div className={`${display ? 'z-10' : 'hidden'} fixed inset-0 overflow-y-auto`}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                        className={`${display ? 'opacity-100 ease-out duration-300' : 'opacity-0 ease-in duration-200'} fixed inset-0 transition-opacity`}
                        aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75" />
                    </div>

                    {/*This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true">&#8203;</span>
                    <div
                        className={`${display ? 'opacity-100 translate-y-0 sm:scale-100 ease-in duration-200' : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 ease-out duration-300'} inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6`}
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div>
                            {/* TODO: Add ability for user to click emoji for feedback  */}
                            {/*<div*/}
                            {/*	className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">*/}
                            {/*	/!*Heroicon name: outline/check *!/*/}
                            {/*	<svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"*/}
                            {/*		 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">*/}
                            {/*		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                            {/*			  d="M5 13l4 4L19 7"/>*/}
                            {/*	</svg>*/}
                            {/*</div>*/}
                            <div
                                className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <SpeakerphoneOutline className={'h-6 w-6 text-green-600'} />
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                {/*<h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">*/}
                                {/*	Feedback*/}
                                {/*</h3>*/}
                                <div className="mt-2 py-4">
                                    <p className="text-xl font-bold text-gray-900">
                                        Let us know how we're doing!
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <div>
                                        <div className="mt-2">
                                            <label htmlFor="email"
                                                   className="block text-left pb-2 text-sm font-medium text-gray-700">Email
                                                (optional)</label>
                                            <input type="text" name="email" id="email"
                                                   onChange={handleUpdate}
                                                   className="border-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                   placeholder="you@example.com" />
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="feedback"
                                                   className="block text-left pb-2 text-sm font-medium text-gray-700">Feedback</label>
                                            <textarea id="feedback" name="feedback" rows={5}
                                                      required
                                                      onChange={handleUpdate}
                                                      className="border-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                onClick={() => handleSubmit()}
                                type="submit"
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                Leave Feedback
                            </button>
                            <button onClick={() => callback()} type="button"
                                    className="mt-2 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default FeedbackModal;
