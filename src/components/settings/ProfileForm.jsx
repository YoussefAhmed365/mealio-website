// Components
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../shared/Button";
import Field from "../shared/Field";
import ImageUploadModal from "./profilePhoto/ImageUploadModal.jsx";

// UI
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { PencilIcon } from "@heroicons/react/24/solid";

const ProfileForm = () => {
    const { user, updateProfile, profilePhoto, updateProfilePhoto } = useAuth();

    // Profile Photo Handler
    const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
    const [profileImageUpdated, setProfileImageUpdated] = useState(false);

    const onEditClick = () => {
        setProfileImageUpdated(false);
        setOpenImageUploadModal(true);
    };

    const handleClose = () => {
        setProfileImageUpdated(true);
        setOpenImageUploadModal(false);
    };

    useEffect(() => {
        if (profileImageUpdated) {
            window.location.reload();
        }
    }, [profileImageUpdated])

    // Get user data
    const USER_DATA = [
        { label: "Firstname", type: "text", name: "firstname", placeholder: "Your first name" },
        { label: "Lastname", type: "text", name: "lastname", placeholder: "Your last name" },
        { label: "Email", type: "email", name: "email", placeholder: "Your email" }
    ];

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const result = await updateProfile({
            firstName: formValues.firstname,
            lastName: formValues.lastname,
            email: formValues.email
        });

        if (result.success) {
            setSuccess("Profile updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } else {
            setError(result.message || "Failed to update profile");
            setTimeout(() => setError(""), 5000);
        }
    };

    // Get fields values
    const defaultValues = {
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || ""
    };

    const [formValues, setFormValues] = useState(defaultValues);

    useEffect(() => {
        if (user) {
            setFormValues({
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                email: user.email || ""
            });
        }
    }, [user]);

    // Check for fields' values changed
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const isChanged = JSON.stringify(formValues) !== JSON.stringify(defaultValues);

    return (
        <>
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Edit Profile</h1>
                <p className="font-medium">
                    Keep your personal details private. Information you add here is visible to anyone who can view your profile.
                </p>
            </div>

            <div className="relative w-fit">
                <div className="size-28 rounded-full overflow-hidden">
                    <img
                        src={profilePhoto}
                        alt="Your Profile"
                        className="size-full object-cover object-center"
                    />
                </div>

                <div className="absolute bottom-0 right-0">
                    <Menu>
                        <MenuButton className="rounded-full bg-gray-100 p-3 transition-colors focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-200 data-open:bg-gray-200">
                            <PencilIcon className="size-5 fill-slate-600" />
                        </MenuButton>

                        <MenuItems
                            transition
                            anchor="bottom start"
                            className="mt-2 w-52 origin-top-right rounded-xl bg-slate-50 border border-slate-200 p-1 text-sm/6 text-gray-900 transition duration-300 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                        >
                            {/* Implement a function to change the profile photo */}
                            <MenuItem>
                                <button
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition-colors hover:bg-slate-200 cursor-pointer"
                                    onClick={onEditClick}
                                >
                                    Change Photo
                                </button>
                            </MenuItem>
                            <div className="my-1 h-px bg-slate-200" />
                            <MenuItem>
                                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition-colors hover:bg-slate-200 text-red-700 cursor-pointer">
                                    Remove
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>

                {openImageUploadModal && (
                    <ImageUploadModal
                        openModal={openImageUploadModal}
                        handleClose={() => handleClose()}
                    />
                )}
            </div>

            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}

            <form onSubmit={handleSubmit} className="w-full space-y-4">
                {USER_DATA.map((field, index) => (
                    <Field
                        key={index}
                        label={field.label}
                        type={field.type}
                        name={field.name}
                        value={formValues[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                    />
                ))}
                <Button styleType="primary" type="submit" disabled={!isChanged}>Save</Button>
            </form>
        </>
    );
};

export default ProfileForm;