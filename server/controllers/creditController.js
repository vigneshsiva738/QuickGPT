const plans = [
  {
    _id: "basic",
    name: "Basic",
    price: 799,
    credits: 100,
    features: [
      "100 text generations",
      "50 image generations",
      "Standard support",
      "Access to basic models",
    ],
  },
  {
    _id: "pro",
    name: "Pro",
    price: 1499,
    credits: 500,
    features: [
      "500 text generations",
      "200 image generations",
      "Priority support",
      "Access to pro models",
      "Faster response time",
    ],
  },
  {
    _id: "premium",
    name: "Premium",
    price: 2799,
    credits: 1000,
    features: [
      "1000 text generations",
      "500 image generations",
      "24/7 VIP support",
      "Access to premium models",
      "Dedicated account manager",
    ],
  },
];

// API for Getting All Plans

export const getPlans = async(req, res) => {
    try {
        res.json({success: true, plans})
    } catch(error) {
        res.json({success: false, message: error.message})
    }
};