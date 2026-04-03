// mockTransactions.js
// 45 transactions across 6 months (Jan–Jun 2024)
// Categories: Salary, Freelance, Food, Rent, Travel, Shopping, Bills, Healthcare, Entertainment, Investment

const mockTransactions = [
  // ── JANUARY ──────────────────────────────────────────────────────────────
  { id: "t001", date: "2024-01-01", description: "Opening Balance",         category: "Income",        type: "income",  amount: 12000  },
  { id: "t002", date: "2024-01-05", description: "Monthly Salary",          category: "Salary",        type: "income",  amount: 85000  },
  { id: "t003", date: "2024-01-07", description: "House Rent",              category: "Rent",          type: "expense", amount: 18000  },
  { id: "t004", date: "2024-01-09", description: "Zomato / Swiggy",         category: "Food",          type: "expense", amount: 2400   },
  { id: "t005", date: "2024-01-12", description: "Electricity Bill",        category: "Bills",         type: "expense", amount: 1850   },
  { id: "t006", date: "2024-01-15", description: "Freelance Project – A",   category: "Freelance",     type: "income",  amount: 22000  },
  { id: "t007", date: "2024-01-18", description: "Grocery – DMart",         category: "Food",          type: "expense", amount: 3200   },
  { id: "t008", date: "2024-01-20", description: "Netflix + Spotify",       category: "Entertainment", type: "expense", amount: 849    },
  { id: "t009", date: "2024-01-22", description: "SIP – Mutual Fund",       category: "Investment",    type: "expense", amount: 10000  },
  { id: "t010", date: "2024-01-25", description: "Pharmacy",                category: "Healthcare",    type: "expense", amount: 720    },
  { id: "t011", date: "2024-01-28", description: "Cab – Ola/Uber",          category: "Travel",        type: "expense", amount: 1100   },
  { id: "t012", date: "2024-01-30", description: "Amazon – Headphones",     category: "Shopping",      type: "expense", amount: 4999   },

  // ── FEBRUARY ─────────────────────────────────────────────────────────────
  { id: "t013", date: "2024-02-05", description: "Monthly Salary",          category: "Salary",        type: "income",  amount: 85000  },
  { id: "t014", date: "2024-02-07", description: "House Rent",              category: "Rent",          type: "expense", amount: 18000  },
  { id: "t015", date: "2024-02-10", description: "Doctor Consultation",     category: "Healthcare",    type: "expense", amount: 1500   },
  { id: "t016", date: "2024-02-12", description: "Restaurant – Birthday",   category: "Food",          type: "expense", amount: 3800   },
  { id: "t017", date: "2024-02-14", description: "Freelance Project – B",   category: "Freelance",     type: "income",  amount: 15000  },
  { id: "t018", date: "2024-02-16", description: "Internet Bill – Airtel",  category: "Bills",         type: "expense", amount: 999    },
  { id: "t019", date: "2024-02-19", description: "Flight – Mumbai Trip",    category: "Travel",        type: "expense", amount: 6800   },
  { id: "t020", date: "2024-02-22", description: "SIP – Mutual Fund",       category: "Investment",    type: "expense", amount: 10000  },
  { id: "t021", date: "2024-02-26", description: "Myntra – Clothes",        category: "Shopping",      type: "expense", amount: 2799   },

  // ── MARCH ────────────────────────────────────────────────────────────────
  { id: "t022", date: "2024-03-05", description: "Monthly Salary",          category: "Salary",        type: "income",  amount: 85000  },
  { id: "t023", date: "2024-03-07", description: "House Rent",              category: "Rent",          type: "expense", amount: 18000  },
  { id: "t024", date: "2024-03-09", description: "Grocery – BigBasket",     category: "Food",          type: "expense", amount: 2950   },
  { id: "t025", date: "2024-03-11", description: "Electricity Bill",        category: "Bills",         type: "expense", amount: 2100   },
  { id: "t026", date: "2024-03-14", description: "Freelance Project – C",   category: "Freelance",     type: "income",  amount: 30000  },
  { id: "t027", date: "2024-03-17", description: "Zomato / Swiggy",         category: "Food",          type: "expense", amount: 1800   },
  { id: "t028", date: "2024-03-20", description: "SIP – Mutual Fund",       category: "Investment",    type: "expense", amount: 10000  },
  { id: "t029", date: "2024-03-23", description: "Petrol",                  category: "Travel",        type: "expense", amount: 3500   },
  { id: "t030", date: "2024-03-27", description: "Gym Membership",          category: "Healthcare",    type: "expense", amount: 2000   },

  // ── APRIL ────────────────────────────────────────────────────────────────
  { id: "t031", date: "2024-04-05", description: "Monthly Salary",          category: "Salary",        type: "income",  amount: 85000  },
  { id: "t032", date: "2024-04-07", description: "House Rent",              category: "Rent",          type: "expense", amount: 18000  },
  { id: "t033", date: "2024-04-10", description: "IPL Tickets",             category: "Entertainment", type: "expense", amount: 3500   },
  { id: "t034", date: "2024-04-13", description: "Grocery – DMart",         category: "Food",          type: "expense", amount: 3100   },
  { id: "t035", date: "2024-04-16", description: "Mobile Recharge – Jio",   category: "Bills",         type: "expense", amount: 299    },
  { id: "t036", date: "2024-04-18", description: "Freelance Project – D",   category: "Freelance",     type: "income",  amount: 18000  },
  { id: "t037", date: "2024-04-21", description: "SIP – Mutual Fund",       category: "Investment",    type: "expense", amount: 10000  },
  { id: "t038", date: "2024-04-25", description: "Amazon – Books",          category: "Shopping",      type: "expense", amount: 1299   },

  // ── MAY ──────────────────────────────────────────────────────────────────
  { id: "t039", date: "2024-05-05", description: "Monthly Salary",          category: "Salary",        type: "income",  amount: 85000  },
  { id: "t040", date: "2024-05-07", description: "House Rent",              category: "Rent",          type: "expense", amount: 18000  },
  { id: "t041", date: "2024-05-10", description: "Electricity Bill",        category: "Bills",         type: "expense", amount: 2400   },
  { id: "t042", date: "2024-05-13", description: "Goa Trip – Hotel+Flight", category: "Travel",        type: "expense", amount: 14500  },
  { id: "t043", date: "2024-05-17", description: "Restaurant – Goa",        category: "Food",          type: "expense", amount: 4200   },
  { id: "t044", date: "2024-05-21", description: "SIP – Mutual Fund",       category: "Investment",    type: "expense", amount: 10000  },
  { id: "t045", date: "2024-05-28", description: "Flipkart – Smartwatch",   category: "Shopping",      type: "expense", amount: 8999   },
];

export default mockTransactions;

// ─── DERIVED CONSTANTS ───────────────────────────────────────────────────────
export const CATEGORIES = [
  "Salary",
  "Freelance",
  "Income",
  "Rent",
  "Food",
  "Bills",
  "Travel",
  "Shopping",
  "Healthcare",
  "Entertainment",
  "Investment",
];

export const CATEGORY_COLORS = {
  Salary:        "#6366f1",
  Freelance:     "#8b5cf6",
  Income:        "#06b6d4",
  Rent:          "#f43f5e",
  Food:          "#f97316",
  Bills:         "#eab308",
  Travel:        "#14b8a6",
  Shopping:      "#ec4899",
  Healthcare:    "#10b981",
  Entertainment: "#a855f7",
  Investment:    "#3b82f6",
};