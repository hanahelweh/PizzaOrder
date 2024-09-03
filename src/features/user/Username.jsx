import { useSelector } from "react-redux"

function Username() {
    const userName=useSelector(state=>state.user.username);
    if(!userName) return null;
    return (
        <div className="text-white hidden text-sm font-semibold md:block">
            {userName}
        </div>
    )
}

export default Username
