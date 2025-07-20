import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { CRMStats as CRMStatsType } from './types';

interface CRMStatsProps {
  stats: CRMStatsType;
}

const CRMStats: React.FC<CRMStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icon name="FileText" size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Всего</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icon name="Plus" size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Новые</p>
              <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Icon name="Clock" size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">В работе</p>
              <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Icon name="CheckCircle" size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Одобрено</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Icon name="AlertTriangle" size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Просрочено</p>
              <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMStats;