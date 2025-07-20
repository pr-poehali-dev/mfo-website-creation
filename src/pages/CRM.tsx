import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'new' | 'verified' | 'active' | 'blocked';
  totalLoans: number;
  joinDate: string;
  lastActivity: string;
}

interface Application {
  id: string;
  clientId: string;
  clientName: string;
  phone: string;
  type: 'Займ' | 'Рефинансирование' | 'Ипотека';
  amount: number;
  status: 'Новая' | 'В обработке' | 'Одобрена' | 'Отклонена' | 'Выдана';
  createdAt: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  timer: number; // время до дедлайна в секундах
  documents: string[];
  comments: string[];
}

interface Employee {
  id: string;
  name: string;
  role: 'manager' | 'senior' | 'admin';
  isOnline: boolean;
  workload: number;
}

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

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [newComment, setNewComment] = useState('');
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
    setNewComment('');
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.phone.includes(searchQuery) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
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

            {/* Filters */}
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
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filterStatus === 'all' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('all')}
                      size="sm"
                    >
                      Все
                    </Button>
                    <Button
                      variant={filterStatus === 'Новая' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('Новая')}
                      size="sm"
                    >
                      Новые
                    </Button>
                    <Button
                      variant={filterStatus === 'В обработке' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('В обработке')}
                      size="sm"
                    >
                      В работе
                    </Button>
                    <Button
                      variant={filterStatus === 'Одобрена' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('Одобрена')}
                      size="sm"
                    >
                      Одобрено
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Applications List */}
            <Card>
              <CardHeader>
                <CardTitle>Заявки клиентов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredApplications.map((app) => (
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>
                                <Icon name="Eye" size={14} className="mr-2" />
                                Детали
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Заявка #{app.id}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Статус</Label>
                                    <select 
                                      className="w-full mt-1 p-2 border rounded"
                                      value={app.status}
                                      onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                                    >
                                      <option value="Новая">Новая</option>
                                      <option value="В обработке">В обработке</option>
                                      <option value="Одобрена">Одобрена</option>
                                      <option value="Отклонена">Отклонена</option>
                                      <option value="Выдана">Выдана</option>
                                    </select>
                                  </div>
                                  <div>
                                    <Label>Комментарии</Label>
                                    <div className="mt-1 max-h-32 overflow-y-auto space-y-1">
                                      {app.comments.map((comment, index) => (
                                        <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                                          {comment}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <Label>Добавить комментарий</Label>
                                  <div className="flex gap-2 mt-1">
                                    <Textarea
                                      value={newComment}
                                      onChange={(e) => setNewComment(e.target.value)}
                                      placeholder="Введите комментарий..."
                                      className="flex-1"
                                    />
                                    <Button onClick={() => addComment(app.id, newComment)}>
                                      Добавить
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
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
          </TabsContent>

          {/* Other tabs content would go here */}
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>База клиентов</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Раздел находится в разработке...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Аналитика и отчеты</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Раздел находится в разработке...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CRM;