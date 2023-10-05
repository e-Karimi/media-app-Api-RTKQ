export default function Ping() {
    return (
        <span className="relative flex h-3 w-3 me-[2px]">
            <span className="animate-slowPing absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-300"></span>
        </span>
    )
}
