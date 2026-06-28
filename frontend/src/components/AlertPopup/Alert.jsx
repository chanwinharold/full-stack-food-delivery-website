

const Alert = ({children, status, setter}) => {
    const ColorStatus = {
        200: "bg-green-600",
        201: "bg-green-600",
        204: "bg-green-600",
        400: "bg-red-600",
        401: "bg-amber-600",
        404: "bg-red-600",
        500: "bg-red-600"
    }

    return (
        <div className={`fixed shadow-lg top-10 right-10 rounded-md px-5 py-4 text-white font-semibold ${ColorStatus[status]}`}>
            <div className={"flex flex-col justify-end gap-4"}>
                <span className={"max-w-60 text-wrap wrap-break-word"}>{children}</span>
                <button onClick={() => {setter()}} className={"bg-white text-black w-fit self-end px-4 py-2 rounded-sm text-xs cursor-pointer hover:bg-neutral-900"} type={"button"}>OK</button>
            </div>
        </div>
    );
};

export default Alert;