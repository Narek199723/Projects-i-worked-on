import { useContext } from "react";
//import { AuthContext } from '../contexts/JWTContext';
import { AuthContext } from "../contexts/AuthContex";
// import { AuthContext } from '../contexts/AwsCognitoContext';
// import { AuthContext } from '../contexts/Auth0Context';

// ----------------------------------------------------------------------

const useAuth = () => useContext(AuthContext);

export default useAuth;
