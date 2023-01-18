import {UserProps} from "../types/user";
import Search from "../componets/Search";
import {useState} from 'react';
import User from "../componets/user";
import Error from "../componets/Error";

function Home() {

    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);

    //api do github
    const loadUser = async(userName: string) => {
        setError(false);
        setUser(null);

        const res = await fetch(`https://api.github.com/users/${userName}`);
        const data = await res.json();

        //erro 404
        if (res.status === 404){
          setError(true);
          return;
        }
        
        const {avatar_url, login, location, followers, following} = data;

        const userData: UserProps = {
            avatar_url,
            login,
            location,
            followers,
            following,
        };
        setUser(userData);
    };

    return (
      <div className="Home">
        <Search loadUser = {loadUser}/>
        {user &&<User {...user}/>}
        {error && <Error />}
      </div>
    );
  };
  
export default Home;
  