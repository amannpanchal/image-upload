import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addpic } from '../redux/actions';

const Uploadpic = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [mediaUrl, setMediaUrl] = useState('');
    const [title, setTitle] = useState('');
    const id = localStorage.getItem('id');

    const uploadMedia = async (selectedFile) => {
        try {
            if (!selectedFile) {
                alert("Please select a file");
                return;
            }

            const isImage = selectedFile.type.startsWith("image/");
            const isVideo = selectedFile.type.startsWith("video/");

            if (!isImage && !isVideo) {
                alert("Only images and videos are allowed!");
                return;
            }

            const data = new FormData();
            data.append('file', selectedFile);
            data.append('upload_preset', "amanpanchal");
            data.append('cloud_name', 'dk2scs5jz');

            const uploadUrl = isImage
                ? 'https://api.cloudinary.com/v1_1/dk2scs5jz/image/upload'
                : 'https://api.cloudinary.com/v1_1/dk2scs5jz/video/upload';

            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: data
            });

            const result = await response.json();
            setMediaUrl(result.secure_url);
            console.log("Uploaded file URL:", result.secure_url);
        } catch (e) {
            console.error("Error uploading media:", e);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (title && mediaUrl) {
            const data = { title, pic: mediaUrl, id };
            console.log("Submitting data:", data);
            dispatch(addpic(data));
        } else {
            alert("Please add a title and upload a media file");
        }
    };

    return (
        <div>
            <div className='inputside'>
                <input
                    type='text'
                    value={title}
                    placeholder='Enter media title...'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <input
                    type='file'
                    accept='image/*,video/*'
                    onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        setFile(selectedFile);
                        uploadMedia(selectedFile);
                    }}
                />
                <br />
                <button className='upload' onClick={onSubmit}>Upload</button>
            </div>
        </div>
    );
};

export default Uploadpic;
