


import React from 'react';

interface AddColumnFormProps {
  newColumnTitle: string;
  setNewColumnTitle: (title: string) => void;
  handleAddColumnSubmit: (e: React.FormEvent) => Promise<void>;
  setIsAddingColumn: (isAdding: boolean) => void;
}

const AddColumnForm: React.FC<AddColumnFormProps> = ({
  newColumnTitle,
  setNewColumnTitle,
  handleAddColumnSubmit,
  setIsAddingColumn,
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex-shrink-0 w-72 h-fit">
      <form onSubmit={handleAddColumnSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter column title"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <div className="flex justify-between space-x-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Add Column
          </button>
          <button
            type="button"
            onClick={() => setIsAddingColumn(false)}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddColumnForm;