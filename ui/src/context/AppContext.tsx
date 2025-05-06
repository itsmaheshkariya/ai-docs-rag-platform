"use client";

import { createContext, useReducer, ReactNode, Dispatch } from "react";

// Define types
interface State {
    count: number;
}

type Action = { type: "T" } | { type: "X" };

type AppContextType = {
    state: State;
    dispatch: Dispatch<Action>;
};

// Initial state
const initialState: State = {
    count: 0,
};

// Reducer function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "T":
            return { ...state, count: state.count + 1 };
        case "X":
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};

// Create Context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};