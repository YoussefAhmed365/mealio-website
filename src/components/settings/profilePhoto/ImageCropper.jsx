import { colors, IconButton, Slider, Tooltip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon, } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import Button from "../../shared/Button";

const ImageCropper = ({
    uploadedImage,
    setImageProperties,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState({
        height: 0,
        width: 0,
        x: 0,
        y: 0,
    });

    useEffect(() => {
        setImageProperties((prevVal) => {
            if (
                prevVal.zoom !== zoom ||
                prevVal.rotation !== rotation ||
                prevVal.croppedAreaPixels !== croppedAreaPixels
            ) {
                return { zoom, rotation, croppedAreaPixels };
            }
            return prevVal;
        });
    }, [croppedAreaPixels, rotation, zoom]);

    const onCropComplete = useCallback(
        (croppedArea, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    const handleZoomChange = (value) => {
        setZoom(value);
    };

    const handleZoomClick = (mode) => {
        if (mode === "zoomin") {
            setZoom((prev) => {
                if (prev >= 3) return prev;
                return prev + 0.1;
            });
        } else {
            setZoom((prev) => {
                if (prev <= 1) return prev;
                return prev - 0.1;
            });
        }
    };

    const handleRotationChange = (direction) => {
        if (rotation >= 360 || rotation <= -360) setRotation(0);
        if (direction === "left") setRotation((prev) => prev - 90);
        else setRotation((prev) => prev + 90);
    };

    return (
        <>
            <div className="relative -top-6 w-[262px] h-[262px] bg-gray-50 overflow-hidden [clip-path:circle(37%)]">
                <Cropper
                    image={uploadedImage}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                />
                <div className="text-center bg-white absolute h-6.5 w-[62px] top-[168px] left-[92px] rounded-4xl text-amber-600 text-xs p-1.5 opacity-75 transition duration-200 ease-in-out hover:hidden">
                    <label htmlFor="none">Move</label>
                </div>
            </div>
            <div className="flex gap-4 absolute bottom-20 w-3/4">
                <div className="flex gap-2 items-center">
                    <Tooltip title="Zoom Out">
                        <IconButton onClick={(e) => handleZoomClick("zoomout")}>
                            <MagnifyingGlassMinusIcon className="size-5 cursor-pointer fill-amber-600 opacity-55 hover:opacity-100" />
                        </IconButton>
                    </Tooltip>
                    <label htmlFor="none" className="flex gap-1.5 items-center justify-center">
                        <p className="text-xs text-amber-600">Zoom</p>
                    </label>
                    <Tooltip title="Zoom In">
                        <IconButton onClick={() => handleZoomClick("zoomin")}>
                            <MagnifyingGlassPlusIcon className="size-5 cursor-pointer fill-amber-600 opacity-55 hover:opacity-100" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="w-full flex items-center">
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        style={{ color: "oklch(66.6% 0.179 58.318)" }}
                        onChange={(e, value) => handleZoomChange(value)}
                        title="Slide to zoom in or out"
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <Tooltip title="Rotate Left">
                        <IconButton onClick={() => handleRotationChange("left")}>
                            <ArrowUturnLeftIcon className="size-5 cursor-pointer fill-amber-600 opacity-55 hover:opacity-100" />
                        </IconButton>
                    </Tooltip>
                    <label className="flex gap-1.5 items-center justify-center">
                        <p className="text-xs text-amber-600">Rotate</p>
                    </label>
                    <Tooltip title="Rotate Right">
                        <IconButton onClick={() => handleRotationChange("right")}>
                            <ArrowUturnRightIcon className="size-5 cursor-pointer fill-amber-600 opacity-55 hover:opacity-100" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

ImageCropper.propTypes = {
    uploadedImage: PropTypes.string,
    setImageProperties: PropTypes.func,
}

export default ImageCropper;
