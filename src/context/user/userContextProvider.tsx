import { useState } from 'react'
import UserContext from './userContext';
import { MemberDetails } from '../../store/store';
import useApi from '../../queries/useApi';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<MemberDetails>()


    const getUser = async (userId: string) => {
        return await useApi("GET", `/user/member/${userId}`)
    };


    return (
        <UserContext.Provider value={{ user, getUser, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider