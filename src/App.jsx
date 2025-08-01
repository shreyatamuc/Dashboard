import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import FilterBar from './components/FilterBar';
import CommitTable from './components/CommitTable';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch('commit_log.csv')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.map(row => ({
              ...row,
              Insertions: +row.Insertions,
              Deletions: +row.Deletions,
              'Files Changed': +row['Files Changed'],
            }));
            setData(parsedData);
            setFilteredData(parsedData);
          }
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">GitHub Commit Dashboard</h1>
      {data.length > 0 && (
        <>
          <FilterBar data={data} setFilteredData={setFilteredData} />
          <CommitTable data={filteredData} />
        </>
      )}
    </div>
  );
}

export default App;