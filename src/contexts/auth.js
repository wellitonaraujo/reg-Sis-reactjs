import { useEffect, useState, createContext } from 'react';
import firebase from '../services/firebaseConnection';

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
        })


        .catch((error) =>{
            console.log(error);
            setLoadingAuth(false)
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

            })
        })
        .catch((error) =>{
            console.log(error);
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