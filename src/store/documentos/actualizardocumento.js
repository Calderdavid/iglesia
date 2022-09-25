import { createSlice } from '@reduxjs/toolkit';
                                                
export const actualizarDocumentos= createSlice({
    name: 'actualizardocumentos',
    initialState: {
        documento: {
            name:"",
            lastname:"",
            email:"",
            password:""
        },
    },
    reducers: {
        onActualizarDocumentos: (state, {payload}) => {
            state.documento = payload;
        },
    }
});
// Action creators are generated for each case reducer function
export const { onActualizarDocumentos } = actualizarDocumentos.actions;