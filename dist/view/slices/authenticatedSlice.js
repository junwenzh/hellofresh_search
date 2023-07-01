"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthenticated = exports.authenticatedSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    authenticated: false,
};
exports.authenticatedSlice = (0, toolkit_1.createSlice)({
    name: 'authenticated',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.authenticated = action.payload;
        },
    },
});
exports.setAuthenticated = exports.authenticatedSlice.actions.setAuthenticated;
exports.default = exports.authenticatedSlice.reducer;
