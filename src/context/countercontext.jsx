import { createContext, useState } from 'react'
export let countercontext = createContext();
export function CreateContextprovider({ children }) {
    let [name, setname] = useState(null)
    return <countercontext.Provider value={{ name, setname }}>
        {children}
    </countercontext.Provider>
}
