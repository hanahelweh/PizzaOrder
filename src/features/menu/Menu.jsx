import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
    const menu = useLoaderData();
    return (
        <div className="max-w-5xl p-5 mx-auto flex flex-wrap">
            {menu.map((item)=><MenuItem pizza={item} key={item.id}/>)}
        </div>
    )
}
export async function loader(){
    const menu = await getMenu();
    return menu;
}
export default Menu
