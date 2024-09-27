import { Empty } from "antd";
import { FilePenLine, Trash2 } from "lucide-react";
import { FC } from "react"

interface TableInterface {
    data: any[];
    actions?: boolean;
    onEdit?: ()=>void;
    onDelete?: ()=>void
}
const Table: FC<TableInterface> = ({data, actions=false, onEdit, onDelete}) => {
    if(!data || data.length === 0)
        return <Empty />
        
    const obj = data[0]
    const columns = Object.keys(obj)
   
    return (
        <div className="overflow-x-auto">
        <table className="w-full bg-white">
            <thead>
            <tr className="border text-left">
                {
                    columns.map((item, index)=>(
                        <th className={`capitalize py-3 ${index === 0 && 'pl-3'}`} key={index}>{item}</th>
                    ))
                }
                {
                    actions && <th className="capitalize py-3"></th>
                }
            </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index)=>(
                        <tr key={index} className="border-l border-r border-b">
                            {
                                columns.map((td, tdIndex)=>(
                                  <td key={tdIndex} className={`py-2 w-[400px] text-zinc-500 ${tdIndex === 0 && 'pl-3'}`}>{item[td].toString()}</td>  
                                ))
                            }
                            {
                                actions && 
                                <td>
                                    <div className="flex items-center gap-2">
                                        <button onClick={onEdit} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
                                            <FilePenLine className="w-4 h-4 text-indigo-600" />
                                        </button>

                                        <button onClick={onDelete} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
                                            <Trash2 className="w-4 h-4 text-rose-600" />
                                        </button>
                                    </div>
                                </td>
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    )
}

export default Table
