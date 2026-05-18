import {Funnel, Plus} from 'lucide-react';

export default function NavBar() {
  return (
    <section className="flex justify-between px-10 border items-center h-[12vh] w-full  ">
      <div className="text-3xl" >
        Leads
        </div>
      <div>
        <ul className="flex gap-12 p-4" >
          <li>
            <button className="border py-2 px-7 text-xl rounded-xl flex items-center justify-center ">
              <Funnel /> Filter
            </button>
          </li>
          <li>
            <button className="border py-2 px-5 text-xl rounded-xl flex items-center justify-center ">
              <Plus /> Add Lead
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
