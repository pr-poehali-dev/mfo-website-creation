import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

// Import types and components
import { Application, Employee, CRMStats as CRMStatsType } from '@/components/crm/types';
import CRMStats from '@/components/crm/CRMStats';
import CRMFilters from '@/components/crm/CRMFilters';
import ApplicationsList from '@/components/crm/ApplicationsList';
import TeamManagement from '@/components/crm/TeamManagement';

const CRM = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'APP001',
      clientId: 'CLI001',
      clientName: 'Иван Петров',
      phone: '+7 (999) 123-45-67',
      type: 'Займ',
      amount: 150000,
      status: 'В обработке',
      createdAt: '2024-07-20T10:30:00',
      assignedTo: 'Анна Иванова',
      priority: 'high',
      timer: 7200, // 2 часа
      documents: ['Паспорт', 'Справка о доходах'],
      comments: ['Клиент подтвердил номер телефона', 'Ожидаем справку с работы']
    },
    {
      id: 'APP002',
      clientId: 'CLI002',
      clientName: 'Мария Сидорова',
      phone: '+7 (999) 987-65-43',
      type: 'Рефинансирование',
      amount: 500000,
      status: 'Новая',
      createdAt: '2024-07-20T14:15:00',
      assignedTo: 'Петр Васильев',
      priority: 'medium',
      timer: 28800, // 8 часов
      documents: ['Паспорт'],
      comments: ['Новая заявка']
    },
    {
      id: 'APP003',
      clientId: 'CLI003',
      clientName: 'Александр Козлов',
      phone: '+7 (999) 555-11-22',
      type: 'Займ',
      amount: 75000,
      status: 'Одобрена',
      createdAt: '2024-07-19T16:45:00',
      assignedTo: 'Анна Иванова',
      priority: 'low',
      timer: 0,
      documents: ['Паспорт', 'Справка о доходах', 'ИНН'],
      comments: ['Заявка одобрена', 'Готов к выдаче средств']
    }
  ]);

  const [employees] = useState<Employee[]>([
    { id: 'emp1', name: 'Анна Иванова', role: 'senior', isOnline: true, workload: 5 },
    { id: 'emp2', name: 'Петр Васильев', role: 'manager', isOnline: true, workload: 3 },
    { id: 'emp3', name: 'Мария Петрова', role: 'manager', isOnline: false, workload: 2 },
    { id: 'emp4', name: 'Сергей Иванов', role: 'admin', isOnline: true, workload: 1 }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Обновление таймеров каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      setApplications(prev => prev.map(app => ({
        ...app,
        timer: Math.max(0, app.timer - 1)
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return 'Просрочено';
    
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}ч ${mins}м ${secs}с`;
    return `${mins}м ${secs}с`;
  };

  const updateApplicationStatus = (appId: string, newStatus: string) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus as any } : app
    ));
  };

  const addComment = (appId: string, comment: string) => {
    setApplications(prev => prev.map(app => 
      app.id === appId 
        ? { ...app, comments: [...app.comments, `${new Date().toLocaleString()}: ${comment}`] }
        : app
    ));
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.phone.includes(searchQuery) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats: CRMStatsType = {
    total: applications.length,
    new: applications.filter(a => a.status === 'Новая').length,
    processing: applications.filter(a => a.status === 'В обработке').length,
    approved: applications.filter(a => a.status === 'Одобрена').length,
    overdue: applications.filter(a => a.timer === 0 && a.status !== 'Одобрена' && a.status !== 'Выдана').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">CRM Система</span>
              </div>
              <span className="text-gray-400">|</span>
              <h1 className="text-lg font-semibold text-gray-800">Панель управления</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Анна Иванова</span>
                <Badge variant="outline">Старший менеджер</Badge>
              </div>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="applications">
              <Icon name="FileText" size={16} className="mr-2" />
              Заявки
            </TabsTrigger>
            <TabsTrigger value="clients">
              <Icon name="Users" size={16} className="mr-2" />
              Клиенты
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="team">
              <Icon name="UserCheck" size={16} className="mr-2" />
              Команда
            </TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            {/* Stats Cards */}
            <CRMStats stats={stats} />

            {/* Filters */}
            <CRMFilters
              searchQuery={searchQuery}
              filterStatus={filterStatus}
              onSearchChange={setSearchQuery}
              onFilterChange={setFilterStatus}
            />

            {/* Applications List */}
            <ApplicationsList
              applications={filteredApplications}
              onStatusUpdate={updateApplicationStatus}
              onCommentAdd={addComment}
              formatTime={formatTime}
            />
          </TabsContent>

          {/* Other tabs content */}
          <TabsContent value="clients">
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="Users" size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">База клиентов</h3>
                <p className="text-gray-600">Раздел находится в разработке...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="BarChart3" size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Аналитика и отчеты</h3>
                <p className="text-gray-600">Раздел находится в разработке...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <TeamManagement employees={employees} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CRM;