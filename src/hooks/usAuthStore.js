import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
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

    const startRegister = async ({ email, password, name}) => {
        dispatch(onChecking());
        try {
            const { data } = await iglesiaApi.post('/auth/new', { email, password, name});
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({name: data.name, uid: data.uid}) );
            
            if( data.name !== null && data.uid !== null ) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se ha registrado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }

        } catch (error) {
           dispatch(onLogout('Credenciales incorrectas'));
           setTimeout(() =>{
                dispatch(clearErrorMessage())
           }, 10)
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await iglesiaApi.get('renew');
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({name: data.name, uid: data.uid}) );

        } catch ( error ) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () =>{
        localStorage.clear();
        dispatch(onLogout());
    }
    return {
        //Propiedades
        errorMessage,
        status,
        user,


        //M??todos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}