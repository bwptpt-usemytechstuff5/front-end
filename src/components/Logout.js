

const Logout = ({ history }) => {
    
    localStorage.clear();
    history.push('/');
}

export default Logout;
