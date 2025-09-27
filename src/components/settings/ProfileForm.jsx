import { useState } from "react"
import Button from "../shared/Button"
import Field from "../shared/Field"
import avatar from "../../assets/images/avatar.webp"

const PROFILE_FIELDS = [
    { label: "First Name", type: "text", name: "first-name", value: "Youssef", placeholder: "Your First Name" },
    { label: "Last Name", type: "text", name: "last-name", value: "Ahmed", placeholder: "Your Last Name" },
    { label: "Email", type: "email", name: "email", value: "youssef.ahmed5002@gmail.com", placeholder: "Your Email Address" },
];

const ProfileForm = () => {
    const defaultValues = PROFILE_FIELDS.reduce((acc, f) => ({ ...acc, [f.name]: f.value }), {});
    const [formValues, setFormValues] = useState(defaultValues);

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
                    <img src={avatar} alt="Your Profile" className="w-full" />
                </div>
                <Button styleType="light" className="max-w-fit">Change</Button>
            </div>

            <form className="w-full space-y-6">
                {PROFILE_FIELDS.map((field, index) => (
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