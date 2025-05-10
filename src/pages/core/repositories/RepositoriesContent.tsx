import React, { useEffect, useState } from 'react';

interface Repository {
  id: number;
  name: string;
  description: string;
  lastUpdated: string;
  status: string;
  branches: number;
  contributors: number;
}

const mockFetchRepositories = (): Promise<Repository[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'frontend-app',
          description: 'Main frontend application',
          lastUpdated: '2024-03-20',
          status: 'active',
          branches: 3,
          contributors: 5
        },
        {
          id: 2,
          name: 'backend-api',
          description: 'REST API service',
          lastUpdated: '2024-03-19',
          status: 'active',
          branches: 2,
          contributors: 3
        }
      ]);
    }, 1000);
  });
};

const RepositoriesContent = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    mockFetchRepositories()
      .then((data) => {
        setRepositories(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch repositories');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading repositories...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Repositories</h2>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Last Updated</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Branches</th>
            <th className="p-2 border">Contributors</th>
          </tr>
        </thead>
        <tbody>
          {repositories.map((repo) => (
            <tr key={repo.id} className="hover:bg-gray-50">
              <td className="p-2 border font-medium">{repo.name}</td>
              <td className="p-2 border">{repo.description}</td>
              <td className="p-2 border">{repo.lastUpdated}</td>
              <td className="p-2 border">{repo.status}</td>
              <td className="p-2 border text-center">{repo.branches}</td>
              <td className="p-2 border text-center">{repo.contributors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { RepositoriesContent }; 