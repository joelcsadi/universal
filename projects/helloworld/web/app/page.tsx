'use server'

interface Message {
  id: number;
  greeting: string;
  username: string;
  email: string;
  created_at: string;
}

async function getMessages() {
  const res = await fetch('http://127.0.0.1:8000/messages');
  const data = await res.json();
  return data.data;
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Greeting</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages.map((message: Message) => (
              <tr key={message.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.greeting}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
