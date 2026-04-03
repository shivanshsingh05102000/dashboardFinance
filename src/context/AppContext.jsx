import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import mockTransactions, { CATEGORIES } from "../data/mockTransactions";
import { applyFilters } from "../utils/finance";

const STORAGE_KEYS = {
  transactions: "fd_transactions_v2",
  role: "fd_role_v2",
  theme: "fd_theme_v2",
};

export const ACTIONS = {
  ADD_TRANSACTION: "ADD_TRANSACTION",
  EDIT_TRANSACTION: "EDIT_TRANSACTION",
  DELETE_TRANSACTION: "DELETE_TRANSACTION",
  SET_ROLE: "SET_ROLE",
  SET_FILTERS: "SET_FILTERS",
  RESET_FILTERS: "RESET_FILTERS",
  SET_THEME: "SET_THEME",
};

export const DEFAULT_FILTERS = {
  search: "",
  type: "all",
  category: "all",
  sortBy: "date-desc",
};

function getSystemTheme() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function isValidTransactionList(value) {
  return Array.isArray(value) && value.every((item) => item && item.id && item.date);
}

function getInitialState() {
  try {
    const storedTransactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.transactions));
    const storedRole = localStorage.getItem(STORAGE_KEYS.role);
    const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);

    return {
      transactions: isValidTransactionList(storedTransactions) ? storedTransactions : mockTransactions,
      role: storedRole === "admin" ? "admin" : "viewer",
      filters: { ...DEFAULT_FILTERS },
      theme: storedTheme === "dark" || storedTheme === "light" ? storedTheme : getSystemTheme(),
    };
  } catch {
    return {
      transactions: mockTransactions,
      role: "viewer",
      filters: { ...DEFAULT_FILTERS },
      theme: getSystemTheme(),
    };
  }
}

function createTransactionId() {
  return `tx_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TRANSACTION: {
      const transaction = {
        ...action.payload,
        id: createTransactionId(),
      };

      return {
        ...state,
        transactions: [transaction, ...state.transactions],
      };
    }

    case ACTIONS.EDIT_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item,
        ),
      };

    case ACTIONS.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((item) => item.id !== action.payload.id),
      };

    case ACTIONS.SET_ROLE:
      return {
        ...state,
        role: action.payload.role === "admin" ? "admin" : "viewer",
      };

    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filters: { ...DEFAULT_FILTERS },
      };

    case ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload.theme,
      };

    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, undefined, getInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.role, state.role);
  }, [state.role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, state.theme);
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  const addTransaction = useCallback(
    (payload) => dispatch({ type: ACTIONS.ADD_TRANSACTION, payload }),
    [],
  );

  const editTransaction = useCallback(
    (payload) => dispatch({ type: ACTIONS.EDIT_TRANSACTION, payload }),
    [],
  );

  const deleteTransaction = useCallback(
    (id) => dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: { id } }),
    [],
  );

  const setRole = useCallback(
    (role) => dispatch({ type: ACTIONS.SET_ROLE, payload: { role } }),
    [],
  );

  const setTheme = useCallback(
    (theme) => dispatch({ type: ACTIONS.SET_THEME, payload: { theme } }),
    [],
  );

  const setFilters = useCallback(
    (payload) => dispatch({ type: ACTIONS.SET_FILTERS, payload }),
    [],
  );

  const resetFilters = useCallback(
    () => dispatch({ type: ACTIONS.RESET_FILTERS }),
    [],
  );

  const categories = useMemo(() => {
    const availableCategories = state.transactions.map((item) => item.category);
    return Array.from(new Set([...CATEGORIES, ...availableCategories]));
  }, [state.transactions]);

  const filteredTransactions = useMemo(
    () => applyFilters(state.transactions, state.filters),
    [state.transactions, state.filters],
  );

  const value = useMemo(
    () => ({
      transactions: state.transactions,
      filteredTransactions,
      categories,
      role: state.role,
      theme: state.theme,
      filters: state.filters,
      isAdmin: state.role === "admin",
      addTransaction,
      editTransaction,
      deleteTransaction,
      setRole,
      setTheme,
      setFilters,
      resetFilters,
    }),
    [
      state.transactions,
      filteredTransactions,
      categories,
      state.role,
      state.theme,
      state.filters,
      addTransaction,
      editTransaction,
      deleteTransaction,
      setRole,
      setTheme,
      setFilters,
      resetFilters,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}

export function useFilteredTransactions() {
  const { filteredTransactions } = useAppContext();
  return filteredTransactions;
}