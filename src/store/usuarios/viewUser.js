import { createSlice } from '@reduxjs/toolkit';
                                                
export const viewUser = createSlice({
    name: 'viewuser',
    initialState: {
        Ver: false,
        VerYEditar: false,
        UserData:{
            _id: "",
            name: "",
            lastname: "",
            email: "",
            password_id: "",
            rol: "NINGUNO",
            lastSeen: ""
        },
        password: {
            password: ""
        }
    },
    reducers: {
        onViewUser: (state, {payload}) => {
            state.Ver = payload;
        },
        onEditUser: (state, {payload}) => {
            state.UserData = payload;
        },
        onEditPass: (state, {payload}) => {
            state.password = payload;
        },
        onVerYEditar: (state, {payload}) => {
            state.VerYEditar = payload;
        },
    }
});
// Action creators are generated for each case reducer function
export const { onEditPass, onViewUser, onEditUser, onVerYEditar } = viewUser.actions;