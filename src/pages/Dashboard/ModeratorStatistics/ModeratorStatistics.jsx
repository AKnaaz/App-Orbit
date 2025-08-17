import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { FaFlag, FaCheckCircle, FaUserShield } from 'react-icons/fa';

const ModeratorStatistics = () => {
  // Dummy summary data
  const summaryCards = [
    { title: 'Reports Reviewed', value: 120, icon: <FaFlag className="h-8 w-8 text-white" />, bg: 'bg-red-500' },
    { title: 'Actions Taken', value: 85, icon: <FaCheckCircle className="h-8 w-8 text-white" />, bg: 'bg-green-500' },
    { title: 'Users Managed', value: 50, icon: <FaUserShield className="h-8 w-8 text-white" />, bg: 'bg-indigo-500' },
  ];

  // Dummy line chart data
  const lineData = [
    { name: 'Jan', Reports: 20, Actions: 15, Users: 5 },
    { name: 'Feb', Reports: 25, Actions: 18, Users: 10 },
    { name: 'Mar', Reports: 30, Actions: 20, Users: 8 },
    { name: 'Apr', Reports: 18, Actions: 12, Users: 6 },
    { name: 'May', Reports: 15, Actions: 10, Users: 7 },
    { name: 'Jun', Reports: 12, Actions: 10, Users: 9 },
  ];

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Moderator Statistics Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="flex items-center p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <div className={`${card.bg} p-4 rounded-full mr-4`}>
              {card.icon}
            </div>
            <div>
              <p className="font-medium">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Line type="monotone" dataKey="Reports" stroke="#EF4444" strokeWidth={2} />
          <Line type="monotone" dataKey="Actions" stroke="#22C55E" strokeWidth={2} />
          <Line type="monotone" dataKey="Users" stroke="#6366F1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Long Description */}
      <div className="p-5 space-y-4 mt-6">
        <p>
          As a moderator, the primary responsibility is to ensure that the platform remains safe, inclusive, and free from harmful or misleading content. 
          The statistics above highlight some of the most critical areas of moderation, including the number of reports reviewed, actions taken, and users managed. 
          Reviewing reports is not just about responding to complaints, but about carefully assessing whether content violates community guidelines. 
          This requires a balance between fairness, consistency, and empathy, because each decision affects the overall trust users place in the platform. 
        </p>
        <p>
          Actions taken by a moderator include removing inappropriate content, warning or suspending users who repeatedly break rules, and providing feedback 
          to help community members improve their behavior. These actions are not merely punitive but are designed to educate and guide the community toward 
          healthier engagement. Every action taken should be proportional and well-documented, so that decisions remain transparent and defensible if challenged. 
        </p>
        <p>
          Managing users is another essential aspect of moderation. This involves not just dealing with problematic users, but also encouraging and 
          supporting positive contributors. By recognizing active and helpful users, moderators can create an environment where members feel valued and 
          motivated to engage. Strong community building relies on this balance of discipline and encouragement, ensuring that users see moderation as a 
          force for good rather than as a barrier to expression. 
        </p>
        <p>
          Overall, the role of a moderator is both challenging and rewarding. It demands strong analytical skills, emotional intelligence, 
          and the ability to make quick, fair judgments under pressure. The data presented in the chart helps provide insight into how consistently 
          a moderator is performing over time. For example, a high number of reports may indicate either an increase in user activity or 
          a rise in problematic behavior, while actions taken reflect how effectively issues are being resolved. By analyzing these trends, 
          moderators can improve their strategies and maintain the health of the platform. 
        </p>
      </div>
    </div>
  );
};

export default ModeratorStatistics;
