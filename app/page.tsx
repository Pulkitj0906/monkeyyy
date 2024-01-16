import Image from 'next/image'
import Topbar from './components/Topbar'
import Bottombar from './components/Bottombar'
import Body from './components/Body'
import ControlBar from './components/Controlbar'



export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div
        className="
        flex
        flex-col
        h-screen
        w-screen
        items-center
        p-2
        xl:w-4/5
        md:p-6
        md:pt-2
      ">
        <Topbar />
        <ControlBar />
        <div className="flex-grow w-full">
          <Body/>
        </div>
        <Bottombar />
      </div>
    </div>
  )
}
