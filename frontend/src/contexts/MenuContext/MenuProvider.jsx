import {useState} from 'react';
import MenuContext from "./MenuContext.js";

function MenuProvider({children}) {
	const [Menus, setMenus] = useState([]);
	const [Foods, setFoods] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

    const states = {
        Menus, setMenus, Foods, setFoods, searchQuery, setSearchQuery
    }

    return (
        <MenuContext.Provider value={states}>
            {children}
        </MenuContext.Provider>
    );
}

export default MenuProvider;
