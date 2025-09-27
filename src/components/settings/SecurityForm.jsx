import { useState } from "react"
import Button from "../shared/Button"
import Field from "../shared/Field"
import GoogleIcon from "../../assets/icons/Google"
import MicrosoftIcon from "../../assets/icons/Microsoft"
import FacebookIcon from "../../assets/icons/Facebook"

const PROVIDER_ICONS = {
    Google: <GoogleIcon className="text-red-500" />,
    Microsoft: <MicrosoftIcon className="text-blue-500" />,
    Facebook: <FacebookIcon className="text-blue-800" />,
};

const SecurityForm = () => {
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [linkedAccounts, setLinkedAccounts] = useState([
        { id: 1, provider: "Google", email: "youssef.ahmed5002@gmail.com", linkedAt: "2025-08-15" },
        { id: 2, provider: "Microsoft", email: "y.ahmed@outlook.com", linkedAt: "2025-09-01" },
    ]);
    
    const [setIsAuthModalOpen] = useState(false);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // Logic to verify current password before showing modal
        console.log("Opening authentication modal for password change...");
        setIsAuthModalOpen(true);
    };

    const handleUnlinkAccount = (id) => {
        setLinkedAccounts((prev) => prev.filter((acc) => acc.id !== id));
    };

    const handleExportData = () => {
        console.log("Exporting user data...");
        // This would trigger a download
    };

    const handleDeleteAccount = () => {
        // This should open a confirmation modal
        if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
            console.log("Deleting account...");
        }
    };

    const passwordsFilled = passwords.current && passwords.new && passwords.confirm;
    const passwordsMatch = passwords.new === passwords.confirm;

    return (
        <>
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold">Security & Privacy</h1>
                <p className="font-medium">Manage your password, two-factor authentication, and other security settings.</p>
            </div>

            {/* Change Password */}
            <div className="mb-8 p-6 border rounded-lg bg-gray-50/50">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <Field label="Current Password" type="password" id={"current"} name="current" value={passwords.current} onChange={handlePasswordChange} placeholder="Enter your current password" />
                    <Field label="New Password" type="password" id={"new"} name="new" value={passwords.new} onChange={handlePasswordChange} placeholder="Enter a new password" />
                    <Field label="Confirm New Password" type="password" id={"confirm"} name="confirm" value={passwords.confirm} onChange={handlePasswordChange} placeholder="Confirm your new password" />
                    {!passwordsMatch && passwords.confirm && <p className="text-red-500 text-sm">New passwords do not match.</p>}
                    <Button type="submit" styleType="primary" disabled={!passwordsFilled || !passwordsMatch}>
                        Change Password
                    </Button>
                </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="mb-8 p-6 border rounded-lg bg-gray-50/50">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Two-Factor Authentication</h2>
                <div className="space-y-1 mb-4">
                    <p className="text-gray-600">Add an extra layer of security to your account.</p>
                    <h6 className={`font-semibold ${twoFactorEnabled ? "text-green-600" : "text-gray-500"}`}>
                        {twoFactorEnabled ? "Enabled" : "Disabled"}
                    </h6>
                </div>
                <Button styleType={twoFactorEnabled ? "light" : "primary"} onClick={() => setTwoFactorEnabled((prev) => !prev)}>
                    {twoFactorEnabled ? "Disable" : "Enable"}
                </Button>
            </div>

            {/* Linked Accounts */}
            <div className="mb-8 p-6 border rounded-lg bg-gray-50/50">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Linked Accounts</h2>
                <div className="space-y-4">
                    {linkedAccounts.length > 0 ? (
                        linkedAccounts.map((account) => (
                            <div key={account.id} className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-start md:items-center p-3 border rounded-md overflow-hidden">
                                <div className="flex justify-center items-center gap-4">
                                    <span className="text-2xl">{PROVIDER_ICONS[account.provider]}</span>
                                    <div>
                                        <p className="font-semibold text-gray-700">{account.provider}</p>
                                        <p className="text-sm text-gray-500">{account.email}</p>
                                    </div>
                                </div>
                                <Button styleType="outline" className={"md:max-w-fit"} onClick={() => handleUnlinkAccount(account.id)}>
                                    Unlink
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No accounts are linked.</p>
                    )}
                </div>
            </div>

            {/* Manage Data */}
            <div className="mb-8 p-6 border rounded-lg bg-red-50 border-red-200">
                <h2 className="text-xl font-semibold mb-4 text-red-800">Manage Data</h2>
                <div className="space-y-5">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div>
                            <h3 className="font-semibold text-gray-800">Export Data</h3>
                            <p className="text-gray-600 text-sm">Download a copy of your data in a machine-readable format.</p>
                        </div>
                        <Button styleType="light" className={"md:max-w-fit"} onClick={handleExportData}>
                            Export
                        </Button>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div>
                            <h3 className="font-semibold text-red-800">Delete Account</h3>
                            <p className="text-red-700/80 text-sm">Permanently delete your account and all associated data.</p>
                        </div>
                        <Button styleType="danger" className={"md:max-w-fit"} onClick={handleDeleteAccount}>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SecurityForm;