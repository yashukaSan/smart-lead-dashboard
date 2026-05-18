import {ChevronDown} from 'lucide-react';

export default function FilterBar(){
    const buttons = ['Name', 'Status', 'Source', 'Sort By'];
    return (
      <section>
        <div className="flex gap-10 justify-center my-4 ">
          {buttons.map((item, ind) => (
            <button key={"but-" + ind} className="border flex items-center gap-2 text-2xl p-5 rounded-xl hover:shadow-xl hover:shadow-gray-500">
                {item} <ChevronDown />
            </button>
          ))}
        </div>
      </section>
    );
}