import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../shared/Button"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import VisaIcon from '../../assets/icons/Visa'

const SubscriptionForm = () => {
    const [currentPlan] = useState({
        name: "Premium Plan",
        price: 9.99,
        renewalDate: "2025-10-22",
    });

    const [paymentMethod] = useState({
        cardType: "Visa",
        last4: "4242",
        expiry: "12/26",
    });

    const availablePlans = [
        {
            name: "Free",
            price: "0",
            features: ["Basic meal planning", "Standard recipe access", "Community support"],
            cta: "Downgrade to Free",
            style: "light",
        },
        {
            name: "Premium",
            price: "9.99",
            features: ["Unlimited meal plans", "Premium recipe library", "Advanced nutritional tracking", "Priority support"],
            cta: "Current Plan",
            style: "primary",
            isCurrent: true,
        },
        {
            name: "Family",
            price: "15.99",
            features: ["All Premium features", "Up to 5 family members", "Shared grocery lists"],
            cta: "Upgrade to Family",
            style: "outline",
        },
    ];

    const handlePlanChange = (planName) => {
        console.log(`Changing plan to ${planName}`);
        // Logic to handle plan change, possibly opening a confirmation modal or Stripe Checkout
    };

    return (
        <>
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold">Subscription & Billing</h1>
                <p className="font-medium">Manage your subscription, payment details, and billing history.</p>
            </div>

            {/* Current Plan & Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 border rounded-lg bg-gray-50/50">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Plan</h2>
                    <div className="space-y-3">
                        <p className="text-2xl font-bold text-amber-600">{currentPlan.name}</p>
                        <p className="text-gray-600">
                            <span className="font-semibold">${currentPlan.price}/month</span>. Renews on {new Date(currentPlan.renewalDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                        </p>
                        <Button styleType="light" className="w-full md:w-auto">Cancel Subscription</Button>
                    </div>
                </div>
                <div className="p-6 border rounded-lg bg-gray-50/50">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Method</h2>
                    <div className="flex flex-col items-center justify-between space-y-4 lg:space-y-0 lg:flex-row">
                        <div className="flex items-center gap-4">
                            <VisaIcon className="size-8 text-4xl text-blue-900" />
                            <div>
                                <p className="font-semibold">{paymentMethod.cardType} ending in {paymentMethod.last4}</p>
                                <p className="text-sm text-gray-500">Expires {paymentMethod.expiry}</p>
                            </div>
                        </div>
                        <Button styleType="outline" className={"lg:max-w-fit"}>Update</Button>
                    </div>
                    <Link className="text-sm text-amber-600 hover:underline mt-4 inline-block">View Billing History</Link>
                </div>
            </div>

            {/* Change Plan */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Change Your Plan</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {availablePlans.map((plan) => (
                        <div key={plan.name} className={`p-6 border rounded-lg flex flex-col ${plan.isCurrent ? 'border-amber-500' : ''}`}>
                            <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                            <p className="text-3xl font-extrabold my-4">${plan.price}<span className="text-base font-medium text-gray-500">/mo</span></p>
                            <ul className="space-y-2 mb-6 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircleIcon className="size-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                styleType={plan.style}
                                onClick={() => handlePlanChange(plan.name)}
                                disabled={plan.isCurrent}
                                className="w-full"
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SubscriptionForm;