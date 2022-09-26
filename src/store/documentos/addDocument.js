import { createSlice } from '@reduxjs/toolkit';
                                                
export const addDocument = createSlice({
    name: 'adddocument',
    initialState: {
        Show: false,
        DocumentInfo: {
            name: "",
            lastname: "",
            email: "",
            phone: "",
            inscr_Date: "",
            Referencia: ""
        },
        VerYEditar: false,
    },
    reducers: {
        onAddDocument: (state, {payload}) => {
            state.Show = payload;
        },
        onEditDocument: (state, {payload}) => {
            state.DocumentInfo = payload;
        },
        onVerYEditar: (state, {payload}) => {
            state.VerYEditar = payload;
        },
    }
});
// Action creators are generated for each case reducer function
export const { onAddDocument, onEditDocument, onVerYEditar } = addDocument.actions;