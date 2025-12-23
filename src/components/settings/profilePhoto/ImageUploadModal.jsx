import { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    IconButton,
    Modal,
    Tooltip,
} from "@mui/material";
import Button from "../../shared/Button.jsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ImageCropper from "./ImageCropper.jsx";
import { getCroppedImg, blobToBase64 } from "../../../helpers/helper.js";

const ImageUploadModal = ({ handleClose, openModal }) => {
    const [dragEnter, setDragEnter] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState("");
    const uploadProfilePicInputRef = useRef(null);
    const [imageProperties, setImageProperties] = useState({
        zoom: 1,
        rotation: 0,
        croppedAreaPixels: {
            height: 0,
            width: 0,
            x: 0,
            y: 0,
        },
    });

    /* on dragging over the valid dropzone area */
    const handleDragOver = (event) => {
        setDragEnter(true);
        event.preventDefault();
        event.stopPropagation();
    };

    /* on dragging out the valid dropzone area */
    const handleDragLeave = (event) => {
        setDragEnter(false);
        event.preventDefault();
        event.stopPropagation();
    };

    /* on drop of image onto the valid dropzone */
    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files[0];
        setDragEnter(false);
        validateAndUploadFile(file);
    };

    const handleFileChange = (event) => {
        if (!event.target.files) return;
        const file = event?.target?.files[0];
        validateAndUploadFile(file);
    };
    const attachButtonHandler = () => {
        if (uploadProfilePicInputRef.current)
            uploadProfilePicInputRef.current.click();
        else console.error("uploadProfilePicInputRef is null");
    };

    const cancelUpload = () => {
        setError("");
        setSelectedImage(null);
    };

    const validateAndUploadFile = (file) => {
        if (file) {
            const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
            const maxSize = 5 * 1024 * 1024;

            if (!validTypes.includes(file.type)) {
                setError("Please upload a .jpeg/.jpg/.png/.webp file type");
                return;
            }
            if (file.size > maxSize) {
                setError("Image file size should be less than 5MB");
                return;
            }
            setError("");
            const reader = new FileReader();
            reader.onload = () => setSelectedImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const { rotation, croppedAreaPixels } = imageProperties;
        if (!selectedImage) {
            setError("No image selected. Please upload an image.");
            return;
        }
        const croppedImage = await getCroppedImg(
            selectedImage,
            croppedAreaPixels,
            rotation
        );
        if (!croppedImage) {
            setError("Failed to crop the image. Please try again.");
            return;
        }
        const base64Image = await blobToBase64(croppedImage);
        localStorage.setItem("userProfilePic", base64Image);
        handleClose();
    };

    const handleChangeImage = () => {
        cancelUpload();
        if (uploadProfilePicInputRef.current)
            uploadProfilePicInputRef.current.click();
    };

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="image-upload-modal"
        >
            <Box className="flex flex-col justify-between bg-white p-5 rounded-lg text-center w-[34rem] h-[382px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-none shadow-lg">
                <div className="flex items-center justify-between order-b-2 border-b-amber-600">
                    <div className="flex flex-col items-start gap-1.5 ml-4 pb-2.5">
                        <h3 className="font-bold text-xl leading-6 pl-5">Upload Photo</h3>
                        <p className="font-medium leading-4 opacity-40 pl-5">
                            Upload a photo of yourself to personalize your account
                        </p>
                    </div>
                    <Button styleType="white" className="max-w-fit" onClick={handleClose}>
                        <XMarkIcon className="size-6 text-gray-900" />
                    </Button>
                </div>

                <div className="flex flex-col items-center mt-1">
                    {selectedImage ? (
                        <ImageCropper
                            uploadedImage={selectedImage}
                            setImageProperties={setImageProperties}
                        />
                    ) : (
                        <>
                            <label
                                htmlFor="fileInput"
                                className={`${dragEnter ? "drag-enter" : ""} w-[180px] h-[180px] rounded-[50%] border-[2px] border-dashed border-[#cbd0dc] flex items-center justify-center cursor-pointer text-gray-900 text-center p-5 transition-all duration-300 hover:border-amber-600 hover:shadow-md hover:shadow-gray-300`}
                                onDragEnter={handleDragOver}
                                onDragOver={(event) => event.preventDefault()}
                                onDrop={handleDrop}
                                onDragLeave={handleDragLeave}
                            >
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    hidden
                                    ref={uploadProfilePicInputRef}
                                />
                                {dragEnter
                                    ? `Drop the file here`
                                    : `Choose or Drag & Drop your photo here`}
                            </label>
                            <span className="text-sm text-gray-600 mt-2.5">
                                200 x 200 min / 5MB max
                            </span>
                        </>
                    )}
                    {error && <span className="text-red text-sm">{error}</span>}
                </div>

                <div className="flex justify-center gap-2.5">
                    {selectedImage === null ? (
                        <>
                            <Button onClick={handleClose} styleType="secondary" className={"max-w-fit"}>
                                Cancel
                            </Button>
                            <Button onClick={() => attachButtonHandler()} styleType="primary" className={"max-w-fit"}>
                                Choose Photo
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleChangeImage} styleType="secondary" className={"max-w-fit"}>
                                Change Photo
                            </Button>
                            <Button onClick={handleSubmit} styleType="primary" className={"max-w-fit"}>
                                Upload Photo
                            </Button>
                        </>
                    )}
                </div>
            </Box>
        </Modal>
    );
};

ImageUploadModal.propTypes = {
    handleClose: PropTypes.func,
};

export default ImageUploadModal;