import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CRMFiltersProps {
  searchQuery: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (status: string) => void;
}

const CRMFilters: React.FC<CRMFiltersProps> = ({
  searchQuery,
  filterStatus,
  onSearchChange,
  onFilterChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Фильтры и поиск</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <Input
              placeholder="Поиск по имени, телефону или номеру заявки..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => onFilterChange('all')}
              size="sm"
            >
              Все
            </Button>
            <Button
              variant={filterStatus === 'Новая' ? 'default' : 'outline'}
              onClick={() => onFilterChange('Новая')}
              size="sm"
            >
              Новые
            </Button>
            <Button
              variant={filterStatus === 'В обработке' ? 'default' : 'outline'}
              onClick={() => onFilterChange('В обработке')}
              size="sm"
            >
              В работе
            </Button>
            <Button
              variant={filterStatus === 'Одобрена' ? 'default' : 'outline'}
              onClick={() => onFilterChange('Одобрена')}
              size="sm"
            >
              Одобрено
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CRMFilters;