import { createSlice } from '@reduxjs/toolkit';
                                                
export const actualizar= createSlice({
    name: 'actualizar',
    initialState: {
        documento: {name:"",
        lastname:"",
        email:"",
        password:""}
    },
    reducers: {
        onActualizarDocumentos: (state, {payload}) => {
            state.documento=payload;
        },
    }
});
// Action creators are generated for each case reducer function
export const { onActualizarDocumentos } = actualizar.actions;