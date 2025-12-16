// Components
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../shared/Button";
import Field from "../shared/Field";

// Images
import avatar from "../../assets/images/avatar.webp";

const ProfileForm = () => {
    const { user, updateProfile } = useAuth();

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

            <div className="flex justify-start items-center space-x-6">
                <div className="rounded-full w-24 h-24 overflow-hidden object-center">
                    <img src={avatar} alt="Your Profile" className="w-full h-full object-cover" />
                </div>
                <Button styleType="light" className="max-w-fit">Change</Button>
            </div>

            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}

            <form onSubmit={handleSubmit} className="w-full space-y-6">
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