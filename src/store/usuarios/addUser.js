import { createSlice } from '@reduxjs/toolkit';
                                                
export const addUser = createSlice({
    name: 'adduser',
    initialState: {
        Show: false
    },
    reducers: {
        onAddUser: (state, {payload}) => {
            state.Show = payload;
        },
    }
});
// Action creators are generated for each case reducer function
export const { onAddUser } = addUser.actions;