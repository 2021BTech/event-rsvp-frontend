import type { ReusableTableProps } from "../models/components/table.model";

export function ReusableTable<T extends Record<string, unknown>>({
  columns,
  data,
  actions = [],
}: ReusableTableProps<T>) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap ${col.className || ""}`}
                    >
                      {col.label}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-700"
                      >
                        {col.render
                          ? col.render(row[col.key], row, rowIndex)
                          : String(row[col.key])}
                      </td>
                    ))}
                    {actions.length > 0 && (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 text-center">
                        <div className="flex justify-center gap-2">
                          {actions.map((action, aIndex) => (
                            <button
                              key={aIndex}
                              onClick={() => action.onClick(row)}
                              className="text-gray-500 hover:text-indigo-600"
                              title={action.label}
                            >
                              {action.icon}
                            </button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
