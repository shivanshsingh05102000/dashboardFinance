import { createContext, useContext, useReducer, useEffect, useMemo } from "react";
import mockTransactions from "../data/mockTransactions";

export const ACTIONS = {
  ADD_TRANSACTION:    "ADD_TRANSACTION",
  EDIT_TRANSACTION:   "EDIT_TRANSACTION",
  DELETE_TRANSACTION: "DELETE_TRANSACTION",
  SET_ROLE:           "SET_ROLE",
  SET_FILTER:         "SET_FILTER",
  RESET_FILTERS:      "RESET_FILTERS",
};


export const DEFAULT_FILTERS = {
  search:   "",
  type:     "all",       
  category: "all",        
  sortBy:   "date-desc", 
};

function getInitialState() {
  try {
    const stored = localStorage.getItem("fdash_transactions");
    const transactions = stored ? JSON.parse(stored) : mockTransactions;
    return {
      transactions,
      role: "viewer",
      filters: { ...DEFAULT_FILTERS },
    };
  } catch {
    return {
      transactions: mockTransactions,
      role: "viewer",
      filters: { ...DEFAULT_FILTERS },
    };
  }
}

function appReducer(state, action) {
  switch (action.type) {

    case ACTIONS.ADD_TRANSACTION: {
      const newTx = { ...action.payload, id: `t${Date.now()}` };
      return { ...state, transactions: [newTx, ...state.transactions] };
    }

    case ACTIONS.EDIT_TRANSACTION: {
      return {
        ...state,
        transactions: state.transactions.map((tx) =>
          tx.id === action.payload.id ? { ...tx, ...action.payload } : tx
        ),
      };
    }

    case ACTIONS.DELETE_TRANSACTION: {
      return {
        ...state,
        transactions: state.transactions.filter((tx) => tx.id !== action.payload.id),
      };
    }

    case ACTIONS.SET_ROLE: {
      return { ...state, role: action.payload.role };
    }

    case ACTIONS.SET_FILTER: {
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
      };
    }

    case ACTIONS.RESET_FILTERS: {
      return { ...state, filters: { ...DEFAULT_FILTERS } };
    }

    default:
      return state;
  }
}


const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem("fdash_transactions", JSON.stringify(state.transactions));
    } catch {
    }
  }, [state.transactions]);


  const addTransaction    = (payload)        => dispatch({ type: ACTIONS.ADD_TRANSACTION,    payload });
  const editTransaction   = (payload)        => dispatch({ type: ACTIONS.EDIT_TRANSACTION,   payload });
  const deleteTransaction = (id)             => dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: { id } });
  const setRole           = (role)           => dispatch({ type: ACTIONS.SET_ROLE,           payload: { role } });
  const setFilter         = (key, value)     => dispatch({ type: ACTIONS.SET_FILTER,         payload: { key, value } });
  const resetFilters      = ()               => dispatch({ type: ACTIONS.RESET_FILTERS });

  return (
    <AppContext.Provider value={{
      transactions: state.transactions,
      role:         state.role,
      filters:      state.filters,
      isAdmin:      state.role === "admin",
      addTransaction,
      editTransaction,
      deleteTransaction,
      setRole,
      setFilter,
      resetFilters,
    }}>
      {children}
    </AppContext.Provider>
  );
}


export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside <AppProvider>");
  return ctx;
}


export function useFilteredTransactions() {
  const { transactions, filters } = useAppContext();

  return useMemo(() => {
    let result = [...transactions];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.description.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q)
      );
    }


    if (filters.type !== "all") {
      result = result.filter((tx) => tx.type === filters.type);
    }

    if (filters.category !== "all") {
      result = result.filter((tx) => tx.category === filters.category);
    }


    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "date-desc":   return new Date(b.date) - new Date(a.date);
        case "date-asc":    return new Date(a.date) - new Date(b.date);
        case "amount-desc": return b.amount - a.amount;
        case "amount-asc":  return a.amount - b.amount;
        default:            return 0;
      }
    });

    return result;
  }, [transactions, filters]);
}

export function useSummaryStats() {
  const { transactions } = useAppContext();

  return useMemo(() => {
    const totalIncome  = transactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const totalExpense = transactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const balance = totalIncome - totalExpense;

    const byCategory = transactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
        return acc;
      }, {});

    const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];


    const monthly = {};
    transactions.forEach((tx) => {
      const key = tx.date.slice(0, 7); // "YYYY-MM"
      if (!monthly[key]) monthly[key] = { income: 0, expense: 0 };
      monthly[key][tx.type] += tx.amount;
    });

    const monthlyArray = Object.entries(monthly)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month,
        label: new Date(month + "-01").toLocaleString("default", {
          month: "short",
          year:  "2-digit",
        }),
        income:  data.income,
        expense: data.expense,
        net:     data.income - data.expense,
      }));

    return {
      totalIncome,
      totalExpense,
      balance,
      byCategory,
      topCategory: topCategory
        ? { name: topCategory[0], amount: topCategory[1] }
        : null,
      monthlyArray,
      savingsRate:
        totalIncome > 0
          ? ((balance / totalIncome) * 100).toFixed(1)
          : "0.0",
    };
  }, [transactions]);
}