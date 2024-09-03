import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchOrder() {
    const navigate = useNavigate();
    const [query,setQuery] = useState();
    function handleSubmit(e){
        e.preventDefault();
        navigate(`/order/${query}`);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input className="input" type="text" placeholder="Search Order #" value={query} onChange={e=>setQuery(e.target.value)}/>
        </form>
    )
}

export default SearchOrder
