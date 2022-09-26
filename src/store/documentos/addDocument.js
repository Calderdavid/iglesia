import { createSlice } from '@reduxjs/toolkit';
                                                
export const addDocument = createSlice({
    name: 'adddocument',
    initialState: {
        Show: false
    },
    reducers: {
        onAddDocument: (state, {payload}) => {
            state.Show = payload;
        },
    }
});
// Action creators are generated for each case reducer function
export const { onAddDocument } = addDocument.actions;