import { useEffect, useState, createContext } from 'react';
import firebase from '../services/firebaseConnection';
import {toast} from 'react-toastify';


export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [ user, setUser ] = useState(null)
    const [ loadingAuth, setLoadingAuth ] = useState(false);
    const [ loadin, setLoading ] = useState(true);

    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');

            if(storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            
            setLoading(false);
        }

        loadStorage();
        
    },[])

    // Função para o usuario 'logar' no sistema
    async function signIn(email, password) {
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                name: userProfile.data().name,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem vindo de volta');
        })


        .catch((error) =>{
            console.log(error);
            toast.error('Ops... Algo deu errado!')
            setLoadingAuth(false);
        })
    }

    // Função para cadastrar um usuário
    async function signUp(email, password, name) {
        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid).set({
                name: name,
                avatarUrl: null,
            })
            .then( () => {

                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.sucess('Bem vindo a plataforma');

            })
        })
        .catch((error) =>{
            console.log(error);
            toast.error('Ops... Algo deu errado!')
            setLoadingAuth(false); // Removendo o loading caso dê erro
        })
    }

    // Salvando item no localStorage
    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    // Função para o usuario 'deslogar' do sistema
    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);

    }

    return(
        <AuthContext.Provider value={{ 
            signed: !!user,
            user, 
            loadin, 
            signUp,
            signOut,
            signIn,
            loadingAuth
            }}>

            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;