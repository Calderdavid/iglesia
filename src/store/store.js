import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { uiSlice } from "./ui/uiSlice";
import { addUser } from "./usuarios/addUser";
import { actualizarDocumentos } from "./documentos/actualizardocumento"
export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        adduser: addUser.reducer,
        actualizardocumentos: actualizarDocumentos.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})