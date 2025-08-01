import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function FilterBar({ data, setFilteredData }) {
  const authors = [...new Set(data.map(row => row['Author Name']))];
  const emails = [...new Set(data.map(row => row['Author Email']))];
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [minInsertions, setMinInsertions] = useState(0);
  const [maxInsertions, setMaxInsertions] = useState(100);
  const [minDeletions, setMinDeletions] = useState(0);
  const [maxDeletions, setMaxDeletions] = useState(100);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const applyFilters = () => {
    const filtered = data.filter(row => {
      const rowDate = new Date(row['Date']);
      return (
        (author ? row['Author Name'] === author : true) &&
        (email ? row['Author Email'] === email : true) &&
        (row['Insertions'] >= minInsertions && row['Insertions'] <= maxInsertions) &&
        (row['Deletions'] >= minDeletions && row['Deletions'] <= maxDeletions) &&
        (search ? row['Commit Message'].toLowerCase().includes(search.toLowerCase()) : true) &&
        (startDate ? rowDate >= startDate : true) &&
        (endDate ? rowDate <= endDate : true)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <select value={author} onChange={e => setAuthor(e.target.value)} className="p-2 border rounded">
        <option value="">All Authors</option>
        {authors.map(a => <option key={a}>{a}</option>)}
      </select>
      <select value={email} onChange={e => setEmail(e.target.value)} className="p-2 border rounded">
        <option value="">All Emails</option>
        {emails.map(e => <option key={e}>{e}</option>)}
      </select>
      <div>
        <label className="block text-sm">Start Date</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="p-2 border rounded w-full" />
      </div>
      <div>
        <label className="block text-sm">End Date</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="p-2 border rounded w-full" />
      </div>
      <input type="number" value={minInsertions} onChange={e => setMinInsertions(+e.target.value)} placeholder="Min Insertions" className="p-2 border rounded" />
      <input type="number" value={maxInsertions} onChange={e => setMaxInsertions(+e.target.value)} placeholder="Max Insertions" className="p-2 border rounded" />
      <input type="number" value={minDeletions} onChange={e => setMinDeletions(+e.target.value)} placeholder="Min Deletions" className="p-2 border rounded" />
      <input type="number" value={maxDeletions} onChange={e => setMaxDeletions(+e.target.value)} placeholder="Max Deletions" className="p-2 border rounded" />
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Message" className="p-2 border rounded col-span-2" />
      <button onClick={applyFilters} className="bg-blue-600 text-white rounded p-2 col-span-2 hover:bg-blue-700">
        Apply Filters
      </button>
    </div>
  );
}

export default FilterBar;