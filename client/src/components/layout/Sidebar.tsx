import {SquareDashed, CircleDashed, LayoutPanelLeft, Users,Settings} from 'lucide-react';

export default function SideBar(){
    return (
      <section className="bg-yellow-400 w-[18vw] text-xl">
        <div className="border-b flex justify-center items-center text-2xl h-[12vh] ">
          <SquareDashed size={40} />
          <div>
            <h1 className="">SmartLeads</h1>
            <p className="text-sm">Dashboard</p>
          </div>
        </div>
        <div className="flex flex-col justify-around h-full ">
          <div className="grid gap-5">
            <p>MAIN</p>
            <ul className="ml-5">
              <li className="flex mb-3 justify-left align-center items-center">
                <LayoutPanelLeft />
                Overview
              </li>
              <li className="flex mb-3 justify-left align-center items-center">
                {" "}
                <Users /> Leads
              </li>
            </ul>
            <p>ACCOUNT</p>
            <ul className="ml-5">
              <li className="flex mb-3 justify-left align-center items-center">
                <Settings /> Settings
              </li>
            </ul>
          </div>
          <div className="flex justify-between px-4 border-t border-black">
            <div className="flex items-center gap-3">
              <CircleDashed className="rounded-full" size={30} />
              <div >
                <h3 className="text-[1rem] ">Yogesh S.</h3>
                <p className="text-[0.75rem] ">Admin</p>
              </div>
            </div>
            <div className="text-[0.8rem] my-auto">Active</div>
          </div>
        </div>
      </section>
    );
}