import { createSlice } from '@reduxjs/toolkit';
                                                
export const addDocument = createSlice({
    name: 'adddocument',
    initialState: {
        Show: false,
        DocumentInfo:{
            Documento: {
                n_id: "",
                rut: "",
                name: "",
                lastname: "",
                birth: "",
                birthplace: "",
                email: "",
                Obs: "",
                inscr_Date: "",
                address: "",
                phone: "",
                Referencia: "",
            },
            A_parent: false,
            parent_Data:{
                p_father: "",
                p_mother: "",
                p_phone_father: "",
                p_phone_mother: "",
                p_lugar: "",
                p_parent_Status: "",
                p_relation: "",
            },
            A_bautismo: false,
            Bautismo:{
                b_place1: "",
                b_place2: "",
                b_date: "",
                b_father: "",
                b_padrino: "",
                b_padrino_data: {
                    older: false,
                    bautizado: false,
                    p_comunion: false,
                    confirmado: false,
                    casado: false,
                    casado_iglesia: false,
                },
                b_madrina: "",
                b_madrina_data: {
                    older: false,
                    bautizado: false,
                    p_comunion: false,
                    confirmado: false,
                    casado: false,
                    casado_iglesia: false,
                },
            },
            A_confirmacion: false,
            Confirmacion:{
                c_place1: "IGLESIA_PARROQUIAL",
                c_place2: "",
                c_date: "",
                c_father: "",
                c_padrino: "",
                c_madrina: "",
            },
            A_matrimonio: false,
            Matrimonio:{
                m_place1: "IGLESIA_PARROQUIAL",
                m_place2: "",
                m_partner: "",
                m_date: "",
                m_father: "",
                m_padrino: "",
                m_madrina: "",
            },
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