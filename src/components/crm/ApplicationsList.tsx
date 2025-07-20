import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Application } from './types';
import ApplicationDetails from './ApplicationDetails';

interface ApplicationsListProps {
  applications: Application[];
  onStatusUpdate: (appId: string, newStatus: string) => void;
  onCommentAdd: (appId: string, comment: string) => void;
  formatTime: (seconds: number) => string;
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({
  applications,
  onStatusUpdate,
  onCommentAdd,
  formatTime
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новая':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'В обработке':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Одобрена':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Отклонена':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Выдана':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Заявки клиентов</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon name="User" size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {app.clientName}
                    </h3>
                    <p className="text-gray-600">{app.phone}</p>
                    <p className="text-sm text-gray-500">Заявка #{app.id}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={getStatusColor(app.status)}>
                    {app.status}
                  </Badge>
                  <Badge className={getPriorityColor(app.priority)}>
                    {app.priority === 'high' ? 'Высокий' : 
                     app.priority === 'medium' ? 'Средний' : 'Низкий'}
                  </Badge>
                  {app.timer > 0 && (
                    <div className="flex items-center space-x-1 text-sm">
                      <Icon name="Timer" size={14} className="text-orange-500" />
                      <span className={app.timer < 3600 ? 'text-red-600 font-bold' : 'text-orange-600'}>
                        {formatTime(app.timer)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Banknote" size={16} className="text-gray-400" />
                  <span className="text-gray-600">Сумма:</span>
                  <span className="font-medium">{app.amount.toLocaleString()} ₽</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} className="text-gray-400" />
                  <span className="text-gray-600">Тип:</span>
                  <span className="font-medium">{app.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-gray-400" />
                  <span className="text-gray-600">Дата:</span>
                  <span className="font-medium">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="UserCheck" size={16} className="text-gray-400" />
                  <span className="text-gray-600">Менеджер:</span>
                  <span className="font-medium">{app.assignedTo}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {app.documents.map((doc, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {doc}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <ApplicationDetails
                    application={app}
                    onStatusUpdate={onStatusUpdate}
                    onCommentAdd={onCommentAdd}
                  />
                  <Button size="sm" className="bg-blue-600 text-white">
                    <Icon name="Phone" size={14} className="mr-2" />
                    Позвонить
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationsList;