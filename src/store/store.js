import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { uiSlice } from "./ui/uiSlice";
import { addUser } from "./usuarios/addUser";
import { actualizarDocumentos } from "./documentos/actualizardocumento"
import { addDocument } from "./documentos/addDocument";
import { addSacramentos } from "./documentos/addSacramentos";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        adduser: addUser.reducer,
        adddocument: addDocument.reducer,
        actualizardocumentos: actualizarDocumentos.reducer,
        addsacramentos: addSacramentos.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})