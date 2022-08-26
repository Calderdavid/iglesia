import { useDispatch, useSelector } from "react-redux";
import iglesiaApi from '../api/iglesiaApi'
import { onChecking, onLogin, onLogout, clearErrorMessage } from '../store/auth/authSlice';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector ( state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({email, password}) => {
        dispatch(onChecking());

        try {
            const { data } = await iglesiaApi.post('/auth', {email, password});
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({name: data.status, msg: data.msg}) );

        } catch (error) {
           dispatch(onLogout('Credenciales incorrectas'));
           setTimeout(() =>{
                dispatch(clearErrorMessage())
           }, 10)
        }
    }


    return {
        //Propiedades
        errorMessage,
        status,
        user,


        //Métodos
        startLogin,

    }
}