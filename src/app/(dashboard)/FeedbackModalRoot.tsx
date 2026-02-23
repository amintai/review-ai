'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setFeedbackModalOpen } from '@/store/slices/uiSlice';
import FeedbackModal from '@/components/feedback/FeedbackModal';

export default function FeedbackModalRoot() {
    const dispatch = useDispatch();
    const isFeedbackModalOpen = useSelector((state: RootState) => state.ui.isFeedbackModalOpen);

    return (
        <FeedbackModal
            isOpen={isFeedbackModalOpen}
            onClose={() => dispatch(setFeedbackModalOpen(false))}
        />
    );
}
