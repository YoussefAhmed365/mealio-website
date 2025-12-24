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
        <div className="flex flex-col items-center w-full gap-6">
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-md border-4 border-gray-100">
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
            </div>
            <div className="flex flex-col gap-4 w-full px-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Tooltip title="Zoom Out">
                            <IconButton onClick={() => handleZoomClick("zoomout")} size="small">
                                <MagnifyingGlassMinusIcon className="size-5 text-amber-600" />
                            </IconButton>
                        </Tooltip>
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            sx={{ color: '#d97706' }}
                            onChange={(e, value) => handleZoomChange(value)}
                            title="Slide to zoom in or out"
                        />
                        <Tooltip title="Zoom In">
                            <IconButton onClick={() => handleZoomClick("zoomin")} size="small">
                                <MagnifyingGlassPlusIcon className="size-5 text-amber-600" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-4">
                    <Tooltip title="Rotate Left">
                        <IconButton onClick={() => handleRotationChange("left")} size="small">
                            <ArrowUturnLeftIcon className="size-5 text-amber-600" />
                        </IconButton>
                    </Tooltip>
                    <span className="text-sm font-medium text-amber-600">Rotate</span>
                    <Tooltip title="Rotate Right">
                        <IconButton onClick={() => handleRotationChange("right")} size="small">
                            <ArrowUturnRightIcon className="size-5 text-amber-600" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

ImageCropper.propTypes = {
    uploadedImage: PropTypes.string,
    setImageProperties: PropTypes.func,
}

export default ImageCropper;
