import { Link } from "react-router-dom"

function Button({children,disabled,to,type,onClick}) {
    const styles={
        primary:'bg-red-700 text-white py-2 px-4 rounded-3xl hover:bg-red-800 transition',
        secondary:'bg-slate-100 text-slate-700 py-2 px-4 rounded-3xl hover:bg-slate-200 transition',
        mini:'bg-red-700 text-white py-2 px-2 rounded-3xl hover:bg-red-800 transition text-xs',
        round:'bg-red-700 text-white w-6 aspect-square rounded-full hover:bg-red-800 transition'
    }
    if(to) return(
        <Link to={to} className={styles[type]}>{children}</Link>
    )
    if(onClick) return (
        <button className={styles[type]} disabled={disabled} onClick={onClick}>{children}</button>
    )
    return (
        <button className={styles[type]} disabled={disabled}>{children}</button>
    )
}

export default Button
