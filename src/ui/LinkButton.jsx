import { Link, useNavigate } from "react-router-dom"

function LinkButton({children,to}) {
  const navigate = useNavigate();
  
    if(to==="-1") return <button onClick={() => navigate(-1)}>&larr; Go back</button>;
    return (
        <Link to={to}>{children}</Link>
    )
}

export default LinkButton
