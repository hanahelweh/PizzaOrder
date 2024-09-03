import { Link } from "react-router-dom"
import SearchOrder from '../features/order/SearchOrder'
import Username from "../features/user/Username"
function Header() {
    return (
        <div className="bg-red-700">
            <div className="max-w-5xl px-5 mx-auto py-3 flex justify-between items-center">
                <Link to="/" className="bg-contain bg-no-repeat aspect-square w-24  " style={{backgroundImage:'url(/logo.png)'}}></Link>
                <SearchOrder/>
                <Username/>
            </div>
        </div>
    )
}

export default Header