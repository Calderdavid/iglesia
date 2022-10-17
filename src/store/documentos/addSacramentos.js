import { createSlice } from '@reduxjs/toolkit';
                                                
export const addSacramentos = createSlice({
    name: 'addsacramentos',
    initialState: {
        ShowBautismo: false,
        ShowConfirmacion: false,
        ShowMatrimonio: false,
        Editar: false,
    },
    reducers: {
        onShowMatrimonio: (state, {payload}) => {
            state.ShowMatrimonio = payload;
        },
        onShowBautismo: (state, {payload}) => {
            state.ShowBautismo = payload;
        },
        onShowConfirmacion: (state, {payload}) => {
            state.ShowConfirmacion = payload;
        },
        onEdit: (state, {payload}) => {
            state.Editar = payload;
        },
    }
});
// Action creators are generated for each case reducer function
export const { onAddBautismo, onAddConfirmacion, onAddMatrimonio, onShowBautismo, onShowConfirmacion, onShowMatrimonio, onEdit } = addSacramentos.actions;