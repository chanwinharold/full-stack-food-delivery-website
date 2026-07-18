import {useState} from 'react';
import MenuContext from "./MenuContext.js";

function MenuProvider({children}) {
	const [Menus, setMenus] = useState([]);
	const [Foods, setFoods] = useState([]);

    const states = {
        Menus, setMenus, Foods, setFoods
    }

    return (
        <MenuContext.Provider value={states}>
            {children}
        </MenuContext.Provider>
    );
}

export default MenuProvider;