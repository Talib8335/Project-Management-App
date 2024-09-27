import { FC } from "react"

interface LogoInterface {
    large?: boolean
}

const Logo: FC<LogoInterface> = ({large = false}) => {
  return (
    <div className="flex items-center gap-1">
      <img src="/images/pic.png" className={large ? 'w-16' : 'w-10'} />
      <h1 className={`text-white ${large ? 'text-4xl' : 'text-xl'} italic font-bold`}>OneWork</h1>
    </div>
  )
}

export default Logo
