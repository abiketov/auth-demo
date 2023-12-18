import React, { useState, useEffect } from 'react';

interface WorkingAreaProps {
  activeTab: number;
  handleFetchData: () => void;
}

const WorkingArea: React.FC<WorkingAreaProps> = ({ activeTab, handleFetchData }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const getDummyJson = () => {
    return JSON.stringify({ tab: activeTab, content: `Content for tab ${activeTab}` }, null, 2);
  };

  useEffect(() => {
    setEditorContent(getDummyJson());
    setIsEditing(false);
    setApiResponse(null);
  }, [activeTab]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditorContent(apiResponse || getDummyJson());
    }
  };

  const handleUpdateData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editorContent }),
      });
      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error updating data: ', error);
      setApiResponse('Error updating data');
    }
  };

  const getBackgroundColor = () => {
    switch (activeTab) {
      case 1:
        return 'bg-red-100';
      case 2:
        return 'bg-green-200';
      case 3:
        return 'bg-sky-200';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`w-3/4 p-4 ${getBackgroundColor()}`}>
      <button className="mb-2 p-2 bg-blue-500 text-white" onClick={handleFetchData}>
        Fetch Data
      </button>
      <button className="mb-2 ml-2 p-2 bg-yellow-500 text-white" onClick={handleUpdateData}>
        Update Data
      </button>
      <button className="mb-2 ml-2 p-2 bg-green-500 text-white" onClick={handleEditClick}>
        {isEditing ? 'Cancel Edit' : 'Edit'}
      </button>
      {isEditing ? (
        <textarea
          className="w-full p-2 border"
          value={editorContent}
          onChange={(e) => setEditorContent(e.target.value)}
        />
      ) : (
        <div className="bg-white border p-4 h-full">
          {apiResponse || editorContent}
        </div>
      )}
    </div>
  );
};

export default WorkingArea;
