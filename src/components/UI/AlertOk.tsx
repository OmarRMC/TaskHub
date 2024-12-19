import { useEffect } from "react";
import style from "./Alert.module.css"
function Alert({ title, description = "", type = "", color = "red" }: any) {
    useEffect(() => {
        const alert = document.querySelector("#alert-show") as HTMLElement
        setTimeout(() => {
            alert.classList.add(style.active);
        }, 10)
        setTimeout(() => {
            alert.classList.remove(style.active);
        }, 5000)
    }, [])
    return (
        <div id="alert-show" className={`fixed bottom-0  p-4 mb-4 text-sm text-${color}-800 rounded-lg bg-${color}-100 dark:bg-${color}-800 dark:text-${color}-400 ${style.alert}`} role="alert">
            <span className="font-medium">{title}</span> {description}
        </div>
    );
}



export default Alert;