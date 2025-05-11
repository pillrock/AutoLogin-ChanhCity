import React, { useState } from 'react';
import Button from '@mui/material/Button';

function PathSelector() {
  const [path, setPath] = useState('');

  const handleBrowse = async () => {
    // @ts-ignore
    const selectedPath = await window.electronAPI.openDialog();
    if (selectedPath) setPath(selectedPath);
  };

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-4 rounded-lg p-6 shadow-md">
      <div className="flex w-full gap-2">
        <input
          value={path}
          readOnly
          placeholder="Chọn đường dẫn..."
          className="flex-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button variant="contained" color="primary" onClick={handleBrowse}>
          Duyệt
        </Button>
      </div>
    </div>
  );
}

export default PathSelector;
