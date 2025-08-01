import React from 'react';

function CommitTable({ data }) {
  return (
    <div className="overflow-auto max-h-[60vh] border rounded bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            {Object.keys(data[0] || {}).map((col) => (
              <th key={col} className="px-4 py-2 border">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              {Object.values(row).map((val, i) => (
                <td key={i} className="px-4 py-2 border">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommitTable;