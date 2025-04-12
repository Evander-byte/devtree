import { ErrorMessageProps } from "../interfaces";



export default function ErrorMessage({children}: ErrorMessageProps) {
  return (
    <p className="bg-red-50 text-red-600 uppercase text-sm font-bold text-center rounded-md p-2">{children}</p>
  )
}
