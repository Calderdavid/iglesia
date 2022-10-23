import { createSlice } from '@reduxjs/toolkit';
                                                
export const getUser = createSlice({
    name: 'getuser',
    initialState: {
        UserOrder: [{
            _id: "",
            name: "",
            lastname: "",
            email: "",
            password_id: "",
            rol: "NINGUNO",
            lastSeen: ""
        }]
    },
    reducers: {
        onGetUser: (state, {payload}) => {
            state.UserOrder = payload;
        },
    }
});
// Action creators are generated for each case reducer function
export const { onGetUser } = getUser.actions;