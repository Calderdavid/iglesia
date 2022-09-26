import { createSlice } from '@reduxjs/toolkit';
                                                
export const addSacramentos = createSlice({
    name: 'addsacramentos',
    initialState: {
        Bautismo: {
            padrino: "",
            madrina: "",
            fecha: "",
            padre: "",
            lugar: ""
        },
        ShowBautismo: false,
        Confirmacion: {
            padrino: "",
            madrina: "",
            fecha: "",
            padre: "",
            lugar: ""
        },
        ShowConfirmacion: false,
        Matrimonio: {
            padrino: "",
            madrina: "",
            fecha: "",
            padre: "",
            lugar: "",
            pareja: ""
        },
        ShowMatrimonio: false,
    },
    reducers: {
        onAddBautismo: (state, {payload}) => {
            state.Bautismo = payload;
        },
        onAddConfirmacion: (state, {payload}) => {
            state.Confirmacion = payload;
        },
        onAddMatrimonio: (state, {payload}) => {
            state.Matrimonio = payload;
        },
        onShowMatrimonio: (state, {payload}) => {
            state.ShowMatrimonio = payload;
        },
        onShowBautismo: (state, {payload}) => {
            state.ShowBautismo = payload;
        },
        onShowConfirmacion: (state, {payload}) => {
            state.ShowConfirmacion = payload;
        },
    }
});
// Action creators are generated for each case reducer function
export const { onAddBautismo, onAddConfirmacion, onAddMatrimonio, onShowBautismo, onShowConfirmacion, onShowMatrimonio } = addSacramentos.actions;