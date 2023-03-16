import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import NewCommentModal from './newCommentModal';
import {
    ChatBubbleLeftEllipsisIcon
   
} from '@heroicons/react/20/solid'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    color:'white',

    p: 4,
};

const button = {
    backgroundColor: "transparent",
    height: "50",
    width: "50",
    color:"white"
}

function CommentModal({ postId }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button style={button} onClick={handleOpen} onChange={(e) => { e.preventDefault() }}><ChatBubbleLeftEllipsisIcon sx={style}/></Button>
            <Modal
                open={open}
                onClose={handleClose}

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <NewCommentModal postId={postId} />
                </Box>
            </Modal>
        </div>
    );
}

export default CommentModal;