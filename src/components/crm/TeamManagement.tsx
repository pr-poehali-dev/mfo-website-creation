import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Employee } from './types';

interface TeamManagementProps {
  employees: Employee[];
}

const TeamManagement: React.FC<TeamManagementProps> = ({ employees }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление командой</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div key={emp.id} className="border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${emp.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div>
                  <h3 className="font-semibold">{emp.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{emp.role}</p>
                </div>
              </div>
              <div className="text-sm">
                <p className="text-gray-600">Нагрузка: {emp.workload} заявок</p>
                <p className="text-gray-600">
                  Статус: {emp.isOnline ? 'В сети' : 'Не в сети'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamManagement;